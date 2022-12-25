export const AlphaToX = (alpha: number):number=>{
    if(alpha > 150){
        return window.screen.width - (alpha - 250) * 7
    }else{
        return - 9* alpha + window.screen.width/2
    }
}

export const BetaToY = (beta:number):number=>{
    return  -9 * beta + window.screen.height/2
}