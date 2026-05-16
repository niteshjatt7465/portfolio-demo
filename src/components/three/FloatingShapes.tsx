import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box, Octahedron, Torus } from '@react-three/drei'
import type { Group } from 'three'

export function FloatingShapes() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Box position={[-3, 1, -2]} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#a78bfa" wireframe />
        </Box>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <Octahedron position={[3.5, -0.5, -1]} args={[0.6]}>
          <meshStandardMaterial color="#22d3ee" wireframe />
        </Octahedron>
      </Float>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Torus position={[2, 2, -3]} args={[0.4, 0.1, 16, 32]}>
          <meshStandardMaterial color="#e879f9" emissive="#e879f9" emissiveIntensity={0.3} />
        </Torus>
      </Float>
    </group>
  )
}
