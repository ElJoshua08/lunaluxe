import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_KEY,
} = process.env;

export async function createClient() {
  if(!SUPABASE_URL || !SUPABASE_KEY) {
    return { error: "No ENV variables found" }
  }

  const cookieStore = await cookies();

  return {
    supabase: createServerClient(
      SUPABASE_URL,
      SUPABASE_KEY,
      {
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
      }
    ),
  }
}
