import { useSnapshot } from 'valtio'
import { useLayoutEffect, useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { gameOneAction, gameOneDerive, gameOneState } from '@/pages/GameOne/store'
import { GameStatus } from '@/constants'
import { transformObjects } from '@/utils'
import { data } from '@/pages/GameOne/components/PhotoWall/data.ts'

export default function usePhotoWall() {
  const elapsedTime = useRef(0)
  const cards = useRef<Group>(null)
  const { status, people } = useSnapshot(gameOneState)
  const { currentAward } = useSnapshot(gameOneDerive)

  const startGame = () => {
    if (people.length >= 2) {
      gsap.to(cards.current!.rotation, {
        y: Math.PI * 2,
        delay: 1.3,
        duration: 2.8,
        ease: 'power1.inOut',
      })
      gameOneAction.changeStatus(GameStatus.OPENING)
    }

    else
    // eslint-disable-next-line no-alert
    { alert('人数不足') }
  }

  const draw = () => {
    console.log(currentAward)
    gameOneAction.changeStatus(status === GameStatus.DRAWING ? GameStatus.OPENING : GameStatus.DRAWING)
  }

  useLayoutEffect(() => {
    if (status >= GameStatus.OPENING)
      transformObjects(cards.current!.children, data.sphere)
    else
      transformObjects(cards.current!.children, data.table)
  }, [status])

  useFrame((_, delta) => {
    if (!cards.current)
      return

    const targetDelta = 0.0166667
    const deltaRatio = delta / targetDelta
    const resultRatio = delta * deltaRatio

    if (status === GameStatus.DRAWING) {
      if (elapsedTime.current < 10)
        elapsedTime.current += resultRatio
    } else if (status === GameStatus.OPENING) {
      if (elapsedTime.current > 0)
        elapsedTime.current = Math.max(elapsedTime.current - resultRatio * 4, 0)
    }

    cards.current.rotation.y += elapsedTime.current * 0.01
  })

  return { startGame, status, people, cards, draw }
}
