"use server"

import { createClient } from "@/lib/utils/supabase/server"

async function getCategories(): Promise<{
  data?: string[]
  error?: string
}> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("category").select("name")

  return {
    data: data?.map(category => category.name) || [],
    error: error?.message,
  }
}

export { getCategories }
