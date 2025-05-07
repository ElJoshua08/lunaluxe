"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { forgotPasswordSchema, forgotPasswordType } from "@/lib/schema/auth";
import { sendPasswordRecoveryEmail } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const form = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    }
  })

  const [cooldownTime, setCooldownTime] = useState(0)
  const cooldownTimeOnClick = 15


  async function onSubmit({ email }: forgotPasswordType) {

    setCooldownTime(cooldownTimeOnClick)

    const { error } = await sendPasswordRecoveryEmail(email)

    if(error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    if(cooldownTime > 0) {
      const timer = setTimeout(() => {
        setCooldownTime(cooldownTime - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [cooldownTime])

  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Forgot Password?</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-5">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="email"
                render={({ field}) => (
                  <FormItem>
                    <FormLabel>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. lunaluxe@contact.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      The email that you provided when creating your account
                    </FormDescription>
                  </FormItem>
                )}
              />
              </form>
          </Form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={cooldownTime > 0} onClick={form.handleSubmit(onSubmit)}>
                {cooldownTime > 0 ? `Resend in ${cooldownTime}s` : "Send Password Reset Email"}
            </Button>
            </CardFooter>
      </Card>
    </>
  );
}
