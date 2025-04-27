import { colorSchema, imageSchema, modelSchema } from "@/lib/schema/util"
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

export const productVisualSchema = z.object({
  images: z.array(imageSchema).nonempty("This field is required"),

  // * The 3D model is recommended but not required
  model: modelSchema.optional(),
})

export type productVisualType = z.infer<typeof productVisualSchema>

export const productCustomizationSchema = z.object({
  colors: z.array(colorSchema).min(1, "At least one color is required"),
  sizes: z.array(z.string()).nonempty("This field is required"),
  customText: z.object({
    maxCharacters: z.number().min(1).max(1000),
  }),
})

export type productCustomizationType = z.infer<
  typeof productCustomizationSchema
>

export const productDeliverySchema = z.object({
  shippingTime: z.string().nonempty("This field is required"),
  productionTime: z.string().nonempty("This field is required"),
  deliveryTime: z.string().nonempty("This field is required"),
  deliveryCost: z.number().min(0.01, "Delivery cost must be at least 0.01"),
  returnPolicy: z.string().nonempty("This field is required"),
  returnTime: z.string().nonempty("This field is required"),
})

export type productDeliveryType = z.infer<typeof productDeliverySchema>

export type productType = productBasicsType &
  productCustomizationType &
  productDeliveryType
