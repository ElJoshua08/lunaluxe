import { productDeliveryType } from "@/lib/schema/product"
import { forwardRef, useImperativeHandle } from "react"

export type DeliveryRef = {
  validate: () => Promise<productDeliveryType | undefined>
}

export const Delivery = forwardRef<DeliveryRef>(({}, ref) => {
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
      <h1>Delivery form needs: shipping time, production time</h1>
    </div>
  )
})

Delivery.displayName = "Delivery"
