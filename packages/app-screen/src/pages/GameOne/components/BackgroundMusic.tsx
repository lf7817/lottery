import { useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { Audio, AudioListener, AudioLoader, Group } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import * as stylex from '@stylexjs/stylex'
import img from '../assets/play.png'
import { AssetPaths } from '@/pages/GameOne/config.ts'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'

const styles = stylex.create({
  play: () => ({
    width: 50,
    height: 50,
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    cursor: 'pointer',
  }),
})

export default function BackgroundMusic() {
  const { audio: { enabled, index, volume } } = useSnapshot(gameOneState)
  const [listener] = useState(() => new AudioListener())
  const bufferOpen = useLoader(AudioLoader, AssetPaths.audioOpen)
  const bufferLottery = useLoader(AudioLoader, AssetPaths.audioLottery)
  const bufferAudioAward = useLoader(AudioLoader, AssetPaths.audioAward)
  const audioOpen = useRef<Audio>(null)
  const audioLottery = useRef<Audio>(null)
  const audioAward = useRef<Audio>(null)
  const musics = [audioOpen, audioLottery, audioAward]
  const group = useRef<Group>(null)

  useEffect(() => {
    if (enabled) {
      musics.forEach((music, i) => {
        if (i === index)
          music.current?.play()
        else
          music.current?.stop()
      })
    } else {
      musics.forEach(music => music.current?.isPlaying && music.current.pause())
    }
  }, [index, enabled])

  useEffect(() => {
    musics[index].current?.setVolume(volume)
  }, [volume, index])

  useEffect(() => {
    if (bufferLottery && audioLottery.current) {
      audioLottery.current.setBuffer(bufferLottery)
      audioLottery.current.autoplay = false
      audioLottery.current.setLoop(true)
      audioLottery.current.setVolume(1)
    }
  }, [bufferLottery])

  useEffect(() => {
    if (bufferAudioAward && audioAward.current) {
      audioAward.current.setBuffer(bufferAudioAward)
      audioAward.current.autoplay = false
      audioAward.current.setLoop(true)
      audioAward.current.setVolume(1)
    }
  }, [bufferAudioAward])

  useEffect(() => {
    if (bufferOpen && audioOpen.current) {
      audioOpen.current.setBuffer(bufferOpen)
      audioOpen.current.autoplay = false
      audioOpen.current.setLoop(true)
      audioOpen.current.setVolume(1)
    }
  }, [bufferOpen])

  useFrame((_, delta) => {
    const targetDelta = 0.0166667
    const step = delta / targetDelta

    if (enabled && group.current)
      group.current.rotation.z -= 0.01 * step
  })

  return (
    <group name="audio">
      <group>
        {/* @ts-expect-error  */}
        <audio ref={audioOpen} args={[listener]} />
        {/* @ts-expect-error  */}
        <audio ref={audioLottery} args={[listener]} />
        {/* @ts-expect-error  */}
        <audio ref={audioAward} args={[listener]} />
      </group>

      <group ref={group} position={[11.5, -6.2, 33]}>
        <Html transform>
          <div {...stylex.props(styles.play())} onClick={() => gameOneAction.toggleAudio()} />
        </Html>
      </group>
    </group>
  )
}
