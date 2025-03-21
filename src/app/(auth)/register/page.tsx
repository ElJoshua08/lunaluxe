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
import { register, resendEmail } from '@/services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ContinueButton } from '../components/continue-button';

export default function RegisterPage() {
  // * Here the idea is to divide the screen in the middle …, having the maximun contrast, in one half whe would put the login form, and in the other, we will put some phrase and image behind to make it look 🌟Luxurious🌟

  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>();

  async function onSuccess(email: string) {
    setEmail(email);
    setIsVerifying(true);

    localStorage.setItem(
      'emailVerification',
      JSON.stringify({ isVerifying: true })
    );
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // * Here we get the variables from localstorage and shit and giggles.

        const { isVerified, isVerifying, email } = JSON.parse(
          localStorage.getItem('emailVerification') || '{}'
        );

        if (isVerifying && email) {
          setIsVerifying(isVerifying);
          setEmail(email);
        }

        if (isVerified) {
          router.push('/');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isVerifying, router]);

  return (
    <div className="flex flex-row justify-center lg:items-stretch w-full h-full">
      <SuccessCard
        isVerifying={isVerifying}
        email={email}
      />
      <section className="bg-primary w-1/2 items-center justify-center px-6 hidden lg:flex">
        <h1 className="font-italianno font-medium text-9xl text-center text-balance text-white">
          Because excellence is never accidental.
        </h1>
      </section>
      <section className="bg-background w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <RegisterForm onSuccess={(email) => onSuccess(email)} />
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-12 p-[0.8rem] bg-white 
       hover:scale-110 transition-all group shadow-md shadow-black/50 items-center justify-center hidden lg:flex"
      >
        <ChevronRight
          className="text-black size-32 rotate-180 "
          size={48}
        />
      </Link>
    </div>
  );
}

const RegisterForm = ({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) => {
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

    onSuccess(data.email);
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

const SuccessCard = ({
  isVerifying,
  email,
}: {
  isVerifying: boolean;
  email?: string;
}) => {
  if (!isVerifying || !email) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* // The overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 -z-10 animate-fade animate-duration-200 animate-once animate-fill-forwards" />

      {/* // The dialog */}
      <Card className="animate-fade-up animate-delay-150 animate-duration-300 animate-once animate-fill-forwards max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to LunaLuxe!</CardTitle>
          <CardDescription>
            Before continuing, please verify your account. We have sent you an
            email with a verification link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground text-left">
            Didn’t receive the email? Check your spam folder or request a new
            one below.
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-x-2">
          <Button
            variant="default"
            className="w-full"
            onClick={async () => resendEmail(email)}
            loadOnClick
          >
            Resend Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
