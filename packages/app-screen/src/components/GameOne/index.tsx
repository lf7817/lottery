import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import Decoration from './components/Decoration'
import './preload'

export default function GameOne() {
  return (
    <Canvas resize={{ offsetSize: true }} camera={{ position: [0, 50, 0], fov: 45, far: 1000, near: 0.1 }}>
      {/* <ambientLight color="#fff" intensity={2} /> */}
      {/* <GridHelper /> */}

      <color attach="background" args={['#A60513']} />

      <Suspense fallback={null}>
        <Decoration />
      </Suspense>

      <Stats />

    </Canvas>
  )
}
