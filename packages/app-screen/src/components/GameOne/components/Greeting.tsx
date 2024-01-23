import { SpriteAnimator, useTexture } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import useMitt from '@lottery/shared/hooks/useMitt'
import { gsap } from 'gsap'
import { AssetPaths } from '@/components/GameOne/config.ts'
import { EventMap } from '@/types/event.ts'

export default function Greeting() {
  const mitt = useMitt<EventMap>()
  const title = useRef<THREE.Mesh>(null)
  const [play, setPlay] = useState(false)
  const texture = useTexture(AssetPaths.greeting)
  const aspect = texture.image.width / texture.image.height
  const height = 20
  const width = height * aspect

  useEffect(() => {
    mitt.on('opening:onFrame', (currentFrame: number) => {
      if (currentFrame === 50) {
        setPlay(true)
      } else if (currentFrame === 30) {
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
    })
  }, [])

  return (
    <group name="greeting">
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
        textureImageURL={AssetPaths.particle}
        textureDataURL={AssetPaths.particledata}
      />
    </group>
  )
}
