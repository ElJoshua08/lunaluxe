"use client"

import { useEnvironment, useGLTF } from "@react-three/drei"

useGLTF.preload("/models/ring-1.glb")

export const RingOne = () => {
  const { nodes, materials } = useGLTF("/models/ring-1.glb")

  const env = useEnvironment({ preset: "studio" })

  if (!nodes || !materials) {
    return null
  }
  
  return (
    <group>
      <mesh
        geometry={nodes.ring.geometry}
        material={materials["Rose Gold"]}
        material-envMap={env}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
    </group>
  )
}
