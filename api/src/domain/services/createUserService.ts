import { Role } from '@prisma/client'
import { type User as userType } from '../../types/global'
import { User } from '../entities/User'

export const getUserInstance = async (userData: userType): Promise<userType> => {
  const user: userType = {
    name: userData.name,
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    role: userData.role
  }
  if (userData.role === Role.USER) {
    return User(user)
  }
  // if (userData.role === userRole.ADMIN) {
  //   return userValidation(user)
  // }
  throw new Error('Invalid Role')
}
