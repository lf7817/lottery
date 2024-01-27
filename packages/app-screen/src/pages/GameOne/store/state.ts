import { proxy } from 'valtio'
import { GameStatus } from '@/constants'
import { awards } from '@/pages/GameOne/store/data.ts'
import { Award, Person } from '@/types'

export interface GameOneStoreState {
  status: GameStatus
  awards: Award[]
  people: Person[]
}

// state
export const gameOneState: GameOneStoreState = proxy<GameOneStoreState>(
  {
    status: GameStatus.GREETING,
    awards,
    people: [],
  },
)
