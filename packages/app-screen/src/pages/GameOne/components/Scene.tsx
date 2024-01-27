import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Loader, OrbitControls, Preload, Stats } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { gameOneState } from '../store'
import PhotoWall from './PhotoWall'
import Decoration from './Decoration.tsx'
import Greeting from './Greeting.tsx'
import { GameStatus } from '@/constants'

export default function GameOne() {
  const store = useSnapshot(gameOneState)
  const [sceneReady, setSceneReady] = useState(false)

  return (
    <>
      <Canvas
        resize={{ offsetSize: true }}
        camera={{ position: [0, 0, 50], fov: 45, far: 100000, near: 0.1 }}
        onCreated={() => setTimeout(() => setSceneReady(true), 600)}
      >
        <OrbitControls />
        <Suspense fallback={null}>
          <group visible={sceneReady}>
            {store.status === GameStatus.GREETING ? <Greeting /> : <PhotoWall type="table" />}
            <Decoration />
          </group>
          <Preload all />
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
    </>
  )
}
