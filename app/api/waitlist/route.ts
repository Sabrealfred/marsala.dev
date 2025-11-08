import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, entryPoint } = body;

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email are required' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Enviar email a sales
    const { data, error } = await resend.emails.send({
      from: 'Marsala Waitlist <onboarding@resend.dev>',
      to: ['sabre.alfredo@gmail.com'],  // Cambia esto a tu email cuando verifiques el dominio
      subject: `New Waitlist Signup${entryPoint ? ` - Entry Point: ${entryPoint}` : ''}`,
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
              .entry-point { display: inline-block; background: #2D5016; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-top: 10px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎯 New Waitlist Signup</h1>
                ${entryPoint ? `<span class="entry-point">Entry Point: ${entryPoint}</span>` : ''}
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
                ${entryPoint ? `
                <div class="field">
                  <div class="field-label">Entry Point</div>
                  <div class="field-value">${entryPoint}</div>
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
${entryPoint ? `Entry Point: ${entryPoint}\n` : ''}

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${entryPoint ? `\nEntry Point: ${entryPoint}` : ''}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again or contact us at sales@marsala.dev' },
        { status: 500 }
      );
    }

    // Opcional: Enviar email de confirmación al usuario
    // Puedes descomentar esto si quieres que el usuario reciba confirmación
    /*
    await resend.emails.send({
      from: 'Marsala OS <noreply@marsala.dev>',
      to: [email],
      subject: 'Welcome to Marsala OS Waitlist',
      html: `...email de confirmación...`,
    });
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist! We will notify you when we launch.',
        id: data?.id
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
