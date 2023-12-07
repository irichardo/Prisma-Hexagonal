import { type Request, type Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.sendFile(process.cwd() + '/src/application/client/index.html')
})

export default router
