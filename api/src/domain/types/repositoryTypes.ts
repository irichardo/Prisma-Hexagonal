import { type User } from '@prisma/client'

export interface IGetAllUsers {
  totalUsers: number
  users: personWithOutPassword[]
}

type personWithOutPassword = Omit<User, 'password'>
