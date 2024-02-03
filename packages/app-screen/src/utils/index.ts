import { Object3D } from 'three'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'

export function getAssetPath(filePath: string) {
  return `${import.meta.env.BASE_URL}${filePath}`
}

interface TransformObjectsOptions {
  duration?: number
  delay?: number
}

export function transformObjects(objects: Object3D[], targets: Object3D[], options?: TransformObjectsOptions) {
  const { duration = 2, delay = 2 } = options || {}
  return Promise.all(objects.map((object) => {
    return new Promise((resolve) => {
      let count = 0
      // eslint-disable-next-line style/max-statements-per-line
      const onComplete = () => { ++count === 3 && resolve(true) }
      const target = targets.find(item => item.name === object.name)!
      gsap.to(object.position, {
        x: target.position.x,
        y: target.position.y,
        z: target.position.z,
        duration: Math.random() * duration + 1,
        delay: Math.random() * delay,
        ease: 'power1.inOut',
        onComplete,
      })

      gsap.to(object.rotation, {
        x: target.rotation.x,
        y: target.rotation.y,
        z: target.rotation.z,
        duration: Math.random() * duration + 1,
        delay: Math.random() * delay,
        ease: 'power1.inOut',
        onComplete,
      })

      gsap.to(object.scale, {
        x: target.scale.x,
        y: target.scale.y,
        z: target.scale.z,
        duration: Math.random() * duration + 1,
        delay: Math.random() * delay,
        ease: 'power1.inOut',
        onComplete,
      })
    })
  }))
}

export async function celebrateFireworks() {
  const myCanvas = document.createElement('canvas')
  myCanvas.width = 1920
  myCanvas.height = 1080
  myCanvas.style.position = 'absolute'
  myCanvas.style.top = '0px'
  myCanvas.style.left = '0px'
  myCanvas.style.right = '0px'
  myCanvas.style.bottom = '0px'
  myCanvas.style.zIndex = '10000000'
  myCanvas.style.pointerEvents = 'none'

  document.getElementById('root')?.appendChild(myCanvas)

  const myConfetti = confetti.create(myCanvas, {
    useWorker: true,
  })

  const end = Date.now() + (4 * 1000)
  // go Buckeyes!
  const colors = ['#FFFF00', '#FFA500']

  await new Promise((resolve) => {
    (function frame() {
      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        scalar: 1.4,
      })
      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        scalar: 1.4,
      })

      if (Date.now() < end)
        requestAnimationFrame(frame)
      else
        setTimeout(resolve, 5000)
    }())
  })

  document.getElementById('root')?.removeChild(myCanvas)
}
