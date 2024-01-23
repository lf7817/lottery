import { proxy, subscribe } from 'valtio'
import { GameState } from '@/constants'

interface GameOneState {
  state: GameState
}

const cacheState: GameOneState | undefined = JSON.parse(localStorage.getItem('gameOneStore')!)
const initState: GameOneState = cacheState || {
  state: GameState.GREETING,
}

const gameOneState: GameOneState = proxy<GameOneState>(initState)

subscribe(gameOneState, () => {
  localStorage.setItem('gameOneStore', JSON.stringify(gameOneState))
})

export default gameOneState
