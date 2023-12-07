import { type User } from '@prisma/client'
import { passwordEncrypt } from '.'
import { doesEmailExists, doesUserNameExists } from '../../infrastructure/adapters/services/index'
import { EncryptionType } from '../types/password.security'
// import { decryptPassword } from './security/password.decrypt'

/**
 * @returns encrypted or decrypted password
 * @throws if the user on Encrypted sends a used Email or Username with characters no valid
 * @throws if the user on Decrypted sends a invalid Password or Invalid Gmail
 */

type userValidationServiceType = Pick<User, 'userName' | 'password' | 'email'> & { action: EncryptionType, hashedPassword?: string }

export const userValidationService = async ({ email, password, userName, action, hashedPassword }: userValidationServiceType): Promise<string | boolean | undefined> => {
  if (action === EncryptionType.ENCRYPT) {
    const [encryptedPassword] = await Promise.all([passwordEncrypt(password), doesEmailExists(email), doesUserNameExists(userName)])
    return encryptedPassword
  }
  if (action === EncryptionType.DECRYPT && typeof hashedPassword !== 'undefined') {
    // // const [decryptedPassword] = await Promise.all([decryptPassword({ password, hashedPassword }), doesEmailExists(email), doesUserNameExists(userName)])
    // return decryptedPassword
  }
}
