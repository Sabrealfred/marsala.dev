import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, event_name, properties, page_url } = body;

    // Basic validation
    if (!event_type || !event_name) {
      return NextResponse.json(
        { error: 'Missing required fields: event_type and event_name are required' },
        { status: 400 }
      );
    }

    // Auto-capture user_agent from headers
    const user_agent = request.headers.get('user-agent') || null;

    // Auto-capture referrer from headers
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || null;

    // Get or generate session_id from cookie
    const cookieStore = await cookies();
    let session_id = cookieStore.get('analytics_session_id')?.value;

    if (!session_id) {
      session_id = randomUUID();
    }

    // Get IP address from headers (respecting proxy headers)
    const ip_address =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null;

    // Create the analytics event using admin client to bypass RLS
    // (analytics can come from anonymous users)
    const supabase = createAdminClient();

    const { error } = await supabase.from('analytics_events').insert({
      event_type,
      event_name,
      page_url: page_url || null,
      referrer,
      user_agent,
      ip_address,
      session_id,
      properties: properties || {},
    } as any);

    if (error) {
      console.error('Analytics tracking error:', error);
      // Still return 200 for fire-and-forget pattern
      // We don't want analytics failures to affect user experience
    }

    // Set session cookie if it's new (30 minutes expiry for active session)
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    if (!cookieStore.get('analytics_session_id')) {
      response.cookies.set('analytics_session_id', session_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 30, // 30 minutes
        path: '/',
      });
    }

    return response;

  } catch (error) {
    console.error('Analytics API error:', error);
    // Return 200 for fire-and-forget pattern
    // Analytics should never block user experience
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  }
}
