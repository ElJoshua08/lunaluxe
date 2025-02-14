'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .nonempty('This field is required')
    .email('Must be a valid email'),
  password: z.string().nonempty('This field is required'),
});

export default function LoginPage() {
  // Here the idea is to divide the screen in the middle …, having the maximun contrast, in one half whe would put the login form, and in the other, we will put some phrase and image behind to make it look 🌟Luxurious🌟

  return (
    <div className="flex flex-row items-stretch justify-center h-full w-full">
      <section className="bg-background grow h-full w-full flex items-center justify-center flex-col">
        <LoginForm onSuccess={() => toast.success('Login Successful')} />
        <div>
          <div>
            <Separator />
            <p>OR</p>
            <Separator />
          </div>
        </div>
      </section>
      <section className="bg-primary grow w-full flex items-center justify-center">
        <h1 className="font-italianno text-9xl">&quot;Luxurious&quot;</h1>
      </section>

      {/* This button is to change between login and register */}

      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-14 bg-foreground flex items-center justify-center p-2 hover:scale-110 transition-all group">
        <ChevronRight className="text-background size-10 p-0 " />
      </button>
    </div>
  );
}

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(data)
      
    onSuccess();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome to lunaluxe</CardTitle>
        <CardDescription>Some pijo description</CardDescription>
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
