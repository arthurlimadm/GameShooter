import { Server, Socket } from "socket.io";

export class SocketIO{
    protected io:Server;

    constructor(io: Server){
        this.io = io;
        this.configEvents()
    }

    private configEvents(){
        this.io.on('connection', (socket:Socket)=>{
            socket.emit('getLink', socket.id)

            socket.on('MobileControllerConnect', (id: string):void=>{
                this.io.to(id).emit('MobileConnected')
            })

            socket.on('MobileMove', (data: any)=>{
                this.io.to(data.userID).emit('MobileMoved', data)
            })

            socket.on('Shoot', (data)=>{
                this.io.to(data.userID).emit('Shooted', data)
            })
        })
    }
}