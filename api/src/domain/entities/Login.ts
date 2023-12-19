import { type ILogin } from '../../types/global'
import { LoginValidation } from '../utils/validation'
export const Login = ({ email, password }: ILogin): ILogin => {
  LoginValidation({ email, password })
  return { email, password }
}
