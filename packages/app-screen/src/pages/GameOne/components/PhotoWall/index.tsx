import { Html } from '@react-three/drei'
import * as stylex from '@stylexjs/stylex'
import { objectData } from './data.ts'
import styles from './styles.ts'
import { gameOneAction } from '@/pages/GameOne/store'
import { commonStyles } from '@/styles/common.ts'
import { GameStatus } from '@/constants'
import usePhotoWall from '@/pages/GameOne/components/PhotoWall/usePhotoWall.ts'
import Awards from '@/pages/GameOne/components/Awards'
import Qrcode from '@/pages/GameOne/components/PhotoWall/Qrcode.tsx'
import Card from '@/pages/GameOne/components/PhotoWall/Card.tsx'

export default function PhotoWall() {
  const { currentWinners, backToSign, draw, startGame, status, cards, people } = usePhotoWall()

  return (
    <group>
      <group ref={cards} name="cards" position-z={-4}>
        {
          objectData.objects.map((item, index) => (
            <Html
              key={item.name}
              name={item.name}
              position={item.position}
              transform
              userData={{ person: people[index] }}
            >
              <Card
                person={people[index]}
                onRemove={openid => gameOneAction.removeWinner(openid)}
                win={status === GameStatus.OPENING && !!currentWinners && currentWinners.some(winner => winner.username === people[index]?.username)}
                highlight={status < GameStatus.OPENING ? item.userData.highlight : false}
              />
            </Html>
          ))
        }
      </group>

      <group>
        {
          (status === GameStatus.SIGN_IN || status === GameStatus.WAITING) && (
            <group>
              <Html position={[-8, -8, 0]} transform>
                <div
                  {...stylex.props(commonStyles.button(true))}
                  onClick={() => gameOneAction.changeStatus(status === GameStatus.SIGN_IN ? GameStatus.WAITING : GameStatus.SIGN_IN)}
                >
                  年会签到
                </div>
              </Html>
              <Html position={[8, -8, 0]} transform>
                <div {...stylex.props(commonStyles.button(true))} onClick={startGame}>开始抽奖</div>
              </Html>
            </group>
          )
        }

        {status >= GameStatus.OPENING && <Awards />}

        {status === GameStatus.SIGN_IN && <Qrcode />}

        {
          (status === GameStatus.OPENING || status === GameStatus.DRAWING) && (
            <group>
              <Html position={[-10, -9, 3]} transform>
                <div
                  {...stylex.props(commonStyles.button(true), styles.btn)}
                  onClick={backToSign}
                >
                  返回
                </div>
              </Html>

              <Html position={[1, -9, 3]} transform>
                <div
                  {...stylex.props(commonStyles.button(true), styles.btn)}
                  onClick={() => draw(status === GameStatus.OPENING)}
                >
                  {status === GameStatus.OPENING ? '抽奖' : '停止'}
                </div>
              </Html>

              <Html position={[12, -9, 3]} transform>
                <div
                  {...stylex.props(commonStyles.button(true), styles.btn)}
                  onClick={() => {
                    gameOneAction.playAudio(true, 2)
                    gameOneAction.changeStatus(GameStatus.AWARD)
                  }}
                >
                  颁奖
                </div>
              </Html>
            </group>
          )
        }

        {
          status === GameStatus.END && (
            <group>
              <Html position={[7, -9, 3]} transform>
                <div
                  {...stylex.props(commonStyles.button(true), styles.btn)}
                  onClick={() => {
                    gameOneAction.playAudio(true, 2)
                    gameOneAction.changeStatus(GameStatus.AWARD)
                  }}
                >
                  颁奖
                </div>
              </Html>

              <Html position={[-6, -9, 3]} transform>
                <div {...stylex.props(commonStyles.button(true), styles.btn)} onClick={() => gameOneAction.reset()}>
                  重置
                </div>
              </Html>
            </group>
          )
        }

      </group>
    </group>
  )
}
