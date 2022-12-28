import {useRef, useEffect, useState} from 'react'
import SocketIO from '../../config/socketio.config'
import {AiOutlineLoading} from 'react-icons/ai'
import {GiPistolGun} from 'react-icons/gi'
import { IGyroscope } from '../../types/gyroscope'
import { canvasConfig } from '../../helpers/CanvasConfig'
import { AnimateCanvas } from '../../helpers/AnimateCanvas'
import { IPosition } from '../../types/IPosition'
import { AlphaToX, BetaToY } from '../../helpers/GetAlphaandBetaValues'
import { Sprite } from '../../entities/Sprite'
import { GenerateRandomEnemies } from '../../helpers/GenerateRandomEnemies'

export const Game = ()=>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [link, setLink] = useState<null | string>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [gyroscope, setGyroscope] = useState<IGyroscope>({alpha: 0, beta: 0, gamma: 0})
    const [shooted, setShooted] = useState<IPosition | false>(false)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [sprites, setSprites] = useState<Sprite[]>([])

    SocketIO.socket.connect()

    useEffect(()=>{

        SocketIO.socket.on('getLink', (id:string)=> {
            setLink(`https://gameshooterts.netlify.app/${id}`)
        })

        SocketIO.socket.on('MobileConnected', ()=>{
            setIsConnected(true)
        })

        SocketIO.socket.on('MobileMoved', (data:IGyroscope)=>{
            setGyroscope(data)
        })

        SocketIO.socket.on('Shooted', (data:IGyroscope)=>{
            setShooted({x: (Math.floor(AlphaToX(data.alpha))) + 25, y: (BetaToY(data.beta)) + 25})
        })
        
        //eslint-disable-next-line
    }, [SocketIO.socket])

    useEffect(()=> {

        const canvas = canvasRef.current;
        if(!canvas){
            return;
        }
        const context = canvas.getContext('2d');
        if(!context){
          return;
        }

        setContext(context)
        canvasConfig(canvas, context) 

        if(context){
            if(shooted){
                setSprites(AnimateCanvas(context, gyroscope, shooted, sprites))
                setShooted(false)
            }else{
                setSprites(AnimateCanvas(context, gyroscope, false, sprites))
            }
        }

        //eslint-disable-next-line
    }, [gyroscope, shooted])

    useEffect(() => {
        if(context){
            const interval = setInterval(() => {
                const newSprites = sprites
                newSprites.push(GenerateRandomEnemies(context))  
                setSprites(newSprites) 
            }, 4000);
            return () => clearInterval(interval);
        }
        //eslint-disable-next-line
    }, [context]);

    return (<> 
    {isConnected ? <canvas ref={canvasRef} id='canvas' className={`w-screen h-screen bg-[url('https://img.itch.zone/aW1nLzI1OTYzMTcuZ2lm/original/C4h3cc.gif')] bg-cover`}/> 
    : (<>
        <div className="flex items-center justify-center w-screen h h-screen text-center flex-col">
            <h1 className='text-[30px] m-11'>Enter the link below to start the game:</h1>
            <p>{link ? (<>Join this New Link ON YOUR MOBILE To Connect your TRÊS OITÃO <GiPistolGun className='w-14 h-14 m-auto'/>  <br/>
            <a href={link} className='text-blue'>{link}</a></>) : (<>LOADING... <AiOutlineLoading/></>)}</p>
        </div>
    </>)}
    </>)
}