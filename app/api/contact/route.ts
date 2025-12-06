import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import type { ContactInsert, FormSubmissionInsert, Database } from '@/lib/supabase/types';

// Lazy initialization to avoid build-time errors
const getResend = () => new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (for production, use Redis or Upstash)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

// Rate limit configuration: 5 requests per 15 minutes per IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  // Clean up expired records
  if (record && now > record.resetAt) {
    rateLimit.delete(identifier);
  }

  const current = rateLimit.get(identifier);

  if (!current) {
    // First request from this identifier
    const resetAt = now + RATE_LIMIT_WINDOW;
    rateLimit.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  // Increment count
  current.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - current.count, resetAt: current.resetAt };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  budget_range?: string;
  timeline?: string;
  services_interested?: string[];
  entryPoint?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetAt).toISOString(),
          },
        }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();
    const {
      name,
      email,
      message,
      company,
      phone,
      budget_range,
      timeline,
      services_interested,
      entryPoint,
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
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

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be less than 5000 characters' },
        { status: 400 }
      );
    }

    // Initialize Supabase admin client (bypasses RLS for server-side operations)
    const supabase = createAdminClient();

    // Get additional request metadata
    const userAgent = request.headers.get('user-agent') || null;
    const referer = request.headers.get('referer') || null;

    // Save to contacts table
    const contactData: ContactInsert = {
      email,
      name,
      company: company || null,
      phone: phone || null,
      message,
      budget_range: budget_range || null,
      timeline: timeline || null,
      services_interested: services_interested || null,
      source: entryPoint || 'website_contact_form',
      status: 'new',
      metadata: {
        user_agent: userAgent,
        referer,
        ip_address: clientIP,
        submitted_at: new Date().toISOString(),
      },
    };

    const { data: contactRecord, error: contactError } = await supabase
      .from('contacts')
      .insert(contactData as any)
      .select()
      .single();

    if (contactError) {
      console.error('Supabase contact insert error:', contactError);
      // Continue even if contact insert fails - we'll still save to form_submissions
    }

    // Save to form_submissions table as backup
    const formSubmissionData: FormSubmissionInsert = {
      form_type: 'contact',
      data: {
        name,
        email,
        message,
        company,
        phone,
        budget_range,
        timeline,
        services_interested,
        entryPoint,
      },
      source_url: referer,
      ip_address: clientIP,
      user_agent: userAgent,
      is_processed: false,
      metadata: {
        contact_id: (contactRecord as any)?.id,
        submitted_at: new Date().toISOString(),
      },
    };

    const { data: formSubmission, error: formError } = await supabase
      .from('form_submissions')
      .insert(formSubmissionData as any)
      .select()
      .single() as { data: any; error: any };

    if (formError) {
      console.error('Supabase form_submissions insert error:', formError);
      // Continue even if form submission fails - we'll still send the email
    }

    // Send notification email using Resend
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: 600;
              color: #2D5016;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              background: white;
              padding: 12px;
              border-radius: 6px;
              border: 1px solid #e0e0e0;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 6px;
              border: 1px solid #e0e0e0;
              white-space: pre-wrap;
              font-family: inherit;
            }
            .badge {
              display: inline-block;
              background: #2D5016;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              margin-top: 10px;
            }
            .badge.new {
              background: #4A7C2C;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
            }
            .metadata {
              background: #fff;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #e0e0e0;
              font-size: 11px;
              color: #666;
            }
            .metadata-item {
              margin: 5px 0;
            }
            .services-list {
              list-style: none;
              padding: 0;
              margin: 10px 0 0 0;
            }
            .services-list li {
              background: #f0f4ec;
              padding: 8px 12px;
              margin: 5px 0;
              border-radius: 4px;
              border-left: 3px solid #4A7C2C;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
              ${entryPoint ? `<span class="badge">${entryPoint}</span>` : ''}
              <span class="badge new">New Lead</span>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="field-label">Company</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}
              ${phone ? `
              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ''}
              ${budget_range ? `
              <div class="field">
                <div class="field-label">Budget Range</div>
                <div class="field-value">${budget_range}</div>
              </div>
              ` : ''}
              ${timeline ? `
              <div class="field">
                <div class="field-label">Timeline</div>
                <div class="field-value">${timeline}</div>
              </div>
              ` : ''}
              ${services_interested && services_interested.length > 0 ? `
              <div class="field">
                <div class="field-label">Services Interested</div>
                <ul class="services-list">
                  ${services_interested.map(service => `<li>${service}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              <div class="field">
                <div class="field-label">Submission Details</div>
                <div class="metadata">
                  ${(contactRecord as any)?.id ? `<div class="metadata-item"><strong>Contact ID:</strong> ${(contactRecord as any).id}</div>` : ''}
                  ${(formSubmission as any)?.id ? `<div class="metadata-item"><strong>Submission ID:</strong> ${(formSubmission as any).id}</div>` : ''}
                  <div class="metadata-item"><strong>IP Address:</strong> ${clientIP}</div>
                  ${referer ? `<div class="metadata-item"><strong>Referrer:</strong> ${referer}</div>` : ''}
                  <div class="metadata-item"><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</div>
                </div>
              </div>
            </div>
            <div class="footer">
              Sent from marsala.dev contact form
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission
${entryPoint ? `Entry Point: ${entryPoint}\n` : ''}

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
${budget_range ? `Budget Range: ${budget_range}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}
${services_interested && services_interested.length > 0 ? `Services Interested: ${services_interested.join(', ')}` : ''}

Message:
${message}

---
${(contactRecord as any)?.id ? `Contact ID: ${(contactRecord as any).id}\n` : ''}
${(formSubmission as any)?.id ? `Submission ID: ${(formSubmission as any).id}\n` : ''}
IP Address: ${clientIP}
${referer ? `Referrer: ${referer}\n` : ''}
Submitted: ${new Date().toISOString()}
    `.trim();

    const { data: emailData, error: emailError } = await getResend().emails.send({
      from: 'Marsala Contact Form <onboarding@resend.dev>',
      to: ['sales@marsala.dev'],
      subject: `New Contact Form Submission${company ? ` from ${company}` : ''}${entryPoint ? ` - ${entryPoint}` : ''}`,
      html: emailHTML,
      text: emailText,
    });

    if (emailError) {
      console.error('Resend error:', emailError);

      // Even if email fails, the data is saved to Supabase
      return NextResponse.json(
        {
          success: true,
          message: 'Your message has been received and saved. We will get back to you soon!',
          warning: 'Email notification may have been delayed.',
          id: (contactRecord as any)?.id || (formSubmission as any)?.id,
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetAt).toISOString(),
          },
        }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!',
        id: (contactRecord as any)?.id || (formSubmission as any)?.id,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetAt).toISOString(),
        },
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Provide more specific error messages in development
    const isDev = process.env.NODE_ENV === 'development';
    const errorMessage = isDev && error instanceof Error
      ? error.message
      : 'An unexpected error occurred. Please try again or contact us directly at sales@marsala.dev';

    return NextResponse.json(
      {
        error: errorMessage,
        ...(isDev && error instanceof Error && { stack: error.stack }),
      },
      { status: 500 }
    );
  }
}
