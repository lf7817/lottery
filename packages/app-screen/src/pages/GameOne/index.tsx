import * as stylex from '@stylexjs/stylex'
import styles from './styles.ts'
import GameOne from './components/Scene.tsx'
import './preload.ts'

export default function Home() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <GameOne />
    </div>
  )
}
