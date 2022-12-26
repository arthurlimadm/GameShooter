import { Sprite } from "./Sprite";
import { IPosition } from "../types/IPosition";
import { ISize } from "../types/ISize";

  export class Bird extends Sprite{
    image:HTMLImageElement

    constructor(context:CanvasRenderingContext2D, imageSrc:string, position:IPosition, size:ISize){
        super(context, imageSrc, position, size)

        this.context = context
        this.size = {
            width: 100,
            height: 100
        }
        this.image = new Image()
        this.image.src = 'https://blog.valkrysa.com/content/images/2017/11/bird-flap-animation.gif'
    }

    public render(){
        //alterar src da imagem 
        this.position.x += 5
        this.context.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
    }
}
  