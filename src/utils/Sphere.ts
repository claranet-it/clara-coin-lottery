import * as THREE from 'three'
import { ICards } from './Cards'

export interface Object3D extends THREE.Object3D {
  transactionIndex: number
}
export interface ISphere {
  readonly elements: Object3D[]
}

export class Sphere implements ISphere {
  public elements: Object3D[]

  constructor(cards: ICards) {
    const { count: length, elements } = cards
    this.elements = elements.map((tran, i) => {
      const phi = Math.acos(-1 + (2 * i) / length)
      const theta = Math.sqrt(length * Math.PI) * phi
      const object = new THREE.Object3D() as Object3D
      object.position.setFromSphericalCoords(800, phi, theta)
      const vector = new THREE.Vector3()
      vector.copy(object.position).multiplyScalar(2)
      object.lookAt(vector)
      object.transactionIndex = tran.transactionIndex
      return object
    })
  }
}
