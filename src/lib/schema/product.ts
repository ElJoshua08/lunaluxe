import { z } from "zod"

export const productBasicsSchema = z.object({
  name: z
    .string()
    .nonempty("This field is required")
    .min(4, "Name must be at least 4 characters"),
  description: z
    .string()
    .nonempty("This field is required")
    .min(4, "Description must be at least 4 characters"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
  category: z
    .string()
    .nonempty("This field is required")
    .min(4, "Category must be at least 4 characters"),
})

export type productBasicsType = z.infer<typeof productBasicsSchema>

export const productCustomizationSchema = z.object({
  colors: z.array(z.string()).nonempty("This field is required"),
  sizes: z.array(z.string()).nonempty("This field is required"),
  customText: z.object({
    maxCharacters: z.number().min(1).max(1000),
  })
})

export type productCustomizationType = z.infer<typeof productCustomizationSchema>