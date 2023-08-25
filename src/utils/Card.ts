import type { Euler, Vector3 } from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import CardComponent from '../lib/Card/Card.svelte'
import { IScene } from './Scene'
import { Transaction } from './transaction'

export interface ICard {
  position: Vector3
  rotation: Euler
  transactionIndex: number
}

export class Card implements ICard {
  private readonly object: CSS3DObject
  private readonly selected: boolean

  constructor(scene: IScene, private trans: Transaction) {
    const element = this.createCard(this.trans)
    this.object = new CSS3DObject(element)
    this.object.position.x = Math.random() * 4000 - 2000
    this.object.position.y = Math.random() * 4000 - 2000
    this.object.position.z = Math.random() * 4000 - 2000
    scene.scene.add(this.object)
    this.selected = false
  }

  get position(): Vector3 {
    return this.object.position
  }

  get rotation(): Euler {
    return this.object.rotation
  }

  get transactionIndex(): number {
    return this.trans.index
  }

  private createCard = (transaction: Transaction) => {
    const el = document.createElement('div')
    new CardComponent({
      target: el,
      props: { transaction }
    })
    return el
  }
}
