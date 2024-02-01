import { derive } from 'valtio/utils'
import { gameOneState } from '@/pages/GameOne/store/state.ts'
import { Award, Prize } from '@/types'

export const gameOneDerive = derive({
  currentAward: (get) => {
    const { awards } = get(gameOneState)

    let award: Award | undefined
    let prize: Prize | undefined

    for (let i = awards.length - 1; i >= 0; i--) {
      award = awards[i]
      prize = award.prize.find(p => (p.remain ?? p.total) > 0)

      if (prize)
        break
    }

    if (prize && award) {
      return {
        awardId: award.id,
        awardTitle: award.title,
        prizeId: prize.id,
        prizeTitle: prize.title,
        image: prize.image,
        remain: prize.remain ?? prize.total,
        count: award.count,
      }
    }

    const first = awards[0]
    const firstPrize = first.prize[first.prize.length - 1]

    return {
      awardId: first.id,
      awardTitle: first.title,
      prizeId: firstPrize.id,
      prizeTitle: firstPrize.title,
      image: firstPrize.image,
      remain: 0,
      count: first.count,
    }
  },
})
