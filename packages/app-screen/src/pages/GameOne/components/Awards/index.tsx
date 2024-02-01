import { Html } from '@react-three/drei'
import * as stylex from '@stylexjs/stylex'
import { useSnapshot } from 'valtio'
import styles from '@/pages/GameOne/components/Awards/styles.ts'
import { gameOneDerive, gameOneState } from '@/pages/GameOne/store'

export default function Awards() {
  const { awards } = useSnapshot(gameOneState)
  const { currentAward } = useSnapshot(gameOneDerive)

  return (
    <group name="awards" position={[-28, 0, 4]}>
      <Html transform>
        <div {...stylex.props(styles.awards)}>
          {
            awards.map((award) => {
              const { total, remain } = award.prize.reduce((rtn, p) => {
                rtn.total += p.total
                rtn.remain += p.remain ?? p.total
                return rtn
              }, { total: 0, remain: 0 })
              return (
                <div key={award.id} {...stylex.props(styles.item(award.id === currentAward.awardId))}>
                  <div {...stylex.props(styles.image(award.prize[0].image))}></div>
                  <div {...stylex.props(styles.content)}>
                    <div {...stylex.props(styles.title)}>
                      <span>{award.title}</span>
                      <span {...stylex.props(styles.count)}>{`${remain}/${total}`}</span>
                    </div>
                    <div {...stylex.props(styles.prize)}>{award.prize.map(item => item.title).join('、')}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Html>
    </group>
  )
}
