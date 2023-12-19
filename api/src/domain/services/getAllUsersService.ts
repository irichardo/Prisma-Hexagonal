import type { User, Conversation } from '@prisma/client'
import { prisma } from '../../infrastructure/adapters/Input/prisma/adapter.prisma'
import type { IGetAllUsers } from '../types/repositoryTypes'

/**
 *  Count all users and the all users
 * @returns An Object with the count of users and all users with his friends
 * @throws Error if the users not exists.
 * @example
 * @const { countUsers, allUsers }
 */

type UserWithoutPassword = Omit<User, 'password' | 'userName'>

export const getAllUsersService = async (): Promise<IGetAllUsers> => {
  const totalUsers = await prisma.user.count()
  if (totalUsers === 0) throw new Error('Users not exists')
  const getUsers = await prisma.user.findMany({
    include: {
      friends: true,
      friendsOf: true,
      conversations: true
    }
  })
  const users = getUsers.map((users: User & { friends: UserWithoutPassword[], conversations: Conversation[] }) => {
    return {
      id: users.id,
      userName: users.userName,
      name: users.name,
      email: users.email,
      role: users.role,
      friends: users.friends,
      conversations: users.conversations
    }
  })
  return {
    totalUsers,
    users
  }
}
