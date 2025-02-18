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
import { Separator } from '@/components/ui/separator';
import { registerSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { register } from '../actions';
import { ContinueButton } from '../components/continue-button';

export default function RegisterPage() {
  // Here the idea is to divide the screen in the middle …, having the maximun contrast, in one half whe would put the login form, and in the other, we will put some phrase and image behind to make it look 🌟Luxurious🌟

  return (
    <div className="flex flex-row items-stretch justify-center h-full w-full">
      <section className="bg-primary w-1/2 flex items-center justify-center px-6">
        <h1 className="font-italianno font-medium text-9xl text-center text-balance text-white">
          Because excellence is never accidental.
        </h1>
      </section>
      <section className="bg-background w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <RegisterForm />
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

      {/* This button is to change between login and register */}

      <Link
        href="/login"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-12 p-[0.8rem]  bg-white 
       hover:scale-110 transition-all group shadow-md shadow-black/50 flex items-center justify-center"
      >
        <ChevronRight
          className="text-black size-32 rotate-180 "
          size={48}
        />
      </Link>
    </div>
  );
}

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const error = await register(data);

    if (error) {
      toast.error(error);
      return;
    }
  }

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to lunaluxe</CardTitle>
        <CardDescription>Please regiser before continuing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mb-6">
        <Form {...form}>
          <div className="flex flex-row gap-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className="flex items-end justify-between">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
          loadOnClick
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};
