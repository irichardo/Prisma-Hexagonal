import { type Request, type Response } from 'express'
import UserRepository from '../../../../domain/repositories/createUserRepository'
import { getUserInstance } from '../../../../domain/services/createUserService'
import { type User } from '../../../../types/global'

const userRepository = new UserRepository()

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email, userName }: Omit<User, 'id'> = req.body
  if (name === undefined || typeof name !== 'string') {
    res.status(400).json({ message: 'Invalid Username' })
  }
  if (password === undefined || typeof password !== 'string') {
    res.status(400).json({ message: 'Invalid Password' })
  }
  if (email === undefined || typeof email !== 'string') {
    res.status(400).json({ message: 'Invalid Email' })
  }
  if (userName === undefined || typeof userName !== 'string') {
    res.status(400).json({ message: 'Invalid Username' })
  }
  try {
    const user: User = await getUserInstance(req.body)
    const id = await userRepository.createUser(user)
    res.status(201).send(id)
  } catch (err: any) {
    console.error(err.message)
    res.status(500).json({ message: err.message })
  }
}
