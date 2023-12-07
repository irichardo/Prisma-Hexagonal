import { type Request, type Response } from 'express'

export const logoutController = (req: Request, res: Response): void => {
  try {
    res
      .cookie('access_token', '', { expires: new Date(1), path: '/' })
      .cookie('refresh_token', '', { expires: new Date(1), path: '/' })
      .status(200).end()
      // .redirect('/')
  } catch (err) {
    console.log(200)
  }
}
