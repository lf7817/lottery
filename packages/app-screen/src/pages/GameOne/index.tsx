import * as stylex from '@stylexjs/stylex'
import { Outlet } from 'react-router-dom'
import { gameOneAction } from './store'
import styles from './styles.ts'
import './preload.ts'

gameOneAction.initialStore()

export default function GameOneLayout() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Outlet />
    </div>
  )
}
