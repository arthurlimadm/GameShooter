import { IPosition } from "../types/IPosition"

export class Sprite {
    private context:CanvasRenderingContext2D
    public position:IPosition
    public size:{width:number, height:number}
    private image:HTMLImageElement

    constructor(context:CanvasRenderingContext2D, imageSrc:string, position:IPosition, size:{width:number, height:number}) {
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
        
    }
  
    public render() {
        
        this.context.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
    }
  }
  
