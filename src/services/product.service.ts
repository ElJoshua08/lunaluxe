"use server"

import {
  productBasicsType,
  productCustomizationType,
} from "@/lib/schema/product";
import { createServerClient } from "@/lib/utils/supabase/server";

export async function createProduct(
  product: productBasicsType & productCustomizationType
): Promise<{ data?: productBasicsType & productCustomizationType; error?: string }> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("product")
    .insert([product])
    .select("*")

  return {
    data: data?.[0],
    error: error?.message,
  }
}
