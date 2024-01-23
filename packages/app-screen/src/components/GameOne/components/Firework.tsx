import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group, Sprite } from 'three'
import { AssetPaths } from '@/components/GameOne/config.ts'

const width = 10
const height = 40
const count = 20

interface FireworkProps {
  position: [number, number, number]
}

export default function Firework(props: FireworkProps) {
  const texture = useTexture(AssetPaths.firework)
  const group = useRef<Group>(null)
  const points = useRef(generateRandomPoints({ width, height, count }))

  useFrame(() => {
    // @ts-expect-error
    const fireworks: Sprite[] = group.current?.children || []
    fireworks.forEach((firework, index) => {
      const orignalPoint = points.current[index]

      if (firework.scale.x < orignalPoint.scale.maxValue) {
        firework.scale.x += orignalPoint.scale.delta
        firework.scale.y += orignalPoint.scale.delta
        firework.scale.z += orignalPoint.scale.delta
      }
      else {
        firework.material.opacity -= 0.03

        if (firework.material.opacity < 0) {
          const newPoint = generateRandomPoint({ width, height })
          points.current[index] = {
            ...newPoint,
            id: orignalPoint.id,
          }
          firework.position.set(...newPoint.position)
          firework.scale.set(newPoint.scale.initialValue, newPoint.scale.initialValue, newPoint.scale.initialValue)
          firework.material.opacity = 1
        }
      }
    })
  })

  return (
    <group name="firework" ref={group} position={props.position}>
      {
        points.current.map(point => (
          <sprite key={point.id} position={point.position} scale={[point.scale.initialValue, point.scale.initialValue, point.scale.initialValue]}>
            <spriteMaterial map={texture} transparent />
          </sprite>
        ))
      }
    </group>
  )
}

interface GenerateRandomPointParams {
  width: number
  height: number
}

interface RandomPoint {
  id: string
  position: [number, number, number]
  scale: {
    initialValue: number
    maxValue: number
    delta: number
  }
}

function generateRandomPoint(params: GenerateRandomPointParams): Omit<RandomPoint, 'id'> {
  return {
    position: [
      (Math.random() - 0.5) * params.width,
      (Math.random() - 0.5) * params.height,
      0,
    ],
    scale: {
      initialValue: 0,
      maxValue: (1 - Math.random() * 0.5) * 3,
      delta: 0.04,
    },
  }
}

interface GenerateRandomPointsParams extends GenerateRandomPointParams {
  count: number
}

function generateRandomPoints(params: GenerateRandomPointsParams): RandomPoint[] {
  return Array(params.count).fill(null).map((_, index) => ({
    id: `${index}-${Math.random()}`,
    ...generateRandomPoint(params),
  }))
}
