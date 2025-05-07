"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { loginSchema, registerSchema } from "@/lib/schema/auth";
import { createClient, createServerClient } from "@/lib/utils/supabase/server";
import {
  Provider,
  SignUpWithPasswordCredentials,
  User,
  VerifyOtpParams,
} from "@supabase/supabase-js";
import { headers } from "next/headers";

import { z } from "zod";

export async function getUser(): Promise<{
  user?: User;
  error?: Error;
}> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return {
      error: error,
    };
  }

  return {
    user: data.user,
  };
}

export async function login({ email, password }: z.infer<typeof loginSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  revalidatePath("/", "page");
  redirect("/");
}

export async function loginWithProvider(
  provider: Provider
): Promise<{ error?: string }> {
  const supabase = await createServerClient();

  console.log("Logging in with provider: ", provider);
  console.log(
    "Redirecting to: ",
    `${process.env.NEXT_PUBLIC_SITE_URL}/callback`
  );

  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  });

  console.log("Now you should already be redirected to the provider");

  if (error) {
    return { error: error.message };
  }

  return {};
}

export async function register(data: z.infer<typeof registerSchema>) {
  const supabase = await createServerClient();
  const origin = (await headers()).get("origin");

  const { error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/verify-email`,

      data: {
        display_name: `${data.firstName} ${data.lastName}`,
      },
    },
  } as SignUpWithPasswordCredentials);

  if (authError) {
    return authError.message;
  }

  const { error: dbError } = await supabase.from("users").insert([
    {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    },
  ]);

  if (dbError) {
    return dbError.message;
  }
}

export async function resendEmail(email: string) {
  const supabase = await createServerClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resend({
    type: "signup",
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
  const supabase = await createServerClient();

  const { error } = await supabase.auth.verifyOtp({
    type: "email",
    token_hash: tokenHash,
  } as VerifyOtpParams);

  if (error) {
    return error.message;
  }
}

export async function logout() {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendPasswordRecoveryEmail(email: string) {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return {};
}
