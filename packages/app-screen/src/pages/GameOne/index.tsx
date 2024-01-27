import * as stylex from '@stylexjs/stylex'
import { useSnapshot } from 'valtio'
import styles from './styles.ts'
import GameOne from './components/Scene.tsx'
import { gameStoreDerive } from '@/store'
import './preload.ts'

export default function Home() {
  const { s } = useSnapshot(gameStoreDerive)
  console.log('=====', s)
  return (
    <div {...stylex.props(styles.wrapper)}>
      <GameOne />
    </div>
  )
}
