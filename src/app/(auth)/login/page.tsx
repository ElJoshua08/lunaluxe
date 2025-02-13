'use client';

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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginPage() {
  // Here the idea is to divide the screen in the middle …, having the maximun contrast, in one half whe would put the login form, and in the other, we will put some phrase and image behind to make it look 🌟Luxurious🌟

  return (
    <div className="flex flex-row items-stretch justify-center h-full w-full">
      <section className="bg-background grow h-full w-full flex items-center justify-center">
        <LoginForm onSuccess={() => toast.success('Login Successful')} />
      </section>
      <section className="bg-primary grow w-full flex items-center justify-center">
        <h1 className='font-italianno text-9xl'>&quot;Luxurious&quot;</h1>
      </section>
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

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
    onSuccess();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to lunaluxe</CardTitle>
        <CardDescription>Some pijo description</CardDescription>
      </CardHeader>
      <CardContent>
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
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Button onClick={form.handleSubmit(onSubmit)}>Login</Button>
      </CardFooter>
    </Card>
  );
};
