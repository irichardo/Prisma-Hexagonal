import type { Request, Response } from 'express'
import UserRepository from '../../../../domain/repositories/createUserRepository'
import { Login } from '../../../../domain/entities/Login'
import jwt from 'jsonwebtoken'
const userRepository = new UserRepository()
const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const accessTokenKey = ACCESS_TOKEN ?? 'secret'
    const refreshTokenKey = REFRESH_TOKEN ?? 'secret'
    const { email, password } = req.body
    if (email === undefined || email === null) throw new Error('Invalid Email')
    if (password === undefined || password === null) throw new Error('Invalid password')
    const userValidate = Login(req.body)
    const user = await userRepository.loginUser(userValidate)
    const cookieDuration = 24 * 60 * 60 * 1000
    const userToken = { email, password }
    const refreshToken = jwt.sign(userToken, refreshTokenKey)
    const accessToken = jwt.sign(userToken, accessTokenKey)
    res
      .cookie('access_token', accessToken, { maxAge: cookieDuration, httpOnly: true, sameSite: true })
      .cookie('refresh_token', refreshToken, { maxAge: cookieDuration, sameSite: true })
      .status(200).send({ user, refreshToken })
  } catch (error: any) {
    console.error(error.message)
    res.status(401).send({ message: error.message })
  }
}
