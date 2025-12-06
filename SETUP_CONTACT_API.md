# Contact Form API - Setup Guide

This guide will help you set up the contact form API with Supabase integration for marsala.dev.

## Prerequisites

- Next.js application (already set up)
- Supabase account and project
- Resend account for email delivery

## Installation

The required packages are already installed:
- `@supabase/supabase-js` ✓
- `@supabase/ssr` ✓
- `resend` ✓

## Setup Steps

### 1. Supabase Database Setup

First, ensure your Supabase database has the required tables. Run this SQL in your Supabase SQL Editor:

```sql
-- Contacts table should already exist from your schema
-- Verify it has all required columns:
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'contacts';

-- Form submissions table should already exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'form_submissions';
```

If you need to add any missing columns, the schema is defined in `/root/marsala.dev/lib/supabase/types.ts`.

### 2. Enable Row Level Security (RLS)

For the contact form to work with the admin client, ensure RLS is configured properly:

```sql
-- Allow service role to insert into contacts
-- (Service role bypasses RLS by default, but good to have policies)

-- For contacts table
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert contacts"
  ON contacts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- For form_submissions table
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert form submissions"
  ON form_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Where to find these:**

- **Supabase URL & Keys**: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
- **Resend API Key**: https://resend.com/api-keys

### 4. Resend Email Setup

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Add and verify your domain (marsala.dev)
3. Add `sales@marsala.dev` as a verified sender email
4. Get your API key from the dashboard
5. Add the API key to `.env.local`

**Temporary Development:**
While waiting for domain verification, you can use `onboarding@resend.dev` (already configured in the code) and send to verified emails only.

### 5. Test the API

#### Using cURL:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message to verify the contact form API is working correctly.",
    "company": "Test Company",
    "phone": "+1-555-0123",
    "budget_range": "$10k - $25k",
    "timeline": "1-3 months",
    "services_interested": ["Web Development", "Brand Strategy"],
    "entryPoint": "test"
  }'
```

#### Using the example component:

Copy the example component from `/root/marsala.dev/app/api/contact/example-usage.tsx` to your pages.

#### Expected Response:

```json
{
  "success": true,
  "message": "Your message has been sent successfully. We will get back to you soon!",
  "id": "uuid-here"
}
```

#### Check Supabase:

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Check the `contacts` table for the new entry
4. Check the `form_submissions` table for the backup record

#### Check Email:

You should receive an email at `sales@marsala.dev` (or the configured recipient) with:
- All form field data
- Contact ID and Submission ID
- IP address and metadata
- Beautiful HTML formatting

### 6. Verify Rate Limiting

Send 6 requests quickly to test rate limiting:

```bash
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test $i\",\"email\":\"test$i@example.com\",\"message\":\"Test message number $i for rate limiting\"}"
  echo "\n"
done
```

The 6th request should return a 429 status code with:

```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 900
}
```

## File Structure

```
/root/marsala.dev/
├── app/
│   └── api/
│       └── contact/
│           ├── route.ts              # Main API route handler
│           ├── README.md             # API documentation
│           └── example-usage.tsx     # Frontend integration example
├── lib/
│   └── supabase/
│       ├── server.ts                 # Supabase server clients
│       └── types.ts                  # TypeScript types from schema
└── .env.local                        # Environment variables (create this)
```

## Features Implemented

✅ **Validation**
- Required fields: name, email, message
- Email format validation
- Message length limits (10-5000 chars)

✅ **Database Storage**
- Primary storage in `contacts` table
- Backup storage in `form_submissions` table
- Metadata tracking (IP, user agent, referer)

✅ **Email Notifications**
- HTML and plain text emails
- Sent to sales@marsala.dev
- Beautiful branded template
- Includes all form data and metadata

✅ **Rate Limiting**
- 5 requests per 15 minutes per IP
- Rate limit headers in responses
- Automatic cleanup of expired records

✅ **Error Handling**
- Graceful degradation (continues even if parts fail)
- Development vs production error messages
- Detailed logging for debugging

✅ **Security**
- Server-side only (admin client with service role)
- IP tracking for abuse prevention
- Input validation
- Rate limiting

## Production Considerations

### 1. Rate Limiting
The current implementation uses in-memory rate limiting, which resets when the server restarts. For production:

- Use Redis (Upstash, Railway, etc.)
- Or use a service like Vercel Edge Config
- Or implement database-based rate limiting

### 2. Email Configuration
- Verify your domain in Resend
- Update the "from" address in route.ts:
  ```typescript
  from: 'Marsala Contact Form <contact@marsala.dev>',
  ```
- Consider adding auto-reply emails to users

### 3. Monitoring
- Set up error tracking (Sentry, etc.)
- Monitor Supabase usage
- Track email delivery rates
- Set up alerts for rate limit violations

### 4. Additional Features to Consider
- Honeypot field for spam prevention
- CAPTCHA integration (hCaptcha, reCAPTCHA)
- Webhook notifications to Slack/Discord
- Auto-assignment of contacts to team members
- Email confirmation to sender
- Queue system for high volume

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` exists and has all required variables
- Restart your dev server after adding environment variables
- Check that variable names match exactly (including NEXT_PUBLIC_ prefix)

### "Failed to send email"
- Verify your Resend API key is correct
- Check that the sender email is verified in Resend
- Check Resend dashboard for error details
- Ensure you haven't exceeded your rate limit (100/day on free tier)

### Database insert errors
- Verify RLS policies allow inserts
- Check that service role key is correct
- Ensure table schemas match the types
- Look at Supabase logs for detailed errors

### Rate limiting not working
- In-memory rate limiting works per server instance
- If using serverless, each function may have its own memory
- Consider implementing database-based rate limiting for consistency

## Support

For issues or questions:
- Check the API documentation: `/root/marsala.dev/app/api/contact/README.md`
- Review the example usage: `/root/marsala.dev/app/api/contact/example-usage.tsx`
- Check Supabase logs: https://supabase.com/dashboard/project/YOUR_PROJECT/logs/edge-logs
- Check Resend logs: https://resend.com/emails

## Next Steps

1. Set up your Supabase database (if not already done)
2. Configure environment variables
3. Verify Resend domain and sender email
4. Test the API endpoint
5. Integrate into your frontend
6. Deploy to production
7. Monitor and iterate

---

**Created for marsala.dev** | Last updated: December 2025
