import * as THREE from 'three'

export interface ICamera {
  readonly camera: THREE.PerspectiveCamera
  onWindowResize: () => void
}

export class Camera implements ICamera {
  public camera: THREE.PerspectiveCamera

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    this.camera.position.z = 2400
  }

  public onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}
