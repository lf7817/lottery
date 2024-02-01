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
    awards,
    people: [],
    // people: Array.from({ length: 101 }).fill(0).map(() => ({
    //   username: Mock.mock('@cname'),
    //   mobile: Mock.mock(/\d{4}/),
    //   openid: Mock.mock(/\d{4}/),
    //   headimgurl: Mock.mock('@image'),
    // })),
  },
)
