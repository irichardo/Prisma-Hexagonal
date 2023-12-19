import type { User as UserType } from '../../types/global'
import { userValidation } from '../utils/validation'

export const User = ({ name, userName, email, password, role }: UserType): UserType => {
  userValidation({ name, userName, email, password, role })
  return {
    name,
    userName,
    email,
    password,
    role
  }
}
