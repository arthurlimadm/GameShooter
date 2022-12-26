import { Bird } from "../entities/Bird";
import { Sprite } from "../entities/Sprite";

export const GenerateRandomEnemies = (context:CanvasRenderingContext2D):Sprite=>{
    const {width, height} = window.screen

    return new Bird(context, '', {x: Math.random() * width, y: Math.random() * height / 2}, {width: 100, height: 100})
    //return new Bird()
}
