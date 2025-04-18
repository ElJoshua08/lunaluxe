"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { productBasicInfoSchema } from "@/lib/schema/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function CreateProductPage() {
  /* Here the plan is to make a multi-step form with the following steps:
    1. Product basics: Name, description (rich text), price, category, etc.
    2. Product visuals: Images, models, multiple colors etc.
    3. Product customization: Colors, Sizes, Custom Texts etc. 
    4. Product delivery: Shipping time, production time, etc.
   */

  /* The next thing is to upload all the images models and data into the db using supabase storage and databases. */

  // * Some variables to make the experience better
  const totalSteps = 3
  const [currentStep, setCurrentStep] = useState(0)

  // * Here in the page i want to have the form with the useForm.

  const method = useForm<z.infer<typeof productBasicInfoSchema>>({
    resolver: zodResolver(productBasicInfoSchema),
  })

  return (
    <main className="flex h-full w-full flex-col items-start justify-start p-8">
      {/* Form Header */}
      <header className="mb-2 flex h-8 w-full items-center justify-start">
        <h1 className="text-center text-base">
          Create Product -{" "}
          <strong className="text-xl">Step {currentStep}</strong>
        </h1>
      </header>

      <Separator />

      {/* Form Body */}
      <div className="mt-4 flex h-full w-full">
        {/* Here we change the form depending on the current step, maybe we can use a custom component for that */}
        <Form {...method}>
          <form className="flex h-full w-full flex-col items-start justify-start gap-y-4">
            <div className="flex h-full w-1/2 flex-col items-start justify-start gap-y-4">
              <FormField
                control={method.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" className="w-full" />
                    </FormControl>
                    <FormDescription>
                      The name you want to give to your product.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={method.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* Here in the price i need to make a custom price component to make it easier to use. */}
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex. 100€"
                        className="w-full"
                        type="number"
                      />
                    </FormControl>
                    <FormDescription>
                      The price you want to give to your product, please use
                      commas for the decimal point.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Here a little chanllenge for myself, i want to make a custom component that is a rich text editor, having like bold, italic, underline, etc. I want to make use of it in the form for the product description. */}
          </form>
        </Form>
      </div>

      {/* Form Footer */}
      <footer className="flex w-full flex-row items-center justify-around gap-x-12">
        {/* Timeline or smth like that */}
        <div className="flex w-full flex-row items-center justify-start">
          <span className="mr-2 w-14 shrink-0 text-lg text-foreground/85">
            {currentStep} of {totalSteps}
          </span>
          <div className="h-2 w-full rounded-full bg-foreground/60">
            <motion.div
              className="h-2 rounded-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        <Button
          onClick={() => setCurrentStep((currentStep + 1) % (totalSteps + 1))}>
          {currentStep === totalSteps ? "Create Product" : "Next Step"}{" "}
          {currentStep === totalSteps ? <Check /> : <ChevronRight />}
        </Button>
      </footer>
    </main>
  )
}
