import { Html, SpriteAnimator, useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import * as stylex from '@stylexjs/stylex'
import { AssetPaths } from '@/pages/GameOne/config.ts'
import { gameStoreAction } from '@/store'

const styles = stylex.create({
  btn: (flag: boolean) => ({
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': 160,
    'height': 60,
    'marginLeft': -80,
    'color': 'yellow',
    'fontSize': 24,
    'fontWeight': 'bold',
    'background': 'rgba(74,222,215, 0.6)',
    'border': '2px solid rgb(74,222,215)',
    'cursor': 'pointer',
    'userSelect': 'none',
    'transition': 'opacity 0.5s ease-in-out',
    'transform': 'translateY(300px)',
    'opacity': flag ? 1 : 0,
    'borderRadius': 10,
    ':hover': {
      background: 'rgba(74,222,215, 0.8)',
    },
  }),
})

export default function Greeting() {
  const [animationState, setAnimationState] = useState(false)
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
        onEnd={() => setAnimationState(true)}
        textureImageURL={AssetPaths.particle}
        textureDataURL={AssetPaths.particledata}
      />
      <Html>
        <div {...stylex.props(styles.btn(animationState))} onClick={() => gameStoreAction.doSignIn()}>点击开始</div>
      </Html>
    </group>
  )
}
