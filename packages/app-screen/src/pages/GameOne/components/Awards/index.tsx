import { Html } from '@react-three/drei'
import * as stylex from '@stylexjs/stylex'
import { useSnapshot } from 'valtio'
import styles from '@/pages/GameOne/components/Awards/styles.ts'
import { gameOneState } from '@/pages/GameOne/store'

export default function Awards() {
  const { awards } = useSnapshot(gameOneState)

  return (
    <group name="awards" position={[-28, 0, 4]}>
      <Html transform>
        <div {...stylex.props(styles.awards)}>
          {
            awards.map(award => (
              <div key={award.id} {...stylex.props(styles.item(award.id === '4'))}>
                <div {...stylex.props(styles.image(award.prize[0].image))}></div>
                <div {...stylex.props(styles.content)}>
                  <div {...stylex.props(styles.title)}>{award.title}</div>
                  <div {...stylex.props(styles.progress)}>{award.prize.map(item => item.title).join('、')}</div>
                </div>
              </div>
            ))
          }
        </div>
      </Html>
    </group>
  )
}
