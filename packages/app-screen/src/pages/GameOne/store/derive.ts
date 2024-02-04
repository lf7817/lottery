import { derive } from 'valtio/utils'
import { gameOneState } from '@/pages/GameOne/store/state.ts'
import { objectData } from '@/pages/GameOne/components/PhotoWall/data.ts'

export const gameOneDerive = derive({
  prizeRemain: get => get(gameOneState).awards.map(item => item.prize).flat().filter(item => item.remain! > 0),
  peopleRemain: get => get(gameOneState).people.slice(0, objectData.objects.length).filter(item => !item.awardId),
  current: (get) => {
    const { awards, currentAwardId } = get(gameOneState)
    const award = awards.find(item => item.id === currentAwardId)!

    return {
      id: currentAwardId,
      title: award.title,
      count: award.count,
      total: award.prize.map(item => item.total).reduce((prev, cur) => prev + cur),
      remain: award.prize.map(item => item.remain!).reduce((prev, cur) => prev + cur),
      prize: award.prize.filter(item => item.remain! > 0),
    }
  },
})
