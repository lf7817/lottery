import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Loader, Preload, SpriteAnimator } from '@react-three/drei'
import Decoration from './components/Decoration'
import './preload'
import { AssetPaths } from '@/components/GameOne/config.ts'

export default function GameOne() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Canvas resize={{ offsetSize: true }} camera={{ position: [0, 50, 0], fov: 45, far: 1000, near: 0.1 }}>
        {/* <color attach="background" args={['#A60513']} /> */}
        <Suspense fallback={null}>
          <SpriteAnimator
            scale={[71, 71, 71]}
            position={[0, 2, 0]}
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
