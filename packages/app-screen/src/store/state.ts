import { proxy } from 'valtio'
import { GameStatus } from '@/constants'
import { awards } from '@/store/data'
import { Award, Person } from '@/types'

export interface GameStoreState {
  status: GameStatus
  awards: Award[]
  people: Person[]
}

// state
export const gameStoreState: GameStoreState = proxy<GameStoreState>(
  {
    status: GameStatus.GREETING,
    awards,
    people: [],
  },
)
