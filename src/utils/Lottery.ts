import * as TWEEN from '@tweenjs/tween.js'
import { Object3D } from 'three'
import { Camera, ICamera } from './Camera'
import { Card } from './Card'
import { Cards, ICards } from './Cards'
import { Renderer } from './Renderer'
import { IScene, Scene } from './Scene'
import { ISphere, Sphere } from './Sphere'

export class Lottery {
  private ROTATE_TIME = 10000

  private cards: ICards
  private scene: IScene
  private sphere: ISphere

  private camera: ICamera
  private renderer: Renderer

  constructor(element: HTMLElement) {
    this.scene = new Scene()
    this.camera = new Camera()
    this.cards = new Cards(this.scene)
    this.sphere = new Sphere(this.cards)
    this.renderer = new Renderer(element)

    this.transform(this.cards, this.sphere, 0)
    window.addEventListener('resize', this.onWindowResize, false)
    this.animate()
  }

  private render = () => {
    this.renderer.renderer.render(this.scene.scene, this.camera.camera)
  }

  private transform(cards: ICards, sphere: ISphere, duration: number) {
    for (let i = 0; i < cards.elements.length; i++) {
      const object = cards.elements[i]
      const target = sphere.elements[i]

      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      new TWEEN.Tween(object.rotation)
        .to(
          { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
    }

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(this.render)
      .start()
  }

  private onWindowResize = () => {
    this.camera.onWindowResize()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.render()
  }

  public animate = () => {
    requestAnimationFrame(this.animate)
    TWEEN.update()
  }

  public rotateBall = () => {
    return new Promise<void>(resolve => {
      this.scene.changeRotationY(0)
      new TWEEN.Tween(this.scene.rotation())
        .to({ y: Math.PI * 8 }, this.ROTATE_TIME)
        .onUpdate(this.render)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
        .onComplete(() => resolve())
    })
  }

  public resetCard = (index: number | undefined) => {
    if (index === undefined) {
      return Promise.resolve()
    }

    const duration = 1000
    const object = this.findCardByTransactionIndex(index)
    const target = this.findSphereByTransactionIndex(index)
    new TWEEN.Tween(object.position)
      .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()

    new TWEEN.Tween(object.rotation)
      .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()

    return new Promise<void>(resolve => {
      new TWEEN.Tween(this)
        .to({}, duration)
        .onUpdate(this.render)
        .start()
        .onComplete(() => resolve())
    })
  }

  public selectCard = (index: number | undefined) => {
    if (index === undefined) {
      return Promise.resolve()
    }

    const duration = 1000
    const object = this.findCardByTransactionIndex(index)
    if (object) {
      new TWEEN.Tween(object.position)
        .to({ x: 0, y: 0, z: 1550 }, duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      new TWEEN.Tween(object.rotation)
        .to({ x: 0, y: 0, z: 0 }, duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    }
  }

  private findCardByTransactionIndex(index: number): Card {
    const card = this.cards.elements.find(el => el.transactionIndex === index)
    if (!card) {
      throw Error('Card not found')
    }
    return card
  }

  private findSphereByTransactionIndex(index: number): Object3D {
    const sphere = this.sphere.elements.find(el => el.transactionIndex === index)
    if (!sphere) {
      throw Error('Sphere not found')
    }
    return sphere
  }
}
