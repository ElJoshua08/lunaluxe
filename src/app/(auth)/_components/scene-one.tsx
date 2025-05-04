"use client"

import { RingOne } from "@/app/(auth)/_components/ring-one"
import { cn } from "@/lib/utils"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export const SceneOne = ({ className }: { className?: string }) => {
  return (
    <Canvas
      className={cn("", className)}
      style={
        {
          height: "600px",
        }
      }
      camera={{ position: [0, 0, 3], fov: 60, scale: 10 }}>
      <ambientLight intensity={25} />
      <directionalLight position={[10, 10, 5]} intensity={50} />
      <Suspense fallback={null}>
        <RingOne />
      </Suspense>
    </Canvas>
  )
}
