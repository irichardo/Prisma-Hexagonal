import type { Express } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { type RouteVersion, type RouteStructure } from '../../types/types'
import MessageRepository from '../../../domain/repositories/createMessageRepository'

const { PORT } = process.env
const messageRepository = new MessageRepository()

const implementSocketIoClient = (server: Express, route: RouteStructure[], version: RouteVersion): void => {
  const serverListen = createServer(server)
  const io = new Server(serverListen, {
    cors: {
      origin: 'http://localhost:3100',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  io.on('connection', (socket: any) => {
    console.log('a user connected')
    socket.on('join', (message: any) => {
      messageRepository.sendMessage(message)
        .then((result) => {
          console.log('message sent', result)
          io.emit('message', result)
        })
        .catch((error) => { console.log(error) })
      // socket.emit('message', message)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  route.forEach(({ path, router }) => {
    console.log(`/api/${version}${path}`)
    server.use(`/api/${version}${path}`, router)
  })
  serverListen.listen(PORT, () => {
    console.log('Server is running in Port:', PORT)
  })
}

export default implementSocketIoClient
