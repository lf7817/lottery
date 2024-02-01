import { Object3D } from 'three'
import { gsap } from 'gsap'

export function getAssetPath(filePath: string) {
  return `${import.meta.env.BASE_URL}${filePath}`
}

export function transformObjects(objects: Object3D[], targets: Object3D[]) {
  return Promise.all(objects.map((object) => {
    return new Promise((resolve) => {
      let count = 0
      // eslint-disable-next-line style/max-statements-per-line
      const onComplete = () => { ++count === 2 && resolve(true) }
      const target = targets.find(item => item.name === object.name)!
      gsap.to(object.position, {
        x: target.position.x,
        y: target.position.y,
        z: target.position.z,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
        ease: 'power1.inOut',
        onComplete,
      })

      gsap.to(object.rotation, {
        x: target.rotation.x,
        y: target.rotation.y,
        z: target.rotation.z,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
        ease: 'power1.inOut',
        onComplete,
      })
    })
  }))
}
