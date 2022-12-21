import express from "express"
import {createServer} from 'http'
import {Server} from 'socket.io'

import * as dotenv from 'dotenv'
import { SocketIO } from "./entities/io"
dotenv.config()

const app = express()
const httpServer = createServer(app)

const port = process.env.SERVER_PORT
const host = process.env.SERVER_HOST
const corsOriginDirectory = process.env.CORS_ORIGIN

httpServer.listen(Number(port), host, ()=> {
    console.log(`Server is Running on URL:`)
    console.log(`http://${host}:${port}`)
})

const io = new Server(httpServer, {
    cors: {
        origin: corsOriginDirectory,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

const socket = new SocketIO(io)