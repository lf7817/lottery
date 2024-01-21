import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Loader, Preload, SpriteAnimator } from '@react-three/drei'
import './preload'
import { AssetPaths } from '@/components/GameOne/config.ts'
import Decoration from '@/components/GameOne/components/Decoration.tsx'

export default function GameOne() {
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
            textureImageURL={AssetPaths.start}
            textureDataURL={AssetPaths.startdata}
          />
          <Decoration visible={visible} />
          <Preload all />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}
