import * as THREE from 'three'
import { Object3D } from 'three'

/**
 * 2024矩阵
 */
export const tMatrix: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export const tMatrix2: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function parseMatrix(tableMatrix: number[][]) {
  const objects: THREE.Object3D[] = []
  const table: THREE.Object3D[] = []
  const sphere: THREE.Object3D[] = []
  const helix: THREE.Object3D[] = []

  // table
  for (let row = 0; row < tableMatrix.length; row++) {
    for (let col = 0; col < tableMatrix[row].length; col++) {
      const name = `${row}-${col}`
      const highlight = !!tableMatrix[row][col]

      const object = new Object3D()
      object.name = name
      object.position.x = (Math.random() - 0.5) * 64
      object.position.y = (Math.random() - 0.5) * 64
      object.position.z = (Math.random() - 0.5) * 64
      object.userData.highlight = highlight

      objects.push(object)

      const t = new Object3D()
      t.name = name
      t.position.x = 3 * (col - Math.floor(tableMatrix[row].length / 2)) * 0.95 + 0.3
      t.position.y = -4 * (row - Math.floor(tableMatrix.length / 2)) * 0.931
      t.position.z = 0
      t.rotation.set(0, 0, 0)
      t.scale.set(1, 1, 1)
      t.userData.highlight = highlight

      table.push(t)
    }
  }

  const vector = new THREE.Vector3()
  const l = objects.length

  // sphere
  for (let i = 0; i < objects.length; i++) {
    const phi = Math.acos(-1 + (2 * i) / l)
    const theta = Math.sqrt(l * Math.PI) * phi

    const object = new THREE.Object3D()
    object.name = objects[i].name
    object.position.setFromSphericalCoords(15, phi, theta)
    vector.copy(object.position).multiplyScalar(2)
    object.lookAt(vector)
    sphere.push(object)
  }

  // helix
  for (let i = 0, l = objects.length; i < l; i++) {
    const theta = i * 0.175 + Math.PI
    const y = -(i * 0.2) + 12

    const object = new THREE.Object3D()
    object.name = objects[i].name

    object.position.setFromCylindricalCoords(16, theta, y)
    object.scale.set(1, 1, 1)

    vector.x = object.position.x * 2
    vector.y = object.position.y
    vector.z = object.position.z * 2

    object.lookAt(vector)

    helix.push(object)
  }

  return {
    objects,
    table,
    sphere,
    helix,
  }
}

export const data = parseMatrix(tMatrix)
