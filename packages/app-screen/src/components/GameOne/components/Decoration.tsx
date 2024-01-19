import { SpriteAnimator } from '@react-three/drei'
import { AssetPaths } from '@/components/GameOne/config.ts'
import PaperCut from '@/components/GameOne/components/PaperCut.tsx'
import PlaneHeightFit from '@/components/Three/PlaneHeightFit.tsx'

export default function Decoration() {
  return (
    <group name="decoration">
      <PlaneHeightFit
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

      <group name="plum">
        <PlaneHeightFit
          position={[-27, 0.1, -17]}
          height={15}
          textureUrl={AssetPaths.plum}
        />

        <PlaneHeightFit
          position={[27, 0.1, -17]}
          height={15}
          textureUrl={AssetPaths.plum}
          scale={[-1, 1, 1]}
        />
      </group>

      <PaperCut />

      <group name="xiangyun">
        <PlaneHeightFit
          offsetX={0.001}
          position={[0, 0.1, 17.3]}
          height={7.5}
          textureUrl={AssetPaths.xiangyun1}
          repeat={2}
        />
        <PlaneHeightFit
          offsetX={-0.001}
          position={[0, 0.11, 19.1]}
          height={3.2}
          textureUrl={AssetPaths.xiangyun2}
          repeat={3}
        />
      </group>
    </group>
  )
}
