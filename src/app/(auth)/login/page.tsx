'use client';

import { GoogleIcon } from '@/components/icons/google';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { loginSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { login } from '../actions';
import { ContinueButton } from '../components/continue-button';

export default function LoginPage() {
  // Here the idea is to divide the screen in the middle …, having the maximun contrast, in one half whe would put the login form, and in the other, we will put some phrase and image behind to make it look 🌟Luxurious🌟

  return (
    <div className="flex flex-row items-stretch justify-center h-full w-full">
      <section className="bg-background w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <LoginForm />
          <div className="flex flex-row items-center justify-center w-full mt-4 gap-x-2">
            <Separator className="grow shrink !bg-foreground/40" />
            <p className="text-foreground/70 text-lg">OR</p>
            <Separator className="grow shrink !bg-foreground/40" />
          </div>
          <div className="mt-4 w-full">
            <ContinueButton
              icon={
                <GoogleIcon
                  size={120}
                  className="shrink-0 size-[24px]"
                />
              }
              label="Continue with Google"
            />
          </div>
        </div>
      </section>
      <section className="bg-primary w-1/2 flex items-center justify-center px-6">
        <h1 className="font-italianno font-medium text-9xl text-center text-balance text-white">
          Elegance is the only beauty that never fades.
        </h1>
      </section>

      {/* This button is to change between login and register */}

      <Link
        href="/register"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-12 p-[0.8rem]  bg-white 
       hover:scale-110 transition-all group shadow-md shadow-black/50 flex items-center justify-center"
      >
        <ChevronRight
          className="text-black size-32 "
          size={48}
        />
      </Link>
    </div>
  );
}

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const error = await login(data);

    if (error) {
      toast.error(error);
      return;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome to lunaluxe</CardTitle>
        <CardDescription>Please login before continuing. </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 mb-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className="flex items-end justify-between gap-x-16">
        <Link href={'/forgot-password'}>
          <Label
            variant="link"
            size="sm"
          >
            Forgot your password?
          </Label>
        </Link>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          loadOnClick
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};
