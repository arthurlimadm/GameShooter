import { IPosition } from "../types/IPosition"
import { ISize } from "../types/ISize"

export class Sprite {
    protected context:CanvasRenderingContext2D
    protected image:HTMLImageElement
    public size:ISize
    public position:IPosition

    constructor(context:CanvasRenderingContext2D, imageSrc:string, position:IPosition, size:ISize) {
        this.context = context
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.size = size
    }
  
    public move(position:IPosition) {
        this.position = position;

        this.render()
    }

    public remove(){
        this.image.src = ''
    }
  
    public render() {
        
        this.context.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
    }
  }
  
