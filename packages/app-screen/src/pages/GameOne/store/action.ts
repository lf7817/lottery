import { subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import { GameOneStoreState, gameOneState } from './state.ts'
import { GameStatus } from '@/constants'
import { Person } from '@/types'

export const cacheToken = 'GAME_STORE_STATE'

// actions
export const gameOneAction = {
  /**
   * 初始化 state
   */
  initialStore() {
    // 启用开发者工具
    devtools(gameOneState, { name: 'gameOne', enabled: true })
    const cacheState: GameOneStoreState | undefined = JSON.parse(
      localStorage.getItem(cacheToken)!,
    )

    if (cacheState) {
      Object.keys(cacheState).forEach((key) => {
        // @ts-expect-error
        gameOneState[key] = cacheState[key]
      })
    }

    // 订阅 state 做持久化
    subscribe(gameOneState, () => {
      localStorage.setItem(cacheToken, JSON.stringify(gameOneState))
    })
  },
  reset() {
    gameOneState.status = GameStatus.GREETING
    gameOneState.awards = []
    gameOneState.people = []
    localStorage.removeItem(cacheToken)
  },
  changeStatus(s: GameStatus) {
    gameOneState.status = s
  },
  generateQRcode(isNew?: boolean) {
    if (isNew || !gameOneState.qrcode)
      gameOneState.qrcode = new Date().getTime().toString()
  },
  updatePeople(people: Person[]) {
    gameOneState.people = people
  },
}
