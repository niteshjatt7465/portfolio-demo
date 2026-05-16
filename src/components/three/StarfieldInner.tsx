import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export function StarfieldInner() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars radius={100} depth={60} count={2000} factor={2} fade speed={0.3} />
    </Canvas>
  )
}
