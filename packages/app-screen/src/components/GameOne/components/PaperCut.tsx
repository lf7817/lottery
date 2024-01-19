import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { AssetPaths } from '@/components/GameOne/config.ts'

export default function PaperCut() {
  const ref1 = useRef<Mesh>(null)
  const ref2 = useRef<Mesh>(null)
  const ref3 = useRef<Mesh>(null)
  const ref4 = useRef<Mesh>(null)
  const ref5 = useRef<Mesh>(null)
  const texture1 = useTexture(AssetPaths.papercut1)
  const texture2 = useTexture(AssetPaths.papercut2)

  useFrame(() => {
    if (!!ref1.current && !!ref2.current && !!ref3.current && !!ref4.current && !!ref5.current) {
      ref1.current.rotation.z -= 0.003
      ref2.current.rotation.z -= 0.003
      ref3.current.rotation.z -= 0.003
      ref4.current.rotation.z -= 0.003
      ref5.current.rotation.z -= 0.003
    }
  })

  return (
    <group name="papercut" position-y={-0.2}>
      <mesh ref={ref1} position={[0, 0, -28]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[15, 32]} />
        <meshBasicMaterial map={texture1} transparent />
      </mesh>

      <mesh ref={ref2} position={[-16, 0.05, -30]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[14, 32]} />
        <meshBasicMaterial map={texture2} transparent />
      </mesh>

      <mesh ref={ref3} position={[16, 0.05, -30]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[14, 32]} />
        <meshBasicMaterial map={texture2} transparent />
      </mesh>

      <mesh ref={ref4} position={[-36, 0.11, -27]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[16, 32]} />
        <meshBasicMaterial map={texture1} transparent />
      </mesh>

      <mesh ref={ref5} position={[36, 0.11, -27]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[16, 32]} />
        <meshBasicMaterial map={texture1} transparent />
      </mesh>
    </group>
  )
}
