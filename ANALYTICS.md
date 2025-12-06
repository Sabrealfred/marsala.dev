# Analytics Event Tracking System

A comprehensive analytics tracking system for marsala.dev with fire-and-forget pattern for optimal performance.

## Overview

This analytics system provides:
- Server-side event tracking via API route
- Client-side React hooks for easy integration
- Automatic session management via cookies
- Auto-capture of user agent, referrer, and IP address
- Fire-and-forget pattern (analytics never blocks user experience)
- Type-safe implementation using Supabase types

## Files Created

1. `/app/api/analytics/route.ts` - POST API endpoint for tracking events
2. `/hooks/useAnalytics.ts` - React hooks for client-side tracking
3. `/hooks/useAnalytics.example.tsx` - Usage examples
4. `/lib/supabase/client.ts` - Supabase client (already existed, reused)

## API Endpoint

### POST `/api/analytics`

Tracks analytics events to the Supabase `analytics_events` table.

**Request Body:**
```json
{
  "event_type": "click",
  "event_name": "cta_button_clicked",
  "properties": {
    "button_text": "Get Started",
    "section": "hero"
  },
  "page_url": "https://marsala.dev/"
}
```

**Auto-Captured Fields:**
- `user_agent` - From request headers
- `referrer` - From request headers
- `session_id` - Generated and stored in cookie if not present
- `ip_address` - From x-forwarded-for or x-real-ip headers

**Response:**
Always returns `200 OK` (fire-and-forget pattern)
```json
{
  "success": true
}
```

## React Hooks

### `useAnalytics()`

Main hook for tracking custom events.

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent({
      event_type: 'click',
      event_name: 'button_clicked',
      properties: {
        button_id: 'cta-1',
        section: 'hero',
      },
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### `usePageView()`

Track page views automatically.

```tsx
import { usePageView } from '@/hooks/useAnalytics';
import { useEffect } from 'react';

function HomePage() {
  const trackPageView = usePageView();

  useEffect(() => {
    trackPageView('Home Page');
  }, [trackPageView]);

  return <div>Home Content</div>;
}
```

### `useClickTracking()`

Simplified hook for tracking clicks.

```tsx
import { useClickTracking } from '@/hooks/useAnalytics';

function Navigation() {
  const trackClick = useClickTracking();

  return (
    <nav>
      <a onClick={() => trackClick('nav_about', { location: 'header' })}>
        About
      </a>
    </nav>
  );
}
```

### `useFormTracking()`

Track form submissions and errors.

```tsx
import { useFormTracking } from '@/hooks/useAnalytics';

function ContactForm() {
  const { trackFormSubmit, trackFormError } = useFormTracking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit form...
      trackFormSubmit('contact_form', { source: 'footer' });
    } catch (error) {
      trackFormError('contact_form', error.message);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### `useCustomEvent()`

Track custom events with a simpler API.

```tsx
import { useCustomEvent } from '@/hooks/useAnalytics';

function VideoPlayer() {
  const trackCustom = useCustomEvent();

  const handlePlay = () => {
    trackCustom('video_played', {
      video_id: 'intro',
      duration: 120,
    });
  };

  return <button onClick={handlePlay}>Play</button>;
}
```

## Database Schema

The `analytics_events` table in Supabase:

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id),
  session_id UUID,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Event Types

Common event types you can use:

- `pageview` - Page views
- `click` - Click events
- `form_submit` - Form submissions
- `form_error` - Form errors
- `custom` - Custom events
- `ecommerce` - E-commerce events
- `search` - Search events
- `module_interaction` - Module/feature interactions

## Properties Object

The `properties` field accepts any JSON object. Use it to store event-specific data:

```tsx
trackEvent({
  event_type: 'ecommerce',
  event_name: 'product_viewed',
  properties: {
    product_id: 'prod_123',
    product_name: 'Premium Package',
    price: 99.00,
    currency: 'USD',
    category: 'subscriptions',
  },
});
```

## Session Management

- Sessions are automatically managed via `analytics_session_id` cookie
- Session cookie expires after 30 minutes of inactivity
- New session ID is generated if cookie is missing
- Cookie is `httpOnly`, `secure` (in production), and uses `sameSite: lax`

## Performance Considerations

1. **Fire-and-Forget**: Analytics calls use `fetch` with `keepalive: true` and don't await responses
2. **Never Blocks**: Analytics errors are caught and logged (dev only), never thrown
3. **Minimal Overhead**: Session ID stored in cookie, avoiding database lookups
4. **Fast API**: API always returns 200 OK immediately, even on errors

## Privacy & GDPR

- IP addresses are captured but can be anonymized
- Session IDs are random UUIDs, not linked to user identity by default
- User consent should be obtained before tracking (implement cookie banner)
- Properties field should not contain PII without user consent

## Usage Examples

See `/hooks/useAnalytics.example.tsx` for comprehensive usage examples including:
- Basic event tracking
- Page view tracking
- Click tracking
- Form tracking
- Custom events
- E-commerce tracking
- Search tracking
- Module interaction tracking

## Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Integration Checklist

- [x] API route created at `/app/api/analytics/route.ts`
- [x] React hooks created at `/hooks/useAnalytics.ts`
- [x] TypeScript types configured
- [x] Supabase client configured
- [ ] Add cookie consent banner (recommended for GDPR)
- [ ] Configure Row Level Security (RLS) policies in Supabase
- [ ] Add analytics dashboard (optional)
- [ ] Set up data retention policies (optional)

## Next Steps

1. **Add to your pages**: Import and use the hooks in your components
2. **Set up RLS**: Configure Supabase Row Level Security policies
3. **Cookie Consent**: Implement cookie consent banner for GDPR compliance
4. **Analytics Dashboard**: Create admin dashboard to view analytics data
5. **IP Geolocation**: Add geolocation service to populate country/city fields
6. **Device Detection**: Parse user agent to populate device_type field

## Support

For questions or issues, refer to:
- Supabase documentation: https://supabase.com/docs
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
