import { SpriteAnimator } from '@react-three/drei'
import { AssetPaths } from '@/components/GameOne/config.ts'
import MeshPlaneHeightFit from '@/components/Three/MeshPlaneHeightFit.tsx'
import MeshCircle from '@/components/Three/MeshCircle.tsx'

export default function Decoration() {
  return (
    <group name="decoration">
      <SpriteAnimator
        scale={[71, 71, 71]}
        position={[0, 2, 0]}
        startFrame={0}
        autoPlay={true}
        loop={false}
        alphaTest={0.01}
        textureImageURL={AssetPaths.start}
        textureDataURL={AssetPaths.startdata}
      />

      <MeshPlaneHeightFit
        position={[0, -1, 0]}
        height={53}
        textureUrl={AssetPaths.bg}
        color="#8A030E"
        opacity={0.44}
      />

      <group name="lantern">
        <SpriteAnimator
          scale={[14, 14, 14]}
          position={[-29.4, 0, -4.6]}
          startFrame={0}
          autoPlay={true}
          loop={true}
          alphaTest={0.01}
          textureImageURL={AssetPaths.lanternImage}
          textureDataURL={AssetPaths.lanternData}
        />

        <SpriteAnimator
          scale={[14, 14, 14]}
          position={[29.4, 0, -4.6]}
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
          position={[31, 0.11, 12.2]}
          startFrame={0}
          autoPlay={true}
          loop={true}
          alphaTest={0.01}
          textureImageURL={AssetPaths.long1}
          textureDataURL={AssetPaths.longdata1}
        />
        <SpriteAnimator
          scale={[12, 12, 12]}
          position={[-30.2, 0.11, 12.2]}
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
          position={[-27, 0.1, -17]}
          height={15}
          textureUrl={AssetPaths.plum}
        />

        <MeshPlaneHeightFit
          position={[27, 0.1, -17]}
          height={15}
          textureUrl={AssetPaths.plum}
          scale={[-1, 1, 1]}
        />
      </group>

      <group name="papercut" position-y={-0.2}>
        <MeshCircle
          textureUrl={AssetPaths.papercut1}
          position={[0, 0, -28]}
          radius={15}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut2}
          position={[-16, 0.05, -30]}
          radius={14}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut2}
          position={[16, 0.05, -30]}
          radius={14}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut1}
          position={[-36, 0.11, -27]}
          radius={16}
          spin={-0.001}
        />

        <MeshCircle
          textureUrl={AssetPaths.papercut1}
          position={[36, 0.11, -27]}
          radius={16}
          spin={-0.001}
        />
      </group>

      <group name="xiangyun">
        <MeshPlaneHeightFit
          offsetX={0.0005}
          position={[0, 0.1, 17.3]}
          height={7.5}
          textureUrl={AssetPaths.xiangyun1}
          repeat={2}
        />
        <MeshPlaneHeightFit
          offsetX={-0.0005}
          position={[0, 0.12, 19.1]}
          height={3.2}
          textureUrl={AssetPaths.xiangyun2}
          repeat={3}
        />
      </group>
    </group>
  )
}
