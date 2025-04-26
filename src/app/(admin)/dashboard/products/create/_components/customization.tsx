import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  productCustomizationSchema,
  productCustomizationType,
} from "@/lib/schema/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"

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
      <form className="flex h-full w-full flex-col items-start justify-start gap-x-8 gap-y-4 md:flex-row">
        <h1>Customization form needs: colors, sizes, custom text</h1>

        <FormField
          control={form.control}
          name="colors"
          render={({ }) => (
            <FormItem className="w-full">
              <FormLabel>Colors</FormLabel>
              <FormControl></FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

Customization.displayName = "Customization"
