import { type User } from '../../types/global'

enum Datatype {
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  USERNAME = 'USERNAME'
}

type UserWithoutSensibleData = Omit<User, 'userName' | 'password'>

interface IUserRepository {
  getUserById: (id: number) => Promise<UserWithoutSensibleData>
  createUser: (userData: User) => Promise<{ id: number }>
  getAllUsers: () => void
}

export { Datatype, type IUserRepository, type UserWithoutSensibleData }
