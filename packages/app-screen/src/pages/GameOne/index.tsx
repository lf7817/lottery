import * as stylex from '@stylexjs/stylex'
import { Outlet } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { gameOneAction, gameOneState } from './store'
import styles from './styles.ts'
import './preload.ts'
import play from './assets/play.png'

gameOneAction.initialStore()

export default function GameOneLayout() {
  const { audio } = useSnapshot(gameOneState)

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div
        {...stylex.props(styles.btn(play, audio.state))}
        onClick={() => {
          gameOneAction.playAudio(!gameOneState.audio.state)
        }}
      />
      <Outlet />
    </div>
  )
}
