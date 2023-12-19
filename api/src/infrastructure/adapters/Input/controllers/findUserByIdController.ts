import { type Request, type Response } from 'express'
import UserRepository from '../../../../domain/repositories/createUserRepository'
const userRepository = new UserRepository()
export const findUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    if (id === undefined || id === null) throw new Error('id valid is required')
    const userData = await userRepository.getUserById(Number(id))
    res.status(200).send(userData)
  } catch (e: any) {
    console.error(e.message)
    res.status(400).send({ message: e.message })
  }
}
