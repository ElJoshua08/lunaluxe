import { productVisualType } from "@/lib/schema/product"
import { forwardRef, useImperativeHandle } from "react"

export type VisualsRef = {
  validate: () => Promise<productVisualType | undefined>
}

export const Visuals = forwardRef<VisualsRef>(({}, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      async validate() {
        return undefined
      },
    }),
    []
  )

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-x-8 gap-y-4 md:flex-row">
      <h1>Visuals form needs: images, videos</h1>
    </div>
  )
})

Visuals.displayName = "Visuals"
