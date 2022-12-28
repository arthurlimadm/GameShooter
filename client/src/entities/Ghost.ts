import { Sprite } from "./Sprite";
import { IPosition } from "../types/IPosition";
import { ISize } from "../types/ISize";
import ghostDeathSound from '../assets/ghost.mp3'

  export class Ghost extends Sprite{
    image:HTMLImageElement
    framesIndex:number
    isAlive:boolean

    constructor(context:CanvasRenderingContext2D, imageSrc:string, position:IPosition, size:ISize){
        super(context, imageSrc, position, size)

        this.context = context
        this.size = {
            width: 175,
            height: 100
        }
        this.image = new Image()
        this.image.src = 'https://cdn.gamedevmarket.net/wp-content/uploads/20191203195707/80446f3cd96a9d047e5bdba233c1c82f83f69d29.gif'
        this.framesIndex = 0
        this.isAlive = true
    }

    public remove():void {
        this.image.src = ''
        this.context.clearRect(this.position.x, this.position.y, this.size.width, this.size.height)
        this.isAlive = false
        this.position = {x: 10000000, y: 1000000}
        this.render = ()=>{
        }
        var audio = new Audio(ghostDeathSound);
        audio.play();
    }

    public render():void {

        if(this.isAlive){
            this.position.x += 5
            if(this.position.x < window.screen.width && this.position.y < window.screen.height){
    
                this.framesIndex += 1
    
                if(this.framesIndex > 20){
                    this.framesIndex = 0
                }
    
                if(this.framesIndex > 10){
                    this.position.y -= Math.random() * 5
                }else{
                    this.position.y += Math.random() * 5
                }
    
                this.context.drawImage(
                    this.image, 
                    this.position.x, this.position.y, 
                    this.size.width, this.size.height
                )
    
            }
        }
        
    }
}
