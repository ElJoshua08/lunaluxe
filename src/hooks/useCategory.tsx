import { useEffect, useState } from "react"
import { getCategories } from "@/services/category.service"

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await getCategories()
      if (error) {
        console.error("Error fetching categories:", error)
      } else if (data) {
        setCategories(data)
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}
