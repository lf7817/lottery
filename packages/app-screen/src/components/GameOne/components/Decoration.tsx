import { SpriteAnimator } from '@react-three/drei'
import { AssetPaths } from '@/components/GameOne/config.ts'
import MeshPlaneHeightFit from '@/components/Three/MeshPlaneHeightFit.tsx'
import MeshCircle from '@/components/Three/MeshCircle.tsx'

interface DecorationProps {
  visible: boolean
}

export default function Decoration(props: DecorationProps) {
  return (
    <group name="decoration" visible={props.visible}>
      <mesh position-z={-10}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#A60513" />
      </mesh>

      <MeshPlaneHeightFit
        position={[0, 0, -2]}
        height={53}
        textureUrl={AssetPaths.bg}
        color="#8A030E"
        opacity={0.44}
      />

      <group name="lantern">
        <SpriteAnimator
          scale={[12, 12, 12]}
          position={[-29.4, 6, 1]}
          startFrame={0}
          autoPlay={true}
          loop={true}
          alphaTest={0.01}
          textureImageURL={AssetPaths.lanternImage}
          textureDataURL={AssetPaths.lanternData}
        />

        <SpriteAnimator
          scale={[12, 12, 12]}
          position={[29.4, 6, 1]}
          startFrame={0}
          autoPlay={true}
          loop={true}
          alphaTest={0.01}
          textureImageURL={AssetPaths.lanternImage}
          textureDataURL={AssetPaths.lanternData}
        />
      </group>

      <group name="long">
        <SpriteAnimator
          scale={[12, 12, 12]}
          position={[30.2, -10, 1.5]}
          startFrame={0}
          autoPlay={true}
          loop={true}
          alphaTest={0.01}
          textureImageURL={AssetPaths.long1}
          textureDataURL={AssetPaths.longdata1}
        />
        <SpriteAnimator
          scale={[12, 12, 12]}
          position={[-29.5, -10, 1.5]}
          startFrame={0}
          autoPlay={true}
          loop={true}
          alphaTest={0.01}
          textureImageURL={AssetPaths.long2}
          textureDataURL={AssetPaths.longdata2}
        />
      </group>

      <group name="plum">
        <MeshPlaneHeightFit
          position={[-27.2, 16.5, 2]}
          height={12.5}
          textureUrl={AssetPaths.plum}
        />

        <MeshPlaneHeightFit
          position={[27.2, 16.5, 2]}
          scale={[-1, 1, 1]}
          height={12.5}
          textureUrl={AssetPaths.plum}
        />
      </group>

      <group name="papercut" position-y={-0.2}>
        <MeshCircle
          textureUrl={AssetPaths.papercut1}
          position={[0, 29, 0]}
          radius={15}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut2}
          position={[-16, 30.5, 0.1]}
          radius={14}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut2}
          position={[16, 30.5, 0.1]}
          radius={14}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut1}
          position={[-36, 26, 0.2]}
          radius={14.4}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut1}
          position={[36, 26, 0.2]}
          radius={14.4}
          spin={-0.001}
        />
      </group>

      <group name="xiangyun">
        <MeshPlaneHeightFit
          speed={0.0005}
          position={[0, -17, 1]}
          height={7}
          textureOffsetY={-0.001}
          textureUrl={AssetPaths.xiangyun1}
          repeat={2}
        />
        <MeshPlaneHeightFit
          speed={-0.0005}
          position={[0, -18.4, 1.6]}
          height={3.5}
          textureUrl={AssetPaths.xiangyun2}
          repeat={3}
        />
      </group>
    </group>
  )
}
