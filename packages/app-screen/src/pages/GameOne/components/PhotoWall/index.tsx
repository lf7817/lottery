import { Html } from '@react-three/drei'
import { stylex } from '@stylexjs/stylex'
import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { useFrame, useThree } from '@react-three/fiber'
import { data, people } from './data.ts'
import styles from './styles.ts'

interface PhotoWallProps {
  type: 'table' | 'sphere' | 'helix'
}

export default function PhotoWall(props: PhotoWallProps) {
  const { scene } = useThree()

  useLayoutEffect(() => {
    const cards = scene.getObjectByName('cards')

    cards?.children.forEach((card) => {
      if (props.type === 'table') {
        const object = data.table.find(item => item.name === card.name)!

        gsap.to(card.position, {
          x: object.position.x,
          y: object.position.y,
          z: object.position.z,
          duration: Math.random() + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })

        gsap.to(card.rotation, {
          x: object.rotation.x,
          y: object.rotation.y,
          z: object.rotation.z,
          duration: Math.random() + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })
      } else if (props.type === 'sphere') {
        const target = data.sphere.find(item => item.name === card.name)!

        gsap.to(card.position, {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
          duration: Math.random() + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })

        gsap.to(card.rotation, {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
          duration: Math.random() + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })
      } else if (props.type === 'helix') {
        const target = data.helix.find(item => item.name === card.name)!

        gsap.to(card.position, {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
          duration: Math.random() + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })

        gsap.to(card.rotation, {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
          duration: Math.random() + 1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })
      }
    })
  }, [props.type, scene])

  useFrame(() => {
    // const cards = scene.getObjectByName('cards')!

    // cards.rotation.y += 0.04
  })

  return (
    <group name="cards" position-z={-4}>
      {
        data.objects.map((item, index) => (
          <Html key={item.name} name={item.name} position={item.position} transform>
            <div {...stylex.props(styles.card(props.type === 'table' ? item.userData.highlight : false))}>
              <div {...stylex.props(styles.mobile)}>{people[index]?.mobile ?? '--'}</div>
              <div {...stylex.props(styles.name)}>{people[index]?.name ?? '待加入'}</div>
            </div>
          </Html>
        ))
      }
    </group>
  )
}
