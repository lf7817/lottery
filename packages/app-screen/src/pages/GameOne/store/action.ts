import { subscribe } from 'valtio'
import { devtools } from 'valtio/utils'
import { toast } from 'react-toastify'
import { GameOneStoreState, gameOneState } from './state.ts'
import { GameStatus } from '@/constants'
import { Person } from '@/types'
import { gameOneDerive } from '@/pages/GameOne/store/derive.ts'
import {awards, sound, sound1, sound2, sound3} from '@/pages/GameOne/store/data.ts'

export const cacheToken = 'GAME_STORE_STATE'

// actions
export const gameOneAction = {
  /**
   * 初始化 state&开发者工具
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
  /**
   * 重置状态
   */
  reset() {
    if (!window.confirm('确定要重置吗？'))
      return

    gameOneState.status = GameStatus.GREETING
    gameOneState.awards = awards.map(award => ({
      ...award,
      prize: award.prize.map(prize => ({
        ...prize,
        remain: prize.remain ?? prize.total,
      })),
    }))
    gameOneState.people = []
    gameOneState.currentAwardId = awards[awards.length - 1].id
    gameOneState.qrcode = undefined
    gameOneState.audio = {
      index:0,
      state:false
    }
    localStorage.removeItem(cacheToken)
    
  },
  /**
   * 修改状态
   * @param s
   */
  changeStatus(s: GameStatus) {
    gameOneState.status = s
  },
  /**
   * 生成签到二维码
   * @param isNew
   */
  generateQRcode(isNew?: boolean) {
    if (isNew || !gameOneState.qrcode)
      gameOneState.qrcode = new Date().getTime().toString()
  },
  /**
   * 更新签到人
   * @param people
   */
  updatePeople(people: Person[]) {
    gameOneState.people = people.map(person => ({
      ...person,
      mobile: person.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    }))
  },
  /**
   * 抽奖
   */
  draw(start: boolean) {
    if (gameOneDerive.prizeRemain.length === 0) {
      toast.info('全部奖品已抽完')
      this.changeStatus(GameStatus.END)
      return
    }

    if (gameOneDerive.current.remain === 0) {
      toast.info('当前奖项已抽完，请选择其他奖项')
      return
    }

    if (gameOneDerive.peopleRemain.length === 0) {
      toast.info('剩余抽奖人数不足')
      return
    }

    if (start) {
      gameOneState.currentWinners = undefined
      this.changeStatus(GameStatus.DRAWING)
    } else {
      this.changeStatus(GameStatus.OPENING)
      return this.getRandomWinners()
    }
  },
  /**
   * 切换奖项
   * @param id
   */
  changeAward(id: string) {
    if (gameOneState.status === GameStatus.DRAWING)
      return toast.info('正在抽奖中，请稍后再试')

    gameOneState.currentAwardId = id
  },
  /**
   * 获取获奖人员&奖品
   */
  getRandomWinners() {
    const { current, peopleRemain } = gameOneDerive
    // 获取抽奖人数
    const count = Math.min(current.count, peopleRemain.length, current.remain)
    // 获胜者
    const people = this.getRandomPeople(count)
    // 奖品
    const prizes = current.prize
    // 消耗奖品&人
    people.forEach((person) => {
      const prize = prizes.find(item => item.remain! > 0)!
      prize.remain!--
      person.awardId = current.id
      person.prizeId = prize.id
    })

    gameOneState.currentWinners = people

    return people
  },
  /**
   * 随机获取人员
   * @param len
   */
  getRandomPeople(len: number) {
    const newArr: Person[] = []
    const arr = [...gameOneDerive.peopleRemain]

    for (let i = 0; i < len; i++) {
      const index = Math.floor(Math.random() * arr.length)
      const item = arr[index]
      newArr.push(item)
      arr.splice(index, 1)
    }

    return newArr.reverse()
  },
  removeWinner(openid: string) {
    if (window.confirm('确定要移除吗？')) {
      const person = gameOneState.people.find(p => p.openid === openid)

      if (!!person && !!person.awardId && !!person.prizeId) {
        const award = gameOneState.awards.find(a => a.id === person.awardId)
        const prize = award?.prize.find(p => p.id === person.prizeId)
        prize!.remain!++
        person.awardId = undefined
        person.prizeId = undefined

        if (gameOneState.currentWinners)
          gameOneState.currentWinners = gameOneState.currentWinners.filter(w => w.openid !== openid)
      } }
  },
  playAudio(play:boolean,current?:number){
    gameOneState.audio.state=play
    if(current){
      gameOneState.audio.index=current
    }
    const index:number =current??gameOneState.audio.index??0
    sound1.pause()
    sound2.pause()
    sound3.pause()
    if (play)
      sound[index].play()
    else
      sound[index].pause()
  }
}
