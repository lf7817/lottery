import * as stylex from '@stylexjs/stylex'
import { gameOneAction } from './store'
import styles from './styles.ts'
import Scene from './components/Scene.tsx'
import './preload.ts'

gameOneAction.initialStore()

export default function GameOne() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Scene />
    </div>
  )
}
