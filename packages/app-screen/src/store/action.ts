import { subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import { GameStoreState, gameStoreState } from './state'
import { GameStatus } from '@/constants'

export const cacheToken = 'GAME_STORE_STATE'

// actions
export const gameStoreAction = {
  /**
   * 初始化 state
   */
  initialState() {
    // 启用开发者工具
    devtools(gameStoreState, { name: 'gameOne', enabled: true })
    const cacheState: GameStoreState | undefined = JSON.parse(
      localStorage.getItem(cacheToken)!,
    )

    if (cacheState) {
      Object.keys(cacheState).forEach((key) => {
        // @ts-expect-error
        gameStoreState[key] = cacheState[key]
      })
    }

    // 订阅 state 做持久化
    subscribe(gameStoreState, () => {
      localStorage.setItem(cacheToken, JSON.stringify(gameStoreState))
    })
  },
  /**
   * 签到
   */
  doSignIn() {
    this.changeStatus(GameStatus.SIGN_IN)
  },
  changeStatus(s: GameStatus) {
    gameStoreState.status = s
  },
  reset() {
    gameStoreState.status = GameStatus.GREETING
    gameStoreState.awards = []
    gameStoreState.people = []
    localStorage.removeItem(cacheToken)
  },
}
