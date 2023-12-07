import bcrypt from 'bcryptjs'

const { SALT_ROUNDS } = process.env

export const passwordEncrypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(SALT_ROUNDS))
}
