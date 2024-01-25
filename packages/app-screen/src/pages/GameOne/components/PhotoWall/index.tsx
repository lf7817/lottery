import { Html } from '@react-three/drei'
import { stylex } from '@stylexjs/stylex'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { useThree } from '@react-three/fiber'
import { data } from './data.ts'
import styles from './styles.ts'

interface PhotoWallProps {
  type: 'table' | 'sphere' | 'helix' | 'grid'
}

export default function PhotoWall(props: PhotoWallProps) {
  const { scene } = useThree()

  useEffect(() => {
    const cards = scene.getObjectByName('cards')

    cards?.children.forEach((card) => {
      if (props.type === 'table') {
        const cardPosition = data.table.find(item => item.name === card.name)!.position

        gsap.to(card.position, {
          x: cardPosition![0],
          y: cardPosition![1],
          z: cardPosition![2],
          duration: Math.random() * 1 + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })

        gsap.to(card.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: Math.random() * 1 + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })
      } else if (props.type === 'sphere') {
        const target = data.sphere.find(item => item.name === card.name)!

        gsap.to(card.position, {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
          duration: Math.random() * 1 + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })

        gsap.to(card.rotation, {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
          duration: Math.random() * 1 + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })
      }
    })
  }, [props.type, scene])

  return (
    <group name="cards" position-z={-10}>
      {
        data.objects.map(item => (
          <Html key={item.name} name={item.name} position={item.position} transform>
            <div {...stylex.props(styles.card(props.type === 'table' ? item.highlight : false))}>
              <div {...stylex.props(styles.mobile)}>0642</div>
              <div {...stylex.props(styles.name)}>李明伟</div>
            </div>
          </Html>
        ))
      }
    </group>
  )
}
