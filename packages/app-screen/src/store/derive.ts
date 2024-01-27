import { derive } from 'valtio/utils'
import { gameStoreState } from './state'

export const gameStoreDerive = derive({
  pools: get => get(gameStoreState).awards,
  s: get => get(gameStoreState).status,
})
