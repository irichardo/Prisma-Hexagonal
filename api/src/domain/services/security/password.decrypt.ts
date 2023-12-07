import bcrypt from 'bcryptjs'
import { type userSecurity } from '../../types/index.types'
export const passwordDecrypt = async ({ password, hashedPassword }: userSecurity): Promise<boolean> => {
  const verifyPassword = await bcrypt.compare(password, hashedPassword)
  return verifyPassword
}
