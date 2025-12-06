// Marsala OS - Supabase Browser Client
// Client-side Supabase client for use in Client Components

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Creates a Supabase client for use in Client Components
 * This client automatically handles cookie management for auth state
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * import { createClient } from '@/lib/supabase/client'
 *
 * export default function MyComponent() {
 *   const supabase = createClient()
 *   // Use the client...
 * }
 * ```
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
