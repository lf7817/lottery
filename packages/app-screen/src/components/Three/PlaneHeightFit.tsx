import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface PlaneHeightFitProps {
  offsetX?: number
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

export default function PlaneHeightFit(props: PlaneHeightFitProps) {
  const { repeat = 1, rotation = [-Math.PI / 2, 0, 0] } = props
  const texture = useTexture(props.textureUrl)
  const aspectRatio = texture.image.width / texture.image.height
  const width = aspectRatio * props.height * repeat
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeat, 1)

  useFrame(() => {
    if (props.offsetX)
      texture.offset.x += props.offsetX
  })

  return (
    <mesh name={props.name} position={props.position} rotation={rotation} scale={props.scale}>
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
