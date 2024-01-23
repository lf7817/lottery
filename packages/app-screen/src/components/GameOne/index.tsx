import './preload'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Loader, Preload, SpriteAnimator } from '@react-three/drei'
import useMitt from '@lottery/shared/hooks/useMitt'
import Decoration from '@/components/GameOne/components/Decoration.tsx'
import { AssetPaths } from '@/components/GameOne/config.ts'
import Greeting from '@/components/GameOne/components/Greeting.tsx'
import { EventMap } from '@/types/event.ts'

export default function GameOne() {
  const mitt = useMitt<EventMap>()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Canvas resize={{ offsetSize: true }} camera={{ position: [0, 0, 50], fov: 45, far: 1000, near: 0.1 }}>
        <Suspense fallback={null}>
          <SpriteAnimator
            scale={[60, 60, 60]}
            position={[0, 0, 10]}
            startFrame={0}
            autoPlay={true}
            loop={false}
            alphaTest={0.01}
            onStart={() => setVisible(true)}
            onFrame={(e: { currentFrame: number }) => mitt.emit('opening:onFrame', e?.currentFrame || 0)}
            textureImageURL={AssetPaths.start}
            textureDataURL={AssetPaths.startdata}
          />

          <group visible={visible}>
            <Decoration />
            <Greeting />
          </group>

          <Preload all />
        </Suspense>
        {/* <Stats /> */}
      </Canvas>
      <Loader />
    </>
  )
}
