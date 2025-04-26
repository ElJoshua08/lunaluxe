import { z } from "zod"

export const imageSchema = z.object({
  name: z.string().nonempty("A name is required"),
  data: z.string().nonempty("Data is missing"),
  type: z.string().nonempty("Type is missing"),
})

export const modelSchema = z.object({
  name: z.string().nonempty("A name is required"),
  type: z.string().nonempty("Type is missing"),
  data: z.string().nonempty("Data is missing"),
})

export const colorSchema = z.object({
  name: z.string().nonempty("A name is required"),
  // * Value should always be a hex color code
  value: z.string().nonempty("A value is required"),

  // * Image is recommended but not required
  image: imageSchema.optional(),
})

export const sizeSchema = z.object({
  // * The text to be displayed
  name: z.string().nonempty("A name is required"),

  // * The value of the size
  value: z.string().nonempty("A value is required"),
})
