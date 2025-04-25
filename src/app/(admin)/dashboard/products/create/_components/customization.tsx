import { FormField, FormItem } from "@/components/ui/form"
import {
  productCustomizationSchema,
  productCustomizationType,
} from "@/lib/schema/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useImperativeHandle } from "react"
import { Form, useForm } from "react-hook-form"

export type CustomizationRef = {
  validate: () => Promise<productCustomizationType | undefined>
}

export const Customization = forwardRef<CustomizationRef>(({}, ref) => {
  const form = useForm<productCustomizationType>({
    resolver: zodResolver(productCustomizationSchema),
    defaultValues: {
      colors: [],
      sizes: [],
      customText: {
        maxCharacters: 100,
      },
    },
  })

  useImperativeHandle(ref, () => ({
    async validate() {
      const isValid = await form.trigger()
      return isValid ? form.getValues() : undefined
    },
  }))

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => <FormItem></FormItem>}
        />
      </form>
    </Form>
  )
})

Customization.displayName = "Customization"
