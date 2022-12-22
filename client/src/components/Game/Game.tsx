import {useRef, useEffect, useState} from 'react'
import SocketIO from '../../config/socketio.config'
import {AiOutlineReload} from 'react-icons/ai'
import {GiPistolGun} from 'react-icons/gi'
import { IGyroscope } from '../../types/gyroscope'

export  const Game = ()=>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [ link, setLink] = useState<null | string>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [gyroscope, setGyroscope] = useState<IGyroscope>({
        alpha: 0,
        beta: 0,
        gamma: 0
    })

    SocketIO.socket.connect()

    useEffect(():any=> {
        SocketIO.socket.on('getLink', (id:string)=> {
            setLink(`https://gameshooterts.netlify.app/${id}`)
        })

        return ()=> SocketIO.socket.off('getLink') 
        //eslint-disable-next-line
      }, [])

      useEffect(():any=>{
        SocketIO.socket.on('MobileConnected', ()=>{
            console.log('Connected my phone!')
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

        const dpr = window.devicePixelRatio;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        context.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const image = document.createElement('img')
        image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTjW7fEhnJdCb0YhIHyeeAXwX1qSCL-bCkQ&usqp=CAU'

        context.fillStyle = 'white'
        context.clearRect(0,0,canvas.width, canvas.height)

        if(gyroscope.alpha > 150){
            context.drawImage(image, canvas.width - (gyroscope.alpha - 310) * 7, -9 * gyroscope.beta + canvas.height/2, 50, 50)
        }else{
            context.drawImage(image,-8* gyroscope.alpha + canvas.width/2, -9 * gyroscope.beta + canvas.height/2, 50, 50)
        }

    }, [gyroscope])

    return (<>
        {isConnected ? <canvas ref={canvasRef}
        className={`w-screen h-screen`}
        /> : (<>
            <div className="flex items-center justify-center w-screen h h-screen text-center flex-col">
                <h1 className='text-[30px] m-11'>Enter the link below to start the game:</h1>

                <p>{link ? (<>Join this New Link ON YOUR MOBILE To Connect your TRÊS OITÃO <GiPistolGun className='w-14 h-14 m-auto'/>  <br/>
                <a href={link} className='text-blue'>{link}</a></>) : (<>To Start, refresh the page <AiOutlineReload/></>)}</p>
            </div>
        </>)}
    </>)
}
