import * as stylex from '@stylexjs/stylex'
import styles from './styles'
import GameOne from '@/components/GameOne'

export default function Home() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <GameOne />
    </div>
  )
}
