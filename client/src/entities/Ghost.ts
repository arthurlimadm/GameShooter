import { Sprite } from "./Sprite";
import { IPosition } from "../types/IPosition";
import { ISize } from "../types/ISize";


  export class Ghost extends Sprite{
    image:HTMLImageElement
    frames:string[]
    framesIndex:number

    constructor(context:CanvasRenderingContext2D, imageSrc:string, position:IPosition, size:ISize){
        super(context, imageSrc, position, size)

        this.context = context
        this.size = {
            width: 175,
            height: 100
        }
        this.image = new Image()
        this.frames = ['https://cdn.gamedevmarket.net/wp-content/uploads/20191203195707/80446f3cd96a9d047e5bdba233c1c82f83f69d29.gif', 'https://i.ibb.co/hsHfVP1/2-removebg-preview.png', 'https://i.ibb.co/VJ6pg9w/3-removebg-preview.png', 'https://i.ibb.co/2Kq9S76/4-removebg-preview.png', 'https://i.ibb.co/zJ6tCmW/5-removebg-preview.png', 'https://i.ibb.co/ZGJTXF7/6-removebg-preview.png']
        this.framesIndex = 0

        this.image.src = this.frames[this.framesIndex]
    }

    render(){

        this.position.x += 5
        if(this.position.x < window.screen.width && this.position.y < window.screen.height){

            this.framesIndex += 1

            if(this.framesIndex > 20){
                this.framesIndex = 0
            }

            if(this.framesIndex > 10){
                this.position.y -= 5
            }else{
                this.position.y += 5
            }

            this.context.drawImage(
                this.image, 
                this.position.x, this.position.y, 
                this.size.width, this.size.height
            )

        }
    }
}
