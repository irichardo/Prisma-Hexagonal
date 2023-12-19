import { RouteVersion, type IRoutes } from '../types/types'
import user from './user.routes'
import messages from './messages.routes'
import socketRouter from './socket.routes'
import type { Express } from 'express'
import implementRoutes from './utils/verify.routes'
import implementSocketIoClient from './utils/implementSocket.routes'

const routes: IRoutes = {
  v1: [{
    path: '/users',
    router: user
  },
  {
    path: '/messages',
    router: messages
  }
  ],
  v2: [{
    path: '/socket',
    router: socketRouter
  }]
}

const configRoutes = (server: Express, version: RouteVersion): void => {
  const apiVersion = routes[version] ?? []
  if (version === RouteVersion.v1) implementSocketIoClient(server, apiVersion, version)
  if (version === RouteVersion.v2) implementRoutes(server, apiVersion, version)
}

export default configRoutes
