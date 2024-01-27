import * as stylex from '@stylexjs/stylex'
import { useSnapshot } from 'valtio'
import { gameOneAction, gameOneDerive } from './store'
import styles from './styles.ts'
import Scene from './components/Scene.tsx'
import './preload.ts'

gameOneAction.initialStore()

export default function GameOne() {
  const { s } = useSnapshot(gameOneDerive)
  console.log('=====', s)
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Scene />
    </div>
  )
}
