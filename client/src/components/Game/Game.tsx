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

        // Set the "actual" size of the canvas
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Scale the context to ensure correct drawing operations
        context.scale(dpr, dpr);

        // Set the "drawn" size of the canvas
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const image = document.createElement('img')
        image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTjW7fEhnJdCb0YhIHyeeAXwX1qSCL-bCkQ&usqp=CAU'

        
        /*context.fillStyle = 'white'
        context.clearRect(0, 0, canvas.width, canvas.height)

        const wizard = document.createElement('img')
        wizard.src="https://art.pixilart.com/150e4789dc619cf.png"

        context.drawImage(wizard, 10, 10, 256, 256)*/

        let birdPosition = 1;

        const bird = document.createElement('img')
        bird.src="https://blog.valkrysa.com/content/images/2017/11/bird-flap-animation.gif"
        let birdHegight = Math.random() * canvas.height

        setInterval(()=>{
            birdHegight = Math.random() * canvas.height
        }, 2000)

        setInterval(()=>{

            context.fillStyle = 'white'
            context.clearRect(0, 0, canvas.width, canvas.height)
            birdPosition += 10
            context.drawImage(bird, birdPosition, birdHegight, 50, 50)

        }, 50)


        
        

        if(gyroscope.alpha > 300){
            context.drawImage(image, canvas.width - (gyroscope.alpha - 311) * 2.5, -2.5 * gyroscope.beta + canvas.height/2, 50, 50)
        }else{
            context.drawImage(image,-3* gyroscope.alpha + canvas.width/2, -2.5 * gyroscope.beta + canvas.height/2, 50, 50)
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
