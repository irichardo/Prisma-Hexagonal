import { type Role } from '@prisma/client'

interface User {
  id?: number
  userName: string
  name: string
  email: string
  password: string
  role: Role
}

interface IMessageRequest {
  senderId: number,
  receiverId: number
}

interface ILogin {
  email: string
  password: string
}

export type {
  User,
  ILogin,
  IMessageRequest
}
