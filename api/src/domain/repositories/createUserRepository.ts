import type { IUserRepository, IGetAllUsers } from '../types/index.types'
import { getAllUsersService, passwordEncrypt, passwordDecrypt } from '../services/index'
import { doesEmailExists, doesUserExists, doesUserNameExists, findUserByEmail } from '../../infrastructure/adapters/services/index'
import type { User } from '../../types/global'
import { prisma } from '../../infrastructure/adapters/Input/prisma/adapter.prisma'
import { type UserWithoutSensibleData } from '../types/repositoryTypes'
import { type TLogin } from '../../infrastructure/types/findUserByEmailTypes'

export default class UserRepository implements IUserRepository {
  async getAllUsers (): Promise<IGetAllUsers> {
    const allUsers = await getAllUsersService()
    return allUsers
  }

  async getUserById (userId: number): Promise<UserWithoutSensibleData> {
    const { id, email, name, role } = await doesUserExists(userId)
    return {
      id,
      email,
      name,
      role
    }
  }

  async createUser (userData: User): Promise<{ id: number }> {
    const { name, email, password, userName } = userData
    const [encryptPassword] = await Promise.all([passwordEncrypt(password), doesEmailExists(email), doesUserNameExists(userName)])
    const { id } = await prisma.user.create({ data: { name, userName, email, password: encryptPassword } })
    return {
      id
    }
  }

  async loginUser (userData: Pick<User, 'email' | 'password'>): Promise<TLogin> {
    const { email, password } = userData
    const user = await findUserByEmail(email)
    const decryptPassword = await passwordDecrypt({ password, hashedPassword: user.password })
    if (!decryptPassword) throw new Error('Wrong Password')
    const {
      id, name, role, friends, conversations
    } = user
    return {
      id,
      name,
      email,
      role,
      friends,
      conversations
    }
  }
}
