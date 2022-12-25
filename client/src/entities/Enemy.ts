import { IPosition } from "../types/IPosition"

export class Sprite {
    private context:any
    private image:HTMLImageElement
    private position:IPosition

    constructor(context:any, image:HTMLImageElement, position:IPosition) {
        this.context = context
        this.position = position
        this.image = image
    }
  
    private draw() {
      this.context.drawImage(this.image, this.position.x, this.position.y)
    }
  
    private animateFrames() {
        this.position.x += 10
    }
  
    public update() {
        requestAnimationFrame(this.update)

        this.draw()
        this.animateFrames()
    }
  }
  
