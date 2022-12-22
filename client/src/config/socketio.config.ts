import io from 'socket.io-client'
import { config } from './config'

class SocketIO{
    public socket

    constructor(){
        this.socket = io(config.socketUrl)
    }
}

export default new SocketIO()