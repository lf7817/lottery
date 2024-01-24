import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Loader, Preload, Stats } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import Decoration from '@/pages/GameOne/components/Decoration.tsx'
import Greeting from '@/pages/GameOne/components/Greeting.tsx'
import { GameStatus } from '@/constants'
import { gameStoreState } from '@/store'

export default function GameOne() {
  const store = useSnapshot(gameStoreState)
  const [sceneReady, setSceneReady] = useState(false)

  return (
    <>
      <Canvas
        resize={{ offsetSize: true }}
        camera={{ position: [0, 0, 50], fov: 45, far: 1000, near: 0.1 }}
        onCreated={() => setTimeout(() => setSceneReady(true), 500)}
      >
        <Suspense fallback={null}>
          <group visible={sceneReady}>
            {store.status === GameStatus.GREETING && <Greeting />}
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
