# GameShooterTS

### Introduction

This is a Game Prototype built where you have to shoot on Ghosts flying on the screen.
But you can controll the Aim with your own Phone.

When You enter the website, it's generated a unique Link with an ID to you, open it on your phone and play!

### Gyroscope

The Smartphone Gyroscope functions based on three axis:

![https://miro.medium.com/max/862/1*gkiruUauYUO6mnGeoGEgMQ.jpeg](https://miro.medium.com/max/862/1*gkiruUauYUO6mnGeoGEgMQ.jpeg)

- Alpha
- Beta
- Gamma

Alpha is the X Axis on a Cartesian Plan
Beta is the Y Axis on a Cartesian Plan
Gamma doesnt Exists on a Cartesian Plan, it's your phone rotation on z axis. Because this, Gamma wasnt used here.]

### How The Game Works

The backend only functions as an orquestrator here, just validating info and passing information from the Mobile to the Game and vice-versa.

## 1. First, I generated a Link to the user connect it's Smartphone

When the user connects, it's emitted the event 'connection' to the Backend, and it sends an id to the user (wich is equal to the socket id, that allows us to identify the user), this ID is the Handler of the connection, every event emitted is recognized by it.

Every event emitted by the phone, it passes the ID generated from the browser as a Property called userID:

``` ts
    socket.on('MobileMove', (data: any)=>{
        //userID property is equal to the socketID of the correspondent browser
        this.io.to(data.userID).emit('MobileMoved', data)
    })
```

## 2. Verify if User Accessed the Link on a Smartphone

I created a Function that verify if user is Acessing the Link from a Mobile Device.

``` ts 
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
            
    export const verify = toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
    })
```

## 3. Catching the Gyroscope Information

When you access a website with your SmartPhone, the browser catches your Gyroscope information.

I could access the data catched on it by the 'deviceorientation' event from the browser and catch the alpha, beta and gamma variables by the callback function.

``` ts
function orientation(event:any){
        data.current = {
            userID: id,
            alpha: event.alpha, 
            beta: event.beta, 
            gamma: event.gamma
        }

        if(data.current.alpha !== null){
            SocketIO.socket.emit('MobileMove', data.current)
        }
    }

    if(window.DeviceOrientationEvent){
        window.addEventListener("deviceorientation", orientation, false);
    }else{
        alert("DeviceOrientationEvent is not supported");
    }

```

All this data is catched from the mobile device and sent on real time communication to the browser.

## 4. Drawing on the Screen

I just translated the data from Gyroscope to cordinates on a HTML Canvas Element.

To Translate the Alpha and Beta to X and Y values, i created a Helper function that stores the calculus:

``` ts
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

```

I have reached this numbers and calculus just by trial and error and I just Dont Know how it Functions haha 🤷‍♀️


## 5. Displaying the Game

Catched the data, I created an Array that stores our actual Sprites (sprites are  objects of the class sprite, that receives a context and has the 'render' function, that draw it's image on the canvas).

Every time the component is re-rendered, the function animateCanvas is called, this function updates the Aim Object with the new position of the Gyroscope, clears the canvas and percurs the sprites array acessing the update method of each one.

``` ts
export const AnimateCanvas = (
        context:CanvasRenderingContext2D, 
        gyroscope: IGyroscope, 
        shooted:IPosition | false, 
        game: IGame
    ):IGame=>{

    const newAim = new Sprite(context, 'https://svgsilh.com/svg/311145.svg'
    ,{x: Math.floor(AlphaToX(gyroscope.alpha)), y: BetaToY(gyroscope.beta)}
    ,{width: 50, height: 50})
    game.sprites[0] = newAim

    context.fillStyle = 'white'
    context.clearRect(0,0,window.screen.width, window.screen.height)

    game.sprites.map((sprite, index)=>{
        sprite.render()
        return sprite;
    })


    return game;
}

``` 

After all the process, the function returns the new Game State, that is stored again in the game:

``` ts
    const [game, setGame] = useState<IGame>({points: 0, sprites: []})

    setGame(AnimateCanvas(context, gyroscope, shooted, game))
```

## 6. Shooting!

When the user on Mobile Shoots, it emmits an event called 'Shoot' and send and object containing the info of Gyroscope to the Browser.

When Receiving it on browser we set a state Called 'Shooted' as the object with X and Y values.

Every Screen Rendering, it passes or the Shooted as the Object or 'false', if the shooted is true, the animation funciton verifies if the shoot colided with an Enemy:

``` ts
game.sprites.map((sprite, index)=>{
        if(
            //Colision Verification!
            shooted 
            && shooted.x > sprite.position.x
            && shooted.x < sprite.position.x + sprite.size.width
            && shooted.y > sprite.position.y
            && shooted.y < sprite.position.y + sprite.size.height
            &&index !== 0
        )
         {
            console.log('Shooted on a Ghost!')

            //Removing Sprite shooted from the sprites array
            game.sprites.filter((ghost)=> ghost.position !== sprite.position)

            //Adding game Points
            game.points += 1

            sprite.remove()
        }
        sprite.render()
        return sprite;

    })
``` 
