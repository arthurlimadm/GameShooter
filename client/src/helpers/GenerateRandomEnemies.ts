import { Ghost } from "../entities/Ghost";
import { Sprite } from "../entities/Sprite";  


export const GenerateRandomEnemies = (context:CanvasRenderingContext2D):Sprite=>{
    const {width, height} = window.screen

    return new Ghost(context, '', {x: Math.random() * width/2, y: Math.random() * height / 2}, {width: 100, height: 100})
}