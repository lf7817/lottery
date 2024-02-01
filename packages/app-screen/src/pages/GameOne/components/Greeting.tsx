import { Html, SpriteAnimator, useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import * as stylex from '@stylexjs/stylex'
import { gameOneAction } from '../store'
import { AssetPaths } from '@/pages/GameOne/config.ts'
import { commonStyles } from '@/styles/common.ts'
import { GameStatus } from '@/constants'

export default function Greeting() {
  const [opacity, setOpacity] = useState(false)
  const title = useRef<THREE.Mesh>(null)
  const [play, setPlay] = useState(false)
  const texture = useTexture(AssetPaths.greeting)
  const aspect = texture.image.width / texture.image.height
  const height = 20
  const width = height * aspect

  function onFrame(e: { currentFrame: number }) {
    if (e.currentFrame === 50) {
      setPlay(true)
    } else if (e.currentFrame === 30) {
      const position = title.current!.position
      gsap.fromTo(title.current!.position, {
        x: position.x,
        y: position.y,
        z: 100,
      }, {
        x: position.x,
        y: position.y,
        z: 0,
        duration: 3,
        ease: 'power1.inOut',
      })
    }
  }

  return (
    <group name="greeting">
      <SpriteAnimator
        scale={[60, 60, 60]}
        position={[0, 0, 10]}
        startFrame={0}
        autoPlay={true}
        loop={false}
        alphaTest={0.01}
        onFrame={onFrame}
        textureImageURL={AssetPaths.start}
        textureDataURL={AssetPaths.startdata}
      />

      <mesh ref={title} position={[0, 0, 100]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent map={texture} />
      </mesh>

      <SpriteAnimator
        scale={[60, 60, 60]}
        position={[0, 0, 10]}
        startFrame={0}
        autoPlay={false}
        loop={false}
        play={play}
        alphaTest={0.01}
        onEnd={() => setOpacity(true)}
        textureImageURL={AssetPaths.particle}
        textureDataURL={AssetPaths.particledata}
      />
      <Html name="html1" position={[1.19, -4, opacity ? 0 : 100]} transform>
        <div {...stylex.props(commonStyles.button(opacity))} onClick={() => gameOneAction.changeStatus(GameStatus.WAITING)}>点击开始</div>
      </Html>
    </group>
  )
}
