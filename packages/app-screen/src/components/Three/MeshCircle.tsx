import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

interface MeshCircleProps {
  textureUrl: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  radius: number
  segments?: number
  spin?: number
}

export default function MeshCircle(props: MeshCircleProps) {
  const { segments = 32 } = props
  const ref = useRef<Mesh>(null)
  const texture = useTexture(props.textureUrl)

  useFrame((_, delta) => {
    const targetDelta = 0.016
    const resultDelta = delta / targetDelta

    if (props.spin && ref.current)
      // ref.current.rotation.z += props.spin
      ref.current.rotation.z += -resultDelta * props.spin
  })

  return (
    <mesh ref={ref} position={props.position} rotation={props.rotation}>
      <circleGeometry args={[props.radius, segments]} />
      <meshBasicMaterial map={texture} transparent color={props.color} />
    </mesh>
  )
}
