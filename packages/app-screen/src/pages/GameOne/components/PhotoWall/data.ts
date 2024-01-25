import * as THREE from 'three'

/**
 * 2024矩阵
 */
export const tableMatrix: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

interface ObjectPoint {
  name: string
  position: [number, number, number]
  highlight: boolean
}

function parseMatrix() {
  const objects: ObjectPoint[] = []
  const table: ObjectPoint[] = []
  const sphere: THREE.Object3D<THREE.Object3DEventMap>[] = []

  // table
  for (let row = 0; row < tableMatrix.length; row++) {
    for (let col = 0; col < tableMatrix[row].length; col++) {
      const name = `${row}-${col}`
      const highlight = !!tableMatrix[row][col]

      objects.push({
        name,
        highlight,
        position: [
          (Math.random() - 0.5) * 64,
          (Math.random() - 0.5) * 36,
          (Math.random() - 0.5) * 20,
        ],
      })

      table.push({
        name,
        highlight,
        position: [
          3 * (col - Math.floor(tableMatrix[row].length / 2)) * 0.95,
          -4 * (row - Math.floor(tableMatrix.length / 2)) * 0.95,
          0,
        ],
      })
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

  return {
    objects,
    table,
    sphere,
  }
}

export const data = parseMatrix()
