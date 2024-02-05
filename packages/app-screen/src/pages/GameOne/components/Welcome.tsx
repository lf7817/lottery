import * as stylex from '@stylexjs/stylex'
import { Html } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { useLayoutEffect, useRef } from 'react'
import { Group } from 'three'
import { gsap } from 'gsap'
import entry from '../assets/video-entry.png'
import { AssetPaths } from '@/pages/GameOne/config.ts'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'

const styles = stylex.create({
  wrapper: {
    position: 'relative',
    width: 1280,
    height: 720,
  },
  entry: () => ({
    position: 'absolute',
    top: 500,
    left: 200,
    width: 170,
    height: 35,
    backgroundImage: `url(${entry})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    zIndex: 10,
  }),
})

export default function Welcome() {
  const group = useRef<Group>(null)
  const { welcome } = useSnapshot(gameOneState)
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    if (group.current) {
      if (isFirst.current) {
        isFirst.current = false
        group.current.position.y = welcome ? 0 : 20
      } else {
        gsap.to(group.current.position, {
          duration: 1,
          y: welcome ? 0 : 20,
          ease: welcome ? 'bounce.out' : 'power4.in',
        })
      }
    }
  }, [welcome])

  return (
    <group ref={group} position={[0, 0, 28.3]}>
      <Html transform>
        <div {...stylex.props(styles.wrapper)}>
          <video
            src={AssetPaths.greetingVideo}
            style={{ width: '100%', height: '100%' }}
            controls={false}
            loop
            autoPlay
            muted={true}
            disablePictureInPicture={false}
          />
          <div {...stylex.props(styles.entry())} onClick={() => gameOneAction.showWelcome(false)} />
        </div>
      </Html>
    </group>
  )
}
