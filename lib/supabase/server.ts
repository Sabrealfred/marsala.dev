// Marsala OS - Supabase Server Client
// Server-side Supabase clients for use in Server Components, Route Handlers, and Server Actions

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

/**
 * Creates a Supabase client for use in Server Components
 * This client reads cookies but does not modify them (read-only mode)
 *
 * Use this in Server Components where you only need to read data
 *
 * @example
 * ```tsx
 * import { createClient } from '@/lib/supabase/server'
 *
 * export default async function MyServerComponent() {
 *   const supabase = createClient()
 *   const { data } = await supabase.from('posts').select()
 *   // Render data...
 * }
 * ```
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

/**
 * Creates a Supabase client for use in Route Handlers and Server Actions
 * This client can both read and write cookies, enabling auth state updates
 *
 * Use this in Route Handlers (API routes) and Server Actions where you need to
 * modify auth state (login, logout, signup, etc.)
 *
 * @example
 * ```tsx
 * // In a Route Handler (app/api/auth/callback/route.ts)
 * import { createClient } from '@/lib/supabase/server'
 *
 * export async function GET(request: Request) {
 *   const supabase = await createClientForRouteHandler()
 *   // Handle auth callback...
 * }
 * ```
 *
 * @example
 * ```tsx
 * // In a Server Action
 * 'use server'
 *
 * import { createClientForRouteHandler } from '@/lib/supabase/server'
 *
 * export async function loginAction(formData: FormData) {
 *   const supabase = await createClientForRouteHandler()
 *   const { error } = await supabase.auth.signInWithPassword({
 *     email: formData.get('email') as string,
 *     password: formData.get('password') as string,
 *   })
 *   // Handle result...
 * }
 * ```
 */
export async function createClientForRouteHandler() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

/**
 * Creates a Supabase admin client with service role key
 * This client bypasses Row Level Security (RLS) and should only be used
 * in trusted server-side contexts
 *
 * WARNING: Never expose this client to the browser or untrusted code!
 * Only use in secure server-side operations like background jobs,
 * admin operations, or trusted API endpoints
 *
 * @example
 * ```tsx
 * // In a secure API route
 * import { createAdminClient } from '@/lib/supabase/server'
 *
 * export async function POST(request: Request) {
 *   const supabase = createAdminClient()
 *   // Perform admin operations...
 * }
 * ```
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. This is required for admin operations.'
    );
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Admin client doesn't need to set cookies
        },
      },
    }
  );
}
