import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { HeroOrb } from './HeroOrb'
import { FloatingShapes } from './FloatingShapes'

interface HeroSceneProps {
  mouse: { x: number; y: number }
}

function SceneContent({ mouse }: HeroSceneProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#a78bfa" />
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
      <group position={[mouse.x * 0.3, mouse.y * 0.3, 0]}>
        <HeroOrb />
        <FloatingShapes />
      </group>
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function HeroScene({ mouse }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
