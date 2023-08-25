import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export interface IRenderer {
  readonly renderer: CSS3DRenderer
  setSize: (width: number, height: number) => void
}

export class Renderer implements IRenderer {
  public renderer: CSS3DRenderer

  constructor(element: HTMLElement) {
    this.renderer = new CSS3DRenderer()
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.4)
    element.appendChild(this.renderer.domElement)
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height)
  }
}
