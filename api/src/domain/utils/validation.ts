import type { User } from '../../types/global'
const regex = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  NAME: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/
}

enum Data {
  NAME = 'NAME',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
  EMAIL = 'EMAIL'
}

/**
 * @description Uses For Validate with regex if data is valid
 * @param {name, userName, password, email, role} from User
 * @returns void
 */

export const userValidation = ({ name, userName, password, email, role }: User): User => {
  verifyData(name, Data.NAME)
  verifyData(userName, Data.USERNAME)
  verifyData(password, Data.PASSWORD)
  verifyData(email, Data.EMAIL)
  return {
    name,
    userName,
    email,
    password,
    role
  }
}

const verifyData = (data: string, type: Data): void => {
  if (!regex[type].test(data)) throw new Error(`Invalid ${type}`)
}

export const LoginValidation = ({ email, password }: { email: string, password: string }): void => {
  verifyData(email, Data.EMAIL)
  verifyData(password, Data.PASSWORD)
}
