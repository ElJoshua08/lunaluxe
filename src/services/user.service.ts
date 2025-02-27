'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { loginSchema, registerSchema } from '@/lib/schema/auth';
import { createClient } from '@/lib/utils/supabase/server';
import {
  SignUpWithPasswordCredentials,
  VerifyOtpParams,
} from '@supabase/supabase-js';
import { headers } from 'next/headers';

import { z } from 'zod';

export async function login(data: z.infer<typeof loginSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(data: z.infer<typeof registerSchema>) {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/verify-email`,
      data: {
        display_name: `${data.firstName} ${data.lastName}`,
      },
    },
  } as SignUpWithPasswordCredentials);

  if (error) {
    return error.message;
  }
}

export async function resendEmail(email: string) {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${origin}/verify-email`,
    },
  });

  if (error) {
    return error.message;
  }
}

export async function verifyEmail(tokenHash: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type: 'email',
    token_hash: tokenHash,
  } as VerifyOtpParams);

  if (error) {
    return error.message;
  }
}
