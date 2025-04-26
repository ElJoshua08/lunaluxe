"use client"

import {
  Basics,
  BasicsRef,
} from "@/app/(admin)/dashboard/products/create/_components/basics"
import {
  Customization,
  CustomizationRef,
} from "@/app/(admin)/dashboard/products/create/_components/customization"
import { Delivery, DeliveryRef } from "@/app/(admin)/dashboard/products/create/_components/delivery"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCategories } from "@/hooks/useCategory"
import { productType } from "@/lib/schema/product"
import { createProduct } from "@/services/product.service"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

export default function CreateProductPage() {
  // * Here the plan is to make a multi-step form with the following steps:
  // *  1. Product basics: Name, description (rich text), price, category, etc.
  // *  2. Product visuals: Images, models, multiple colors etc.
  // *  3. Product customization: Colors, Sizes, Custom Texts etc.
  // *  4. Product delivery: Shipping time, production time, etc.
  const { categories, loading } = useCategories()

  const formRefs = {
    basics: useRef<BasicsRef>(null),
    customization: useRef<CustomizationRef>(null),
    delivery: useRef<DeliveryRef>(null),
  }

  const steps = [
    {
      label: "Customization",
      ref: formRefs.customization,
      component: <Customization ref={formRefs.customization} />,
    },
    {
      label: "Basics",
      ref: formRefs.basics,
      component: <Basics ref={formRefs.basics} categories={categories} />,
    },
    {
      label: "Delivery",
      ref: formRefs.delivery,
      component: <Delivery ref={formRefs.delivery} />,
    },
    {
      label: "Visuals",
      ref: useRef(null),
      component: <h1>Visuals</h1>,

    }
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [product, setProduct] = useState<Partial<productType>>()

  console.log("Product is", product)

  // * Handle the next step
  async function handleNextStep() {
    // Check if the current step is valid and go to the next step

    const currentRef = steps[currentStep].ref
    const data = await currentRef.current?.validate()

    if (data) {
      console.log("data is, ", data)

      setProduct((prev) => ({
        ...prev,
        ...data,
      }))

      setCurrentStep((prev) => prev + 1)
    }
  }

  async function handleSubmit() {
    if (product === undefined) {
      toast.error(
        "Seems like some data is missing, please check again before submitting."
      )
      return
    }

    const { data, error } = await createProduct(product as productType)

    if (error) {
      toast.error(error)
    }

    if (data) {
      console.log(data)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <main className="flex h-full w-full flex-col items-start justify-start p-8">
      {/* Form Header */}
      <header className="mb-2 flex h-8 w-full items-center justify-start">
        <h1 className="text-center text-base">
          Step {currentStep + 1} -{" "}
          <strong className="text-xl">{steps[currentStep].label}</strong>
        </h1>
      </header>

      <Separator />

      {/* Form Body */}
      <div className="mt-4 flex h-full w-full">
        {/* Here we change the form depending on the current step, maybe we can use a custom component for that */}
        {steps[currentStep].component}
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

        <Button
          onClick={async () => {
            if (currentStep + 1 === steps.length) {
              await handleSubmit()
            } else {
              await handleNextStep()
            }
          }}>
          {currentStep + 1 === steps.length ? "Create Product" : "Next Step"}{" "}
          {currentStep + 1 === steps.length ? <Check /> : <ChevronRight />}
        </Button>
      </footer>
    </main>
  )
}
