"use client"

import { RingOne } from "@/app/(auth)/_components/ring-one"
import { cn } from "@/lib/utils"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export const SceneOne = ({ className }: { className?: string }) => {
  return (
    <Canvas
      className={cn("", className)}
      camera={{ position: [0, 0, 5], fov: 60, scale: 10 }}>
      <ambientLight intensity={10} />
      <directionalLight position={[10, 10, 5]} intensity={20} />
      <Suspense fallback={null}>
        <RingOne />
      </Suspense>
    </Canvas>
  )
}
