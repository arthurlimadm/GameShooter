import {useRef, useEffect, useState} from 'react'
import SocketIO from '../../config/socketio.config'
import {AiOutlineLoading} from 'react-icons/ai'
import {GiPistolGun} from 'react-icons/gi'
import { IGyroscope } from '../../types/gyroscope'
import { AlphaToX, BetaToY } from '../../helpers/GetAlphaandBetaValues'
import { canvasConfig } from '../../helpers/CanvasConfig'

export const Game = ()=>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [ link, setLink] = useState<null | string>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [gyroscope, setGyroscope] = useState<IGyroscope>({alpha: 0,beta: 0,gamma: 0})

    SocketIO.socket.connect()

    useEffect(():any=>{
        
        SocketIO.socket.on('getLink', (id:string)=> {
            setLink(`https://gameshooterts.netlify.app/${id}`)
        })

        SocketIO.socket.on('MobileConnected', ()=>{
            setIsConnected(true)
        })

        SocketIO.socket.on('MobileMoved', (data:IGyroscope)=>{
            setGyroscope(data)
        })

        return ()=> SocketIO.socket.off('MobileConnected') 
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
        canvasConfig(canvas, context) 

        const image = new Image()
        image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTjW7fEhnJdCb0YhIHyeeAXwX1qSCL-bCkQ&usqp=CAU'

        context.fillStyle = 'white'
        context.clearRect(0,0,canvas.width, canvas.height)
        context.drawImage(image, AlphaToX(gyroscope.alpha), BetaToY(gyroscope.beta), 50, 50)

    }, [gyroscope])

    return (<>
    {isConnected ? <canvas ref={canvasRef} className={`w-screen h-screen`}/> 
    : (<>
        <div className="flex items-center justify-center w-screen h h-screen text-center flex-col">
            <h1 className='text-[30px] m-11'>Enter the link below to start the game:</h1>
            <p>{link ? (<>Join this New Link ON YOUR MOBILE To Connect your TRÊS OITÃO <GiPistolGun className='w-14 h-14 m-auto'/>  <br/>
            <a href={link} className='text-blue'>{link}</a></>) : (<>LOADING... <AiOutlineLoading/></>)}</p>
        </div>
    </>)}
    </>)
}
