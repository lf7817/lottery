import * as stylex from '@stylexjs/stylex'
import styles from './styles.ts'
import Scene from './components/Scene.tsx'
import './preload.ts'
import { gameOneAction } from '@/pages/GameOne/store'

gameOneAction.initialStore()

export default function GameOneLottery() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Scene />
    </div>
  )
}
