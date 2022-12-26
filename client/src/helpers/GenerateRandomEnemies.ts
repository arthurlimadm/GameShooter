import { Sprite } from "../entities/Sprite";

export const GenerateRandomEnemies = (context:CanvasRenderingContext2D):Sprite=>{
    const {width, height} = window.screen

    return new Sprite(context, 'https://blog.valkrysa.com/content/images/2017/11/bird-flap-animation.gif', {x: Math.random() * width, y: Math.random() * height / 2}, {width: 100, height: 100})
}
