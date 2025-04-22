"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCategories } from "@/hooks/useCategory"
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
  const steps = ["Basics", "Visuals", "Customization", "Delivery"]

  // * Categories get from the service
  const { categories, loading } = useCategories()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentStep, setCurrentStep] = useState(0)

  // * Here in the page i want to have the form with the useForm.
  const method = useForm<z.infer<typeof productBasicInfoSchema>>({
    resolver: zodResolver(productBasicInfoSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  })

  if (loading) return <div>Loading...</div>

  return (
    <main className="flex h-full w-full flex-col items-start justify-start p-8">
      {/* Form Header */}
      <header className="mb-2 flex h-8 w-full items-center justify-start">
        <h1 className="text-center text-base">
          Step {currentStep + 1} -{" "}
          <strong className="text-xl">{steps[currentStep]}</strong>
        </h1>
      </header>

      <Separator />

      {/* Form Body */}
      <div className="mt-4 flex h-full w-full">
        {/* Here we change the form depending on the current step, maybe we can use a custom component for that */}
        <Form {...method}>
          <form className="flex h-full w-full flex-col items-start justify-start gap-x-8 gap-y-4 md:flex-row">
            <div className="flex w-full flex-col items-start justify-start gap-y-4 md:h-full md:w-1/2">
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
                        min="0.1"
                        className="w-full"
                        type="number"
                      />
                    </FormControl>
                    <FormDescription>
                      The price you want to give to your product, please use
                      dots for the decimal point. (50.99€)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {categories.map((category) => {
                            return (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      The category you want to give to your product.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Here a little chanllenge for myself, i want to make a custom component that is a rich text editor, having like bold, italic, underline, etc. I want to make use of it in the form for the product description. */}

            <div className="flex h-full w-full flex-col items-start justify-start md:w-1/2">
              <FormField
                control={method.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-full w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        className="h-[calc(100%-80px)]"
                        onChange={field.onChange}
                        immediatelyRender={false}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>

      {/* Form Footer */}
      <footer className="flex w-full flex-row items-center justify-around gap-x-12">
        {/* Timeline or smth like that */}
        <div className="flex w-full flex-row items-center justify-start">
          <span className="mr-2 w-14 shrink-0 text-lg text-foreground/85">
            {currentStep + 1} of {steps.length}
          </span>
          <div className="hidden h-2 w-full rounded-full bg-foreground/40 md:block">
            <motion.div
              className="h-2 rounded-full bg-foreground"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        <Button onClick={method.handleSubmit((data) => console.log(data))}>
          {currentStep + 1 === steps.length ? "Create Product" : "Next Step"}{" "}
          {currentStep + 1 === steps.length ? <Check /> : <ChevronRight />}
        </Button>
      </footer>
    </main>
  )
}
