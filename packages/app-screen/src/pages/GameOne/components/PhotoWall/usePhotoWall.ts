import { useSnapshot } from 'valtio'
import { useLayoutEffect, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { toast } from 'react-toastify'
import { useMemoizedFn } from 'ahooks'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'
import { GameStatus } from '@/constants'
import { celebrateFireworks, transformObjects } from '@/utils'
import { objectData } from '@/pages/GameOne/components/PhotoWall/data.ts'
import { Person } from '@/types'

export default function usePhotoWall() {
  const elapsedTime = useRef(0)
  const cards = useRef<Group>(null)
  const { status, people, currentWinners } = useSnapshot(gameOneState)

  useLayoutEffect(() => {
    (async () => {
      if (status >= GameStatus.OPENING) {
        gsap.to(cards.current!.position, {
          z: -14,
          delay: 1.3,
          duration: 2.8,
          ease: 'power1.inOut',
        })
      }
      await transformObjects(cards.current!.children, status >= GameStatus.OPENING ? objectData.sphere : objectData.table)
      if (status === GameStatus.OPENING)
        await showWinners(undefined, 0)
    })()
  }, [])

  /**
   * 开始游戏
   */
  const startGame = () => {
    if (people.length < 2)
      return toast.info('人数不足')

    gsap.to(cards.current!.rotation, {
      y: Math.PI * 2,
      delay: 1.3,
      duration: 2.8,
      ease: 'power1.inOut',
    })

    gsap.to(cards.current!.position, {
      z: -14,
      delay: 1.3,
      duration: 2.8,
      ease: 'power1.inOut',
    })

    gameOneAction.changeMusic(1)
    gameOneAction.changeStatus(GameStatus.OPENING)
    transformObjects(cards.current!.children, objectData.sphere)
  }

  /**
   * 展示获奖人员
   * @param winners
   */
  const showWinners = useMemoizedFn(async (w?: Person[], delay = 2300) => {
    const winners = w ?? currentWinners ?? []

    if (winners.length === 0 || !cards.current)
      return

    const winnerCards = winners
      .map(winner => cards.current!.children.find(i => i.userData.person.openid === winner.openid)!)
      .filter(Boolean)

    // 要保证cards的 retation.y 为 2n * Math.PI才行
    const parentPosition = new Vector3(0, 0, -14)
    const cardWidth = 8
    const cardHeight = 10

    await new Promise((resolve) => {
      setTimeout(() => {
        let count = 0
        winnerCards.forEach((winner, index) => {
          const maxPerRow = Math.min(5, winners.length)
          // winners长度最大为 10，每行最多渲染 5 个，超过换行，卡片宽 6 高 8， 帮我计算下 x y
          const x = (index % maxPerRow) * cardWidth - (maxPerRow - 1) * cardWidth / 2 + cardWidth / 4
          const y = Math.floor(index / maxPerRow) * cardHeight - (Math.floor((winnerCards.length - 1) / maxPerRow)) * cardHeight / 2

          const targetPosition = new Vector3(x, y, 10)
          const localPosition = targetPosition.sub(parentPosition)

          gsap.to(winner.position, {
            x: localPosition.x,
            y: localPosition.y,
            z: localPosition.z,
            duration: 1,
            ease: 'power1.inOut',
            // @ts-expect-error
            onComplete: () => ++count === winnerCards.length && resolve(true),
          })

          gsap.to(winner.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'power1.inOut',
          })

          gsap.to(winner.scale, {
            x: winnerCards.length === 1 ? 4 : 2.5,
            y: winnerCards.length === 1 ? 4 : 2.5,
            z: winnerCards.length === 1 ? 4 : 2.5,
            duration: 1,
            ease: 'power1.inOut',
          })
        })
      }, delay)
    })

    await celebrateFireworks()
  })

  /**
   * 抽奖&停止
   */
  const draw = (start: boolean) => {
    if (start) {
      gameOneAction.draw(true)
      transformObjects(cards.current!.children, objectData.sphere, { duration: 1, delay: 0 })
    } else {
      const w = gameOneAction.draw(false) ?? []
      showWinners(w)
    }
  }

  const backToSign = () => {
    gameOneAction.changeMusic(0)
    gameOneAction.changeStatus(GameStatus.WAITING)
    gsap.to(cards.current!.position, {
      z: -14,
      delay: 1.3,
      duration: 2.8,
      ease: 'power1.inOut',
    })
    transformObjects(cards.current!.children, objectData.table, { duration: 2, delay: 1 })
  }

  useFrame((_, delta) => {
    if (!cards.current)
      return

    const targetDelta = 0.0166667
    const deltaRatio = delta / targetDelta
    const resultRatio = delta * deltaRatio

    if (status === GameStatus.DRAWING) {
      if (elapsedTime.current < 5)
        elapsedTime.current += resultRatio

      cards.current.rotation.y += elapsedTime.current * 0.02
    } else if (status === GameStatus.OPENING) {
      const targetY = Math.ceil(cards.current!.rotation.y / 2 / Math.PI)
      const deltaY = targetY * 2 * Math.PI - cards.current!.rotation.y

      // 停止时让卡片慢慢停下来，然后 rotation.y为 2n * Math.PI
      if (Math.abs(deltaY) < 0.001) {
        cards.current.rotation.y = targetY * 2 * Math.PI
        elapsedTime.current = 0
      }
      else {
        cards.current.rotation.y += Math.min(elapsedTime.current * 0.02, deltaY * 0.03)
      }
    }
  })

  return { startGame, status, people, cards, draw, currentWinners, backToSign }
}
