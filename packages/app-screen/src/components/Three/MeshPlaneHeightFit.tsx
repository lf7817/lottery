import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface PlaneHeightFitProps {
  speed?: number
  textureOffsetY?: number
  height: number
  textureUrl: string
  repeat?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  color?: string
  opacity?: number
  name?: string
}

export default function MeshPlaneHeightFit(props: PlaneHeightFitProps) {
  const { repeat = 1 } = props
  const texture = useTexture(props.textureUrl)
  const aspectRatio = texture.image.width / texture.image.height
  const width = aspectRatio * props.height * repeat
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeat, 1)
  texture.offset.y = props.textureOffsetY || 0

  useFrame((_, delta) => {
    const targetDelta = 0.016
    const resultDelta = delta / targetDelta

    if (props.speed)
      texture.offset.x += resultDelta * 0.0004
  })

  return (
    <mesh name={props.name} position={props.position} rotation={props.rotation} scale={props.scale}>
      <planeGeometry args={[width, props.height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={props.opacity}
        color={props.color}
      />
    </mesh>
  )
}
