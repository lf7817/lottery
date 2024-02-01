import { useSnapshot } from 'valtio'
import { useLayoutEffect, useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'
import { GameStatus, PhotoWallType } from '@/constants'
import { transformObjects } from '@/utils'
import { data } from '@/pages/GameOne/components/PhotoWall/data.ts'

export default function usePhotoWall() {
  const elapsedTime = useRef(0)
  const cards = useRef<Group>(null)
  const { status, people } = useSnapshot(gameOneState)

  const startGame = () => {
    if (people.length >= 2)
      gameOneAction.changeStatus(GameStatus.OPENING)
    else
      // eslint-disable-next-line no-alert
      alert('人数不足')
  }

  const draw = () => {
    gameOneAction.changeStatus(status === GameStatus.DRAWING ? GameStatus.OPENING : GameStatus.DRAWING)
  }

  useLayoutEffect(() => {
    const type = status < GameStatus.OPENING ? PhotoWallType.TABLE : PhotoWallType.SPHERE
    transformObjects(cards.current!.children, type === PhotoWallType.TABLE ? data.table : data.sphere)
  }, [status])

  useFrame((_, delta) => {
    // const fps = Math.round(1 / delta)

    if (!cards.current)
      return

    if (status === GameStatus.DRAWING) {
      if (elapsedTime.current < 10)
        elapsedTime.current += delta
    } else if (status === GameStatus.OPENING) {
      if (elapsedTime.current > 0)
        elapsedTime.current = Math.max(elapsedTime.current - delta * 4, 0)
    }

    cards.current.rotation.y += elapsedTime.current * 0.01
  })

  return { startGame, status, people, cards, draw }
}
