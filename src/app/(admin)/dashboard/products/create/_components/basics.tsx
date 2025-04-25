import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { productBasicsSchema, productBasicsType } from "@/lib/schema/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export type BasicsRef = {
  validate: () => Promise<productBasicsType | undefined>
}

export const Basics = forwardRef<BasicsRef, { categories: string[] }>(
  ({ categories }, ref) => {
    const form = useForm<z.infer<typeof productBasicsSchema>>({
      resolver: zodResolver(productBasicsSchema),
      defaultValues: {
        name: "",
        description: "",
        category: "",
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
          <div className="flex w-full flex-col items-start justify-start gap-y-4 md:h-full md:w-1/2">
            <FormField
              control={form.control}
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
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* Here in the price i need to make a custom price component to make it easier to use. */}
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Ex. 100€"
                      type="number"
                      min="1"
                      {...field}
                      value={field.value || ""}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    The price you want to give to your product, please use dots
                    for the decimal point. (50.99€)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
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

          <div className="flex h-full w-full flex-col items-start justify-start md:w-1/2">
            <FormField
              control={form.control}
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
                  <FormDescription>
                    The description you want to give to your product.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    )
  }
)

Basics.displayName = "Basics"
