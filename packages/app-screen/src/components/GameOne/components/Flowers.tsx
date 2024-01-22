import { useRef } from 'react'
import { Group, Sprite } from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { AssetPaths } from '@/components/GameOne/config.ts'

const width = 72
const height = 10
const count = 20
const opacityRange = [1, 3] as [number, number]

export default function Flowers() {
  const points = useRef(generatePoint(width, height, count, opacityRange))
  const texture = useTexture(AssetPaths.flower)
  const ref = useRef<Group>(null)

  useFrame(() => {
    // @ts-expect-error
    const sprites: Sprite[] = ref.current?.children || []
    sprites.forEach((sprite, index) => {
      const originPoint = points.current[index]
      if (!originPoint)
        return
      sprite.position.x += points.current[index].velocity[0]
      sprite.position.y += points.current[index].velocity[1]

      if (sprite.position.y >= originPoint.opacity.startAt)
        sprite.material.opacity += originPoint.opacity.delta

      if (sprite.material.opacity <= 0) {
        const newPoint = {
          id: originPoint.id,
          ...generateRandomPoint({ width, height, opacityRange }),
        }
        sprite.position.set(...newPoint.position)
        sprite.scale.set(...newPoint.scale)
        sprite.material.opacity = newPoint.opacity.value
        points.current[index] = newPoint
      }
    })
  })

  return (
    <group ref={ref} position={[0, -16, 1.2]}>
      {
        points.current.map(point => (
          <sprite key={point.id} name={point.id} position={point.position} scale={point.scale}>
            <spriteMaterial map={texture} color="#fabe00" />
          </sprite>
        ))
      }
    </group>
  )
}

function generatePoint(width: number, height: number, count: number, opacityRange: [number, number]) {
  return Array(count).fill(null).map((_, index) => ({
    id: `${width}_${height}_${index}`,
    ...generateRandomPoint({ width, height, opacityRange }),
  }))
}

interface GenerateRandomPointParams {
  width: number
  height: number
  /* 随机渐变区域 */
  opacityRange: [number, number]
}

interface RandomPoint {
  position: [number, number, number]
  velocity: [number, number, number]
  scale: [number, number, number]
  opacity: {
    value: number
    delta: number
    startAt: number
  }
}

function generateRandomPoint(params: GenerateRandomPointParams): RandomPoint {
  const { width, opacityRange, height } = params
  const scale = (Math.random() * 0.35 + 0.65) * 1.7
  return {
    position: [
      (Math.random() - 0.5) * width,
      (Math.random() - 0.5) * height,
      0,
    ],
    velocity: [
      (Math.random() - 0.5) * 0.05,
      Math.random() * 0.01 + 0.01,
      0,
    ],
    scale: [scale, scale, scale],
    opacity: {
      value: 1,
      delta: -0.01,
      startAt: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
    },
  }
}
