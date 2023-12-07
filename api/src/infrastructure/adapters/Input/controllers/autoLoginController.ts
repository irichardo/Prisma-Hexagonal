import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserRepository from '../../../../domain/repositories/createUserRepository'
const { REFRESH_TOKEN } = process.env

interface JwtPayload {
  email: string
  password: string
}

interface IErrorContent {
  message: string
  code: number
}

interface IHashMapError {
  cookieNotExists: IErrorContent
  internalError: IErrorContent
  deniedAccess: IErrorContent
}

const errorIndex: IHashMapError = {
  cookieNotExists: { message: 'Init session again.', code: 401 },
  internalError: { message: 'internal Error', code: 500 },
  deniedAccess: { message: 'invalid token', code: 401 }
}

const userRepository = new UserRepository()

export const autoLoginController = async (req: Request, res: Response): Promise<void> => {
  try {
    // @eslint-disable-next-line
    // console.log(req.body)
    const { refresh_token } = req.body
    const jwtSecretKey = REFRESH_TOKEN ?? 'secret'
    const cookieExists = refresh_token ?? null
    if (cookieExists == null && refresh_token === undefined) throw new Error(errorIndex.cookieNotExists.message)
    if (cookieExists !== null && refresh_token !== undefined) {
      const refreshToken = refresh_token
      const { email, password } = jwt.verify(refreshToken, jwtSecretKey) as JwtPayload
      const user = await userRepository.loginUser({ email, password })
      const cookieDuration = 24 * 60 * 60 * 1000
      const userToken = { email, password }
      const token = jwt.sign(userToken, jwtSecretKey)
      res.cookie('authToken', token, { maxAge: cookieDuration, sameSite: true })
      // .status(200).send({ user, token })
      res.cookie('accessToken', token, { maxAge: cookieDuration, httpOnly: true, sameSite: true }).status(200).send({ user, token })
    }
  } catch (error: any) {
    console.error(error.message)
    let message: string = ''
    let errorCode: number = 0
    if (error.message === errorIndex.cookieNotExists.message) {
      message = errorIndex.cookieNotExists.message
      errorCode = errorIndex.cookieNotExists.code
    } else if (error.message === errorIndex.internalError.message) {
      message = errorIndex.internalError.message
      errorCode = errorIndex.internalError.code
    } else if (error.message === errorIndex.deniedAccess.message) {
      message = errorIndex.deniedAccess.message
      errorCode = errorIndex.deniedAccess.code
    }
    res.status(errorCode).send({ message })
  }
}
