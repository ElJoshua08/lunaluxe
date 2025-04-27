import { useGLTF } from "@react-three/drei"

useGLTF.preload("/models/ring-1.glb")

export const RingOne = () => {
  const { nodes, materials, scene } = useGLTF("/models/ring-1.glb")

  return (
    <group scale={[1, 1, 1]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  )
}
