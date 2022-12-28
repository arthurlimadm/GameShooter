import { IGyroscope } from "../types/gyroscope"
import { AlphaToX, BetaToY } from "./GetAlphaandBetaValues"
import { Sprite } from "../entities/Sprite"
import { IPosition } from "../types/IPosition"

export const AnimateCanvas = (context:CanvasRenderingContext2D, gyroscope: IGyroscope, shooted:IPosition | false, Sprites: Sprite[]):Sprite[]=>{

    const newAim = new Sprite(context, 'https://svgsilh.com/svg/311145.svg', {x: Math.floor(AlphaToX(gyroscope.alpha)), y: BetaToY(gyroscope.beta)}, {width: 50, height: 50})
    Sprites[0] = newAim

    context.fillStyle = 'white'
    context.clearRect(0,0,window.screen.width, window.screen.height)

    Sprites.map((sprite, index)=>{
        if(
            shooted 
            && shooted.x > sprite.position.x
            && shooted.x < sprite.position.x + sprite.size.width
            && shooted.y > sprite.position.y
            && shooted.y < sprite.position.y + sprite.size.height
            &&index !== 0
        )
         {
            console.log('Shooted on a Ghost!')
            Sprites.filter((ghost)=> ghost.position !== sprite.position)
            sprite.remove()
        }
        sprite.render()
        return sprite;

    })

    return Sprites;
}
