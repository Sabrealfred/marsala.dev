import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import type { WaitlistInsert, WaitlistEntry } from '@/lib/supabase/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, company, role, interest, referral_source } = body;

    // Validate required field
    if (!email) {
      return NextResponse.json(
        { error: 'Missing required field: email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Initialize Supabase admin client (bypasses RLS for waitlist management)
    const supabase = createAdminClient();

    // Check for duplicate emails
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist')
      .select('id, email, created_at')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for duplicate:', checkError);
      return NextResponse.json(
        { error: 'Failed to process your request. Please try again.' },
        { status: 500 }
      );
    }

    if (existingEntry) {
      return NextResponse.json(
        {
          success: false,
          message: 'This email is already on the waitlist. We will notify you when we launch!',
          duplicate: true,
        },
        { status: 200 }
      );
    }

    // Prepare waitlist entry
    const waitlistEntry: WaitlistInsert = {
      email: email.toLowerCase(),
      name: name || null,
      company: company || null,
      role: role || null,
      interest: interest || null,
      referral_source: referral_source || null,
      is_verified: false,
      is_approved: false,
      metadata: {
        source_url: request.headers.get('referer') || null,
        user_agent: request.headers.get('user-agent') || null,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
      },
    };

    // Insert into Supabase
    const { data: insertedEntry, error: insertError } = await supabase
      .from('waitlist')
      .insert(waitlistEntry as any)
      .select()
      .single() as { data: WaitlistEntry | null; error: any };

    if (insertError || !insertedEntry) {
      console.error('Error inserting into waitlist:', insertError);
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      );
    }

    // Send notification email to sales team
    const salesEmailResult = await resend.emails.send({
      from: 'Marsala Waitlist <onboarding@resend.dev>',
      to: ['sabre.alfredo@gmail.com'],
      subject: `New Waitlist Signup - ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: 600; color: #2D5016; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; margin-bottom: 5px; }
              .field-value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e0e0e0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Waitlist Signup</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${name ? `
                <div class="field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${name}</div>
                </div>
                ` : ''}
                ${company ? `
                <div class="field">
                  <div class="field-label">Company</div>
                  <div class="field-value">${company}</div>
                </div>
                ` : ''}
                ${role ? `
                <div class="field">
                  <div class="field-label">Role</div>
                  <div class="field-value">${role}</div>
                </div>
                ` : ''}
                ${interest ? `
                <div class="field">
                  <div class="field-label">Interest</div>
                  <div class="field-value">${interest}</div>
                </div>
                ` : ''}
                ${referral_source ? `
                <div class="field">
                  <div class="field-label">Referral Source</div>
                  <div class="field-value">${referral_source}</div>
                </div>
                ` : ''}
              </div>
              <div class="footer">
                Sent from marsala.dev waitlist
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Waitlist Signup

Email: ${email}
${name ? `Name: ${name}` : ''}
${company ? `Company: ${company}` : ''}
${role ? `Role: ${role}` : ''}
${interest ? `Interest: ${interest}` : ''}
${referral_source ? `Referral Source: ${referral_source}` : ''}
      `.trim(),
    });

    if (salesEmailResult.error) {
      console.error('Failed to send sales notification:', salesEmailResult.error);
      // Don't fail the request if sales email fails
    }

    // Send welcome/confirmation email to user
    const welcomeEmailResult = await resend.emails.send({
      from: 'Marsala OS <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Marsala OS Waitlist',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; }
              .welcome-text { font-size: 18px; color: #2D5016; margin-bottom: 20px; }
              .message { color: #555; margin-bottom: 30px; line-height: 1.8; }
              .cta-button { display: inline-block; background: #2D5016; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #e0e0e0; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to Marsala OS!</h1>
              </div>
              <div class="content">
                <div class="welcome-text">
                  ${name ? `Hi ${name},` : 'Hello!'}
                </div>
                <div class="message">
                  Thank you for joining the Marsala OS waitlist! We're excited to have you on board.
                  <br><br>
                  Marsala OS is a modular operating system designed to help businesses streamline their operations with powerful, integrated tools for branding, web development, CRM, AI, advertising, and data analytics.
                  <br><br>
                  You're now on the list and will be among the first to know when we launch. We'll keep you updated on our progress and notify you as soon as early access becomes available.
                  <br><br>
                  In the meantime, feel free to explore our website to learn more about what we're building.
                </div>
                <div style="text-align: center;">
                  <a href="https://marsala.dev" class="cta-button">Visit Marsala.dev</a>
                </div>
              </div>
              <div class="footer">
                Questions? Reply to this email or reach out at sales@marsala.dev
                <br>
                Marsala OS - Your Business Operating System
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Welcome to Marsala OS!

${name ? `Hi ${name},` : 'Hello!'}

Thank you for joining the Marsala OS waitlist! We're excited to have you on board.

Marsala OS is a modular operating system designed to help businesses streamline their operations with powerful, integrated tools for branding, web development, CRM, AI, advertising, and data analytics.

You're now on the list and will be among the first to know when we launch. We'll keep you updated on our progress and notify you as soon as early access becomes available.

In the meantime, visit https://marsala.dev to learn more about what we're building.

Questions? Reply to this email or reach out at sales@marsala.dev

Marsala OS - Your Business Operating System
      `.trim(),
    });

    if (welcomeEmailResult.error) {
      console.error('Failed to send welcome email:', welcomeEmailResult.error);
      // Don't fail the request if welcome email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist! Check your email for a confirmation.',
        id: insertedEntry.id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
