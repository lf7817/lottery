import { proxy, subscribe } from 'valtio'
import { GameStatus } from '@/constants'

interface GameStoreState {
  status: GameStatus
}

const cacheToken = 'GAME_STORE_STATE'
const cacheState: GameStoreState | undefined = JSON.parse(localStorage.getItem(cacheToken)!)
const defaultState: GameStoreState = {
  status: GameStatus.GREETING,
}

export const gameStoreState: GameStoreState = proxy<GameStoreState>(cacheState || defaultState)

export const gameStoreAction = {
  doSignIn() {
    gameStoreState.status = GameStatus.SIGN_IN
  },
  reset() {
    gameStoreState.status = GameStatus.GREETING
  },
}

subscribe(gameStoreState, () => {
  localStorage.setItem(cacheToken, JSON.stringify(gameStoreState))
})
