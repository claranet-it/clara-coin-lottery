import { storeActions, storeSelectors } from '../store'
import { Card } from './Card'
import { IScene } from './Scene'

export interface ICards {
  readonly elements: ReadonlyArray<Card>
  readonly count: number
}

export class Cards implements ICards {
  readonly elements: ReadonlyArray<Card>

  get count(): number {
    return this.elements.length
  }

  constructor(scene: IScene) {
    this.elements = storeSelectors
      .getTransaction()
      .map(transaction => new Card(scene, transaction))
  }
}
