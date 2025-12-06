// Marsala OS - Supabase Middleware Helper
// Middleware helper for refreshing auth tokens and managing user sessions

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from './types';

/**
 * Updates the user session by refreshing the auth token
 * This should be called in your Next.js middleware to ensure
 * the user's session is always up-to-date
 *
 * The middleware:
 * 1. Creates a Supabase client that can read/write cookies
 * 2. Refreshes the session if needed
 * 3. Returns a response with updated cookies
 *
 * @example
 * ```tsx
 * // middleware.ts
 * import { updateSession } from '@/lib/supabase/middleware'
 *
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request)
 * }
 *
 * export const config = {
 *   matcher: [
 *     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
 *   ],
 * }
 * ```
 */
export async function updateSession(request: NextRequest) {
  // Create a response object to modify
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: Refresh session if expired - required for Server Components
  // This will automatically refresh the session if it's expired
  // Without this, authenticated routes may not work correctly
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Optional: Protect specific routes
  // Uncomment and customize based on your needs
  /*
  const protectedPaths = ['/dashboard', '/admin', '/profile'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    // Redirect to login if accessing protected route without auth
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Optional: Redirect authenticated users away from auth pages
  const authPaths = ['/login', '/signup'];
  const isAuthPath = authPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPath && user) {
    // Redirect to dashboard if already logged in
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }
  */

  return response;
}

/**
 * Helper function to get the current user in middleware
 * Useful for custom middleware logic based on user authentication
 *
 * @example
 * ```tsx
 * // middleware.ts
 * import { getUser } from '@/lib/supabase/middleware'
 *
 * export async function middleware(request: NextRequest) {
 *   const { user, response } = await getUser(request)
 *
 *   if (!user && request.nextUrl.pathname.startsWith('/protected')) {
 *     const redirectUrl = request.nextUrl.clone()
 *     redirectUrl.pathname = '/login'
 *     return NextResponse.redirect(redirectUrl)
 *   }
 *
 *   return response
 * }
 * ```
 */
export async function getUser(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, response };
}
