import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Loader, OrbitControls, Preload, Stats } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import useRouterParams from '@lottery/shared/hooks/useRouterParams.ts'
import { gameOneState } from '../store'
import Decoration from './Decoration.tsx'
import Greeting from './Greeting.tsx'
import { GameStatus } from '@/constants'
import PhotoWall from '@/pages/GameOne/components/PhotoWall'
import Winners from '@/pages/GameOne/components/Winners'

export default function GameOne() {
  const { debug } = useRouterParams()
  const store = useSnapshot(gameOneState)
  const [sceneReady, setSceneReady] = useState(false)

  function render() {
    if (store.status === GameStatus.GREETING)
      return <Greeting />
    else if (store.status > GameStatus.GREETING && store.status < GameStatus.AWARD)
      return <PhotoWall />
    else if (store.status === GameStatus.AWARD)
      return <Winners />
  }

  return (
    <>
      <Canvas
        resize={{ offsetSize: true }}
        camera={{ position: [0, 0, 50], fov: 45, far: 100000, near: 0.1 }}
        onCreated={() => setTimeout(() => setSceneReady(true), 600)}
      >
        {
          debug === '1' && (
            <>
              <OrbitControls />
              <Stats />
            </>
          )
        }

        <Suspense fallback={null}>
          <group visible={sceneReady}>
            <Decoration />
            {render()}
          </group>
          <Preload all />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}
