import { Conversation, type User } from '@prisma/client'
import { IMessageRequest } from '../../types/global'

interface IGetAllUsers {
  totalUsers: number
  users: personWithOutPassword[]
}

type personWithOutPassword = Omit<User, 'password'>
type UserWithoutSensibleData = Omit<User, 'userName' | 'password'>


interface IsendMessageStructure {
  senderId: number,
  receiverId: number,
  content: string
}

interface IUserRepository {
  getUserById: (id: number) => Promise<UserWithoutSensibleData>
  createUser: (userData: User) => Promise<{ id: number }>
  getAllUsers: () => void
}

interface IMessageRepository {
  getConversation: (credentials: IMessageRequest) => Promise<Conversation>
  sendMessage: ({ senderId, receiverId, content }: IsendMessageStructure) => void
}

export type {
  IUserRepository,
  IMessageRepository,
  IGetAllUsers,
  IsendMessageStructure
}
