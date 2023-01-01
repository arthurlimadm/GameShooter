import { IGyroscope } from "../types/gyroscope"
import { AlphaToX, BetaToY } from "./GetAlphaandBetaValues"
import { Sprite } from "../entities/Sprite"
import { IPosition } from "../types/IPosition"
import { IGame } from "../types/IGame"

export const AnimateCanvas = (
        context:CanvasRenderingContext2D, 
        gyroscope: IGyroscope, 
        shooted:IPosition | false, 
        game: IGame
    ):IGame=>{

    const newAim = new Sprite(context, 'https://svgsilh.com/svg/311145.svg', {x: Math.floor(AlphaToX(gyroscope.alpha)), y: BetaToY(gyroscope.beta)}, {width: 50, height: 50})
    game.sprites[0] = newAim

    context.fillStyle = 'white'
    context.clearRect(0,0,window.screen.width, window.screen.height)

    game.sprites.map((sprite, index)=>{
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
            game.sprites.filter((ghost)=> ghost.position !== sprite.position)
            game.points += 1
            sprite.remove()
        }
        sprite.render()
        return sprite;

    })


    return game;
}
