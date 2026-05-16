import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import type { Mesh } from 'three'

export function HeroOrb() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]} scale={1.4}>
      <MeshDistortMaterial
        color="#22d3ee"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#0e7490"
        emissiveIntensity={0.4}
      />
    </Sphere>
  )
}
