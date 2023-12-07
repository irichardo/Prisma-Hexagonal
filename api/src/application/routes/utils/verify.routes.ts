import type { RouteStructure, RouteVersion } from '../../types/types'
import type { Express } from 'express'

const PORT = process.env.PORT ?? 3000

const implementRoutes = (server: Express, route: RouteStructure[], version: RouteVersion): void => {
  if (route.length === 0) throw new Error("Api version doesn't exists")
  route.forEach(({ path, router }) => {
    server.use(`/api/${version}${path}`, router)
  })
  server.listen(PORT, () => {
    console.log('Server is running in Port:', PORT)
  })
}

export default implementRoutes
