import { proxy } from 'valtio'
import { GameStatus } from '@/constants'
import { awards } from '@/pages/GameOne/store/data.ts'
import { Award, Person } from '@/types'

export interface GameOneStoreState {
  status: GameStatus
  awards: Award[]
  people: Person[]
  qrcode?: string
}

// state
export const gameOneState: GameOneStoreState = proxy<GameOneStoreState>(
  {
    status: GameStatus.GREETING,
    awards: awards.map(award => ({
      ...award,
      prize: award.prize.map(prize => ({
        ...prize,
        remain: prize.remain ?? prize.total,
      })),
    })),
    people: [],
  },
)
