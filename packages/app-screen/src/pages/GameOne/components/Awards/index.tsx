import { Html } from '@react-three/drei'
import * as stylex from '@stylexjs/stylex'
import { useSnapshot } from 'valtio'
import styles from '@/pages/GameOne/components/Awards/styles.ts'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'
import { StreamerDiv } from '@/pages/GameOne/components/Awards/StreamerDiv.tsx'

export default function Awards() {
  const { awards, currentAwardId } = useSnapshot(gameOneState)

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
                <div key={award.id}>
                  <StreamerDiv
                    active={award.id === currentAwardId}
                    content={(
                      <div
                        {...stylex.props(styles.item(award.id === currentAwardId))}
                        onClick={() => {
                          gameOneAction.changeAward(award.id)
                        }}
                      >
                        <div {...stylex.props(styles.image(award.prize[0].image))}></div>
                        <div {...stylex.props(styles.content)}>
                          <div {...stylex.props(styles.title)}>
                            <span>{award.title}</span>
                            <span {...stylex.props(styles.count)}>{`${remain}/${total}`}</span>
                          </div>
                          <div {...stylex.props(styles.prize)}>{award.prize.map(item => item.title).join('、')}</div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              )
            })
          }
        </div>
      </Html>
    </group>
  )
}
