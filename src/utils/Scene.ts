import * as THREE from 'three'

export interface IScene {
  readonly scene: THREE.Scene
  rotation: () => THREE.Scene['rotation']
  changeRotationY: (value: number) => void
}

export class Scene implements IScene {
  public readonly scene: THREE.Scene

  constructor() {
    this.scene = new THREE.Scene()
  }

  public rotation(): THREE.Scene['rotation'] {
    return this.scene.rotation
  }

  public changeRotationY(value: number): void {
    this.scene.rotation.y = value
  }
}
