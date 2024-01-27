import { derive } from 'valtio/utils'
import { gameOneState } from './state.ts'

export const gameOneDerive = derive({
  pools: get => get(gameOneState).awards,
  s: get => get(gameOneState).status,
})
