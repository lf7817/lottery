import { Html } from '@react-three/drei'
import * as stylex from '@stylexjs/stylex'
import { data } from './data.ts'
import styles from './styles.ts'
import { gameOneAction } from '@/pages/GameOne/store'
import { commonStyles } from '@/styles/common.ts'
import { GameStatus } from '@/constants'
import usePhotoWall from '@/pages/GameOne/components/PhotoWall/usePhotoWall.ts'
import Awards from '@/pages/GameOne/components/Awards'
import Qrcode from '@/pages/GameOne/components/PhotoWall/Qrcode.tsx'

export default function PhotoWall() {
  const { draw, startGame, status, cards, people } = usePhotoWall()

  return (
    <group>
      <group ref={cards} name="cards" position-z={-4}>
        {
          data.objects.map((item, index) => (
            <Html key={item.name} name={item.name} position={item.position} transform>
              <div {...stylex.props(styles.card(status < GameStatus.OPENING ? item.userData.highlight : false))}>
                {!!people[index]?.headimgurl && <div {...stylex.props(styles.avatar(people[index]?.headimgurl))} />}
                <div {...stylex.props(styles.mobile)}>{people[index]?.mobile?.slice(7) ?? '--'}</div>
                <div {...stylex.props(styles.name)}>{people[index]?.username ?? '待加入'}</div>
              </div>
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

        {
          status >= GameStatus.OPENING && (
            <group>
              <Html position={[1, -9, 3]} transform>
                <div {...stylex.props(commonStyles.button(true), styles.btn)} onClick={draw}>
                  {status === GameStatus.OPENING ? '抽奖' : '停止'}
                </div>
              </Html>
            </group>
          )
        }

        { status >= GameStatus.OPENING && <Awards /> }

        { status === GameStatus.SIGN_IN && <Qrcode /> }
      </group>

    </group>
  )
}
