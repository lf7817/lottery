import { useSnapshot } from 'valtio'
import { useEffect, useRef } from 'react'
import { Group, Object3D, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { toast } from 'react-toastify'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'
import { GameStatus } from '@/constants'
import { celebrateFireworks, transformObjects } from '@/utils'
import { data } from '@/pages/GameOne/components/PhotoWall/data.ts'

export default function usePhotoWall() {
  const elapsedTime = useRef(0)
  const cards = useRef<Group>(null)
  const { status, people, currentWinners } = useSnapshot(gameOneState)

  useEffect(() => {
    if (status >= GameStatus.OPENING) {
      gsap.to(cards.current!.position, {
        z: -14,
        delay: 1.3,
        duration: 2.8,
        ease: 'power1.inOut',
      })
    }
    transformObjects(cards.current!.children, status >= GameStatus.OPENING ? data.sphere : data.table)
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

    gameOneAction.changeStatus(GameStatus.OPENING)
    transformObjects(cards.current!.children, data.sphere)
  }

  /**
   * 展示获奖人员
   * @param winners
   */
  const showWinners = async (winners: Object3D[]) => {
    // 要保证cards的 retation.y 为 2n * Math.PI才行
    const parentPosition = new Vector3(0, 0, 14)

    const cardWidth = 6
    const cardHeight = 8

    await new Promise((resolve) => {
      setTimeout(() => {
        let count = 0
        winners.forEach((winner, index) => {
          const maxPerRow = Math.min(5, winners.length)
          // winners长度最大为 10，每行最多渲染 5 个，超过换行，卡片宽 6 高 8， 帮我计算下 x y
          const x = (index % maxPerRow) * cardWidth - (maxPerRow - 1) * cardWidth / 2 + cardWidth / 4
          const y = Math.floor(index / maxPerRow) * cardHeight - (Math.floor((winners.length - 1) / maxPerRow)) * cardHeight / 2

          const targetPosition = new Vector3(x, y, 10)
          const localPosition = targetPosition.add(parentPosition)

          gsap.to(winner.position, {
            x: localPosition.x,
            y: localPosition.y,
            z: localPosition.z,
            duration: 1,
            ease: 'power1.inOut',
            // @ts-expect-error
            onComplete: () => ++count === winners.length && resolve(true),
          })

          gsap.to(winner.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'power1.inOut',
          })

          gsap.to(winner.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 1,
            ease: 'power1.inOut',
          })
        })
      }, 2300)
    })

    await celebrateFireworks()
  }

  /**
   * 抽奖&停止
   */
  const draw = (start: boolean) => {
    if (start) {
      gameOneAction.draw(true)
      transformObjects(cards.current!.children, data.sphere, { duration: 1, delay: 0 })
    } else {
      const winners = gameOneAction.draw(false)

      if (winners) {
        // 把中奖者放到前面
        const cardObjects = winners
          .map(winner => cards.current!.children.find(i => i.userData.person.openid === winner.openid)!)
          .filter(Boolean)

        showWinners(cardObjects)
      }
    }
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

  return { startGame, status, people, cards, draw, currentWinners }
}
