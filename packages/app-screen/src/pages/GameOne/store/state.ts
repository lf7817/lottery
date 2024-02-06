import { proxy } from 'valtio'
import { GameStatus } from '@/constants'
import { awards } from '@/pages/GameOne/store/data.ts'
import { AudioState, Award, Person } from '@/types'

export interface GameOneStoreState {
  status: GameStatus
  awards: Award[]
  people: Person[]
  qrcode?: string
  currentAwardId: string
  /**
   * 本次中奖人
   */
  currentWinners?: Person[]
  audio: AudioState
  welcome: boolean
}

const lastAward = awards[awards.length - 1]

// state
export const gameOneState: GameOneStoreState = proxy<GameOneStoreState>(
  {
    welcome: true,
    status: GameStatus.GREETING,
    awards: awards.map(award => ({
      ...award,
      prize: award.prize.map(prize => ({
        ...prize,
        remain: prize.remain ?? prize.total,
      })),
    })),
    people: [],
    currentAwardId: lastAward.id,
    audio: {
      index: 0,
      enabled: false,
      lastIndex: 0,
      volume: 1,
    },
  },
)

// @ts-expect-error
window.gameOneState = gameOneState
