import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

// Lazy initialization to avoid build-time errors
const getResend = () => new Resend(process.env.RESEND_API_KEY);

type NewsletterSubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert'];

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/newsletter
 * Subscribe to newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabase = createAdminClient();

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, is_active, unsubscribed_at, name')
      .eq('email', email.toLowerCase())
      .maybeSingle() as { data: { id: string; email: string; is_active: boolean; unsubscribed_at: string | null; name: string | null } | null; error: any };

    if (checkError) {
      console.error('Error checking existing subscriber:', checkError);
      return NextResponse.json(
        { error: 'Failed to process subscription. Please try again.' },
        { status: 500 }
      );
    }

    // Handle duplicate subscription
    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return NextResponse.json(
          {
            success: true,
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true,
          },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        const { error: updateError } = await (supabase
          .from('newsletter_subscribers') as any)
          .update({
            is_active: true,
            unsubscribed_at: null,
            name: name || (existingSubscriber as any)?.name,
          })
          .eq('email', email.toLowerCase());

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
          return NextResponse.json(
            { error: 'Failed to reactivate subscription. Please try again.' },
            { status: 500 }
          );
        }

        // Send reactivation confirmation email
        try {
          await getResend().emails.send({
            from: 'Marsala Newsletter <newsletter@marsala.dev>',
            to: [email],
            subject: 'Welcome back to Marsala Newsletter!',
            html: generateWelcomeBackEmail(name),
            text: `Welcome back${name ? `, ${name}` : ''}! Your newsletter subscription has been reactivated. You'll now receive our latest updates, insights, and announcements.`,
          });
        } catch (emailError) {
          console.error('Error sending reactivation email:', emailError);
          // Don't fail the request if email fails
        }

        return NextResponse.json(
          {
            success: true,
            message: 'Welcome back! Your subscription has been reactivated.',
            reactivated: true,
          },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    const subscriberData: NewsletterSubscriberInsert = {
      email: email.toLowerCase(),
      name: name || null,
      is_active: true,
      preferences: {},
      metadata: {},
    };

    const { data: newSubscriber, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert(subscriberData as any)
      .select()
      .single() as { data: { id: string } | null; error: any };

    if (insertError) {
      console.error('Error creating subscription:', insertError);
      return NextResponse.json(
        { error: 'Failed to create subscription. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await getResend().emails.send({
        from: 'Marsala Newsletter <newsletter@marsala.dev>',
        to: [email],
        subject: 'Welcome to Marsala Newsletter!',
        html: generateWelcomeEmail(name),
        text: `Welcome${name ? `, ${name}` : ''}! Thank you for subscribing to our newsletter. You'll receive our latest updates, insights, and announcements.`,
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails - subscription is still created
    }

    // Notify admin
    try {
      await getResend().emails.send({
        from: 'Marsala Newsletter <newsletter@marsala.dev>',
        to: ['sabre.alfredo@gmail.com'], // Change to your email
        subject: 'New Newsletter Subscriber',
        html: generateAdminNotificationEmail(email, name),
        text: `New newsletter subscriber: ${name || 'No name'} (${email})`,
      });
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError);
      // Don't fail the request if admin notification fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.',
        id: newSubscriber?.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/newsletter
 * Unsubscribe from newsletter
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabase = createAdminClient();

    // Check if subscriber exists
    const { data: subscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, is_active')
      .eq('email', email.toLowerCase())
      .maybeSingle() as { data: { id: string; email: string; is_active: boolean } | null; error: any };

    if (checkError) {
      console.error('Error checking subscriber:', checkError);
      return NextResponse.json(
        { error: 'Failed to process unsubscribe request. Please try again.' },
        { status: 500 }
      );
    }

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      );
    }

    if (!subscriber.is_active) {
      return NextResponse.json(
        {
          success: true,
          message: 'You are already unsubscribed from our newsletter',
          alreadyUnsubscribed: true,
        },
        { status: 200 }
      );
    }

    // Unsubscribe
    const { error: updateError } = await (supabase
      .from('newsletter_subscribers') as any)
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email.toLowerCase());

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Send unsubscribe confirmation email
    try {
      await getResend().emails.send({
        from: 'Marsala Newsletter <newsletter@marsala.dev>',
        to: [email],
        subject: 'You have been unsubscribed',
        html: generateUnsubscribeEmail(),
        text: 'You have been successfully unsubscribed from our newsletter. We\'re sorry to see you go! If this was a mistake, you can resubscribe anytime.',
      });
    } catch (emailError) {
      console.error('Error sending unsubscribe confirmation:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully unsubscribed from newsletter',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Email Templates

function generateWelcomeEmail(name?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.9; }
          .content { background: #ffffff; padding: 40px 30px; }
          .content h2 { color: #2D5016; margin-top: 0; }
          .content p { margin: 15px 0; line-height: 1.8; }
          .button { display: inline-block; background: #2D5016; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 30px; text-align: center; color: #666; font-size: 14px; }
          .footer a { color: #2D5016; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Marsala Newsletter!</h1>
            <p>Thanks for joining our community</p>
          </div>
          <div class="content">
            <h2>Hello${name ? ` ${name}` : ''}!</h2>
            <p>Thank you for subscribing to the Marsala newsletter. We're excited to have you on board!</p>
            <p>You'll receive our latest updates about:</p>
            <ul>
              <li>New features and product launches</li>
              <li>Industry insights and best practices</li>
              <li>Exclusive tips and tutorials</li>
              <li>Special announcements and offers</li>
            </ul>
            <p>We promise to keep it valuable and never spam your inbox.</p>
            <a href="https://marsala.dev" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>You're receiving this because you subscribed to our newsletter.</p>
            <p><a href="https://marsala.dev/unsubscribe">Unsubscribe</a> | <a href="https://marsala.dev">marsala.dev</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateWelcomeBackEmail(name?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.9; }
          .content { background: #ffffff; padding: 40px 30px; }
          .content h2 { color: #2D5016; margin-top: 0; }
          .content p { margin: 15px 0; line-height: 1.8; }
          .button { display: inline-block; background: #2D5016; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 30px; text-align: center; color: #666; font-size: 14px; }
          .footer a { color: #2D5016; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome Back!</h1>
            <p>We're glad to have you back</p>
          </div>
          <div class="content">
            <h2>Hello${name ? ` ${name}` : ''}!</h2>
            <p>Your newsletter subscription has been reactivated. We're thrilled to have you back in our community!</p>
            <p>You'll continue receiving updates about our latest features, insights, and announcements.</p>
            <a href="https://marsala.dev" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>You're receiving this because you subscribed to our newsletter.</p>
            <p><a href="https://marsala.dev/unsubscribe">Unsubscribe</a> | <a href="https://marsala.dev">marsala.dev</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateUnsubscribeEmail(): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: #f5f5f5; color: #333; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #ffffff; padding: 40px 30px; text-align: center; }
          .content p { margin: 15px 0; line-height: 1.8; }
          .button { display: inline-block; background: #2D5016; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 30px; text-align: center; color: #666; font-size: 14px; }
          .footer a { color: #2D5016; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You've been unsubscribed</h1>
          </div>
          <div class="content">
            <p>You have been successfully unsubscribed from our newsletter.</p>
            <p>We're sorry to see you go! If this was a mistake, you can resubscribe anytime.</p>
            <a href="https://marsala.dev" class="button">Resubscribe</a>
          </div>
          <div class="footer">
            <p>If you have any feedback, we'd love to hear from you at <a href="mailto:sales@marsala.dev">sales@marsala.dev</a></p>
            <p><a href="https://marsala.dev">marsala.dev</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateAdminNotificationEmail(email: string, name?: string): string {
  return `
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
            <h1>New Newsletter Subscriber</h1>
          </div>
          <div class="content">
            ${name ? `
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${name}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Subscribed At</div>
              <div class="field-value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            Sent from marsala.dev newsletter system
          </div>
        </div>
      </body>
    </html>
  `;
}
