import { IGyroscope } from "../types/gyroscope"
import { AlphaToX, BetaToY } from "./GetAlphaandBetaValues"

export const AnimateCanvas = (canvas: any, context:any, gyroscope: IGyroscope)=>{
    const image = new Image()
    image.src = 'https://svgsilh.com/svg/311145.svg'
    context.fillStyle = 'white'
    context.clearRect(0,0,canvas.width, canvas.height)

    context.drawImage(image, Math.floor(AlphaToX(gyroscope.alpha)), Math.floor(BetaToY(gyroscope.beta)), 50, 50)

}

