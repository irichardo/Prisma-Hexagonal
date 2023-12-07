import type { Request, Response } from 'express'
import UserRepository from '../../../../domain/repositories/createUserRepository'

const repository = new UserRepository()

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await repository.getAllUsers()
    res.status(200).send(users)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}
