import { IGyroscope } from "../types/gyroscope"
import { AlphaToX, BetaToY } from "./GetAlphaandBetaValues"
import { Sprite } from "../entities/Sprite"
import { IPosition } from "../types/IPosition"

export const AnimateCanvas = (context:CanvasRenderingContext2D, gyroscope: IGyroscope, shooted:IPosition | false, Sprites: Sprite[]):Sprite[]=>{

    //Gerar Mira
    const newAim = new Sprite(context, 'https://svgsilh.com/svg/311145.svg', {x: Math.floor(AlphaToX(gyroscope.alpha)), y: BetaToY(gyroscope.beta)}, {width: 50, height: 50})
    Sprites[0] = newAim

    //Limpar Canvas para nova renderização
    context.fillStyle = 'white'
    context.clearRect(0,0,window.screen.width, window.screen.height)

    //Renderizar efetivamente os Sprites na tela
    Sprites.map((sprite, index)=>{

        //verificar se usurario atirou em algum
        if(
            shooted 
            && sprite.position.x + sprite.size.width === shooted.x
            && sprite.position.y === shooted.y
            && index !== 0
        ){
            console.log('user shooted on a Bird!')
            sprite.remove()
        }

        sprite.render()

        return sprite;

    })

    return Sprites;
}
