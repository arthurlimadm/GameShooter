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
        alpha: 200,
        beta: 200,
        gamma: 0
    })

    SocketIO.socket.connect()


    useEffect(():any=> {
        SocketIO.socket.on('getLink', (id:string)=> {
            setLink(`http://localhost:3000/${id}`)
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

        context.fillStyle = 'white'
        context.clearRect(0 , 0 , canvas.width, canvas.height)
        
        const image = document.createElement('img')
        image.src = 'https://www.svgrepo.com/show/125526/weapon-crosshair.svg'

        if(gyroscope.alpha > 300){
            context.fillStyle = 'black'
            context.drawImage(image, canvas.width - (gyroscope.alpha - 311) * 2.5, -2.5 * gyroscope.beta + canvas.height/2, 10, 10)
        }else{
            context.fillStyle = 'black'
            context.drawImage(image,-3* gyroscope.alpha + canvas.width/2, -2.5 * gyroscope.beta + canvas.height/2, 10, 10)
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