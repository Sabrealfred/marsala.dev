# Contact Form API Route

This API route handles contact form submissions for marsala.dev, with full Supabase integration, rate limiting, and email notifications.

## Endpoint

```
POST /api/contact
```

## Features

- ✅ Form validation (required and optional fields)
- ✅ Email validation and message length checks
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Dual database storage (contacts + form_submissions tables)
- ✅ Email notification via Resend to sales@marsala.dev
- ✅ IP address tracking and metadata collection
- ✅ Comprehensive error handling
- ✅ Rate limit headers in response
- ✅ TypeScript types from Supabase schema

## Request Body

### Required Fields
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services..."
}
```

### Optional Fields
```json
{
  "company": "Acme Inc",
  "phone": "+1-555-0123",
  "budget_range": "$10k - $25k",
  "timeline": "3-6 months",
  "services_interested": ["Web Development", "Brand Strategy", "CRM"],
  "entryPoint": "homepage_hero"
}
```

## Response

### Success (200)
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We will get back to you soon!",
  "id": "uuid-of-contact-record"
}
```

### Rate Limit Exceeded (429)
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 300
}
```

### Validation Error (400)
```json
{
  "error": "Missing required fields: name, email, and message are required"
}
```

### Server Error (500)
```json
{
  "error": "An unexpected error occurred. Please try again or contact us directly at sales@marsala.dev"
}
```

## Rate Limiting

- **Limit**: 5 requests per 15 minutes per IP address
- **Headers**: Response includes rate limit information:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in current window
  - `X-RateLimit-Reset`: ISO timestamp when limit resets
  - `Retry-After`: Seconds until retry (429 responses only)

## Database Storage

### Contacts Table
Stores structured contact information:
- Contact details (name, email, company, phone)
- Message and service interests
- Budget and timeline
- Source tracking
- Status (starts as 'new')
- Metadata (IP, user agent, referer)

### Form Submissions Table
Backup storage with raw form data:
- Form type identifier
- Complete JSON data payload
- Source URL and IP tracking
- Processing status
- Link to contact record ID

## Email Notification

Sends HTML and text email to `sales@marsala.dev` with:
- All form fields
- Contact and submission IDs
- IP address and referer
- Timestamp in EST
- Beautiful HTML template with Marsala branding

## Environment Variables

Required in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Validation Rules

- **Email**: Must match standard email regex pattern
- **Message**: Minimum 10 characters, maximum 5000 characters
- **Name**: Required, any length
- **Optional fields**: No validation, stored as-is

## Error Handling

The API uses graceful degradation:
1. If contact insert fails, still saves to form_submissions
2. If form_submissions fails, still sends email
3. If email fails, still returns success (data is saved)
4. Development mode shows detailed error messages

## Usage Example

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Tech Startup Inc',
    message: 'Interested in your services for our new project',
    budget_range: '$25k - $50k',
    timeline: '1-3 months',
    services_interested: ['Web Development', 'Brand Strategy'],
    entryPoint: 'services_page_cta'
  }),
});

const data = await response.json();

if (response.ok) {
  console.log('Success!', data.message);
} else {
  console.error('Error:', data.error);
}
```

## Testing

### Test with cURL
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the contact form API",
    "company": "Test Company",
    "entryPoint": "test"
  }'
```

## Security Features

- Rate limiting prevents spam and abuse
- Email validation prevents invalid addresses
- Message length limits prevent payload attacks
- IP tracking for abuse monitoring
- Service role key used server-side only
- Input sanitization (Supabase handles SQL injection)

## Notes

- Rate limiting uses in-memory storage (resets on server restart)
- For production with multiple servers, consider Redis or Upstash
- Ensure Supabase RLS policies allow inserts to both tables
- Verify sales@marsala.dev in Resend dashboard before production
