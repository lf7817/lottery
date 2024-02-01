import { subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import { GameOneStoreState, gameOneState } from './state.ts'
import { GameStatus } from '@/constants'
import { Person } from '@/types'
import { gameOneDerive } from '@/pages/GameOne/store/derive.ts'

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
  startDraw() {
    gameOneState.status = GameStatus.DRAWING
  },
  stopDraw() {
    gameOneState.status = GameStatus.OPENING
  },
  getRandomPeople() {
    const currentAward = gameOneDerive.currentAward
    if (currentAward.remain === 0)
      return

    const arr = gameOneState.people.filter(person => !person.awardId).map(person => ({ ...person }))
    if (arr.length === 0)
      return

    const len = Math.min(currentAward.remain, currentAward.count)

    const newArr: Person[] = [] // 组成的新数组初始化
    for (let i = 0; i < len; i++) {
      const index = Math.floor(Math.random() * arr.length)
      const item = arr[index]
      newArr.push(item)
      arr.splice(index, 1)
    }

    newArr.forEach((item) => {
      const p = gameOneState.people.find(person => person.openid === item?.openid)

      if (p) {
        p.awardId = currentAward.awardId
        p.prizeId = currentAward.prizeId
      }
    })

    gameOneState.awards.find(item => item.id === currentAward.awardId)!.prize.find(item => item.id === currentAward.prizeId)!.remain! -= len

    return newArr.reverse()
  },
}
