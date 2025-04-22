import { createServerClient as supabaseCreateServerClient } from '@supabase/ssr';
import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SUPABASE_KEY,
} = process.env;

export async function createServerClient() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing ENV variables');
  }

  const cookieStore = await cookies();

  return supabaseCreateServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export async function createClient() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing ENV variables');
  }

  return supabaseCreateClient(SUPABASE_URL, SUPABASE_KEY);
}