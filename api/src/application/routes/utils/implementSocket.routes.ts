import type { Express } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { type RouteVersion, type RouteStructure } from '../../types/types'

const { PORT } = process.env

const implementSocketIoClient = (server: Express, route: RouteStructure[], version: RouteVersion): void => {
  const serverListen = createServer(server)
  const io = new Server(serverListen, {
    cors: {
      origin: 'http://localhost:3100',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
  io.on('connection', (socket) => {
    console.log('Socket connected')
    socket.on('sendMessage', async (message) => {
      console.log(message)
      io.emit('message', message)
    })
    socket.on('sendMatrix', async (matrix) => {
      io.emit('matrix', matrix)
    })
    socket.on('disconnect', () => {
      console.log('Socket disconnected')
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
