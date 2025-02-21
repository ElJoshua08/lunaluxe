'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { loginSchema, registerSchema } from '@/lib/schema/auth';
import { createClient } from '@/lib/utils/supabase/server';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { z } from 'zod';

export async function login(data: z.infer<typeof loginSchema>) {
  const { error: clientError, supabase } = await createClient();

  if (clientError || !supabase) {
    return clientError;
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(data: z.infer<typeof registerSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/verify-email`,
      data: {
        display_name: `${data.firstName} ${data.lastName}`,
      },
    },
  } as SignUpWithPasswordCredentials);

  if (error) {
    return error.message;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
