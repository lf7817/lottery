import * as stylex from '@stylexjs/stylex'
import { Outlet } from 'react-router-dom'
import { gameOneAction } from './store'
import styles from './styles.ts'
import './preload.ts'
import play from './assets/play.png'
import {useState} from "react";

gameOneAction.initialStore()

export default function GameOneLayout() {
  const [playAudio,setPlayAudio] = useState(false)
  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.btn(play,playAudio))} onClick={()=> {
        setPlayAudio(!playAudio)
        gameOneAction.playAudio(playAudio)
      }}/>
      <Outlet />
    </div>
  )
}
