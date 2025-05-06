"use client"

import { GoogleIcon } from "@/components/icons/google"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { registerSchema } from "@/lib/schema/auth"
import { register, resendEmail } from "@/services/user.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { ContinueButton } from "../_components/continue-button"

export default function RegisterPage() {
  // * Here the idea is to divide the screen in the middle …, having the maximun contrast, in one half whe would put the login form, and in the other, we will put some phrase and image behind to make it look 🌟Luxurious🌟

  const router = useRouter()

  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [email, setEmail] = useState<string | undefined>()

  async function onSuccess(email: string) {
    setEmail(email)
    setIsVerifying(true)

    localStorage.setItem(
      "emailVerification",
      JSON.stringify({ isVerifying: true })
    )
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // * Here we get the variables from localstorage and shit and giggles.

        const { isVerified, isVerifying, email } = JSON.parse(
          localStorage.getItem("emailVerification") || "{}"
        )

        if (isVerifying && email) {
          setIsVerifying(isVerifying)
          setEmail(email)
        }

        if (isVerified) {
          router.push("/")
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isVerifying, router])

  return (
    <div className="flex h-full w-full flex-row justify-center lg:items-stretch">
      <SuccessCard isVerifying={isVerifying} email={email} />
      <section className="hidden w-1/2 items-center justify-center bg-primary px-6 lg:flex">
        <h1 className="text-balance text-center font-italianno text-9xl font-medium text-white">
          Because excellence is never accidental.
        </h1>
      </section>
      <section className="flex w-1/2 items-center justify-center bg-background">
        <div className="flex h-full flex-col items-center justify-center">
          <RegisterForm onSuccess={(email) => onSuccess(email)} />
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-x-2">
            <Separator className="shrink grow !bg-foreground/40" />
            <p className="text-lg text-foreground/70">OR</p>
            <Separator className="shrink grow !bg-foreground/40" />
          </div>
          <div className="mt-4 w-full">
            <ContinueButton
              label="Continue with Google"
              provider="google"
              icon={<GoogleIcon size={120} className="size-[24px] shrink-0" />}
            />
          </div>
        </div>
      </section>

      {/* This button is to change between login and register */}

      <Link
        href="/login"
        className="group absolute left-1/2 top-1/2 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-[0.8rem] shadow-md shadow-black/50 transition-all hover:scale-110 lg:flex">
        <ChevronRight className="size-32 rotate-180 text-black" size={48} />
      </Link>
    </div>
  )
}

const RegisterForm = ({
  onSuccess,
}: {
  onSuccess: (email: string) => void
}) => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const error = await register(data)

    if (error) {
      toast.error(error)
      return
    }

    onSuccess(data.email)
  }

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to lunaluxe</CardTitle>
        <CardDescription>Please regiser before continuing.</CardDescription>
      </CardHeader>
      <CardContent className="mb-6 space-y-4">
        <Form {...form}>
          <div className="flex flex-row gap-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
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
                    <Input {...field} placeholder="Name" />
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
                  <Input {...field} placeholder="Email" />
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
                  <PasswordInput {...field} placeholder="Confirm Password" />
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
          loadOnClick>
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

const SuccessCard = ({
  isVerifying,
  email,
}: {
  isVerifying: boolean
  email?: string
}) => {
  if (!isVerifying || !email) return null

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      {/* // The overlay */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full animate-fade bg-black/80 animate-duration-200 animate-fill-forwards animate-once" />

      {/* // The dialog */}
      <Card className="max-w-md animate-fade-up animate-delay-150 animate-duration-300 animate-fill-forwards animate-once">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to LunaLuxe!</CardTitle>
          <CardDescription>
            Before continuing, please verify your account. We have sent you an
            email with a verification link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-left text-sm text-muted-foreground">
            Didn’t receive the email? Check your spam folder or request a new
            one below.
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-x-2">
          <Button
            variant="default"
            className="w-full"
            onClick={async () => resendEmail(email)}
            loadOnClick>
            Resend Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
