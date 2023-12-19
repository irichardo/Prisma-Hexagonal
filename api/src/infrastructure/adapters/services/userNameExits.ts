import { prisma } from '../../adapters/Input/prisma/adapter.prisma'

export const doesUserNameExists = async (userName: string): Promise<boolean> => {
  const verifyDoesUsernameExists = await prisma.user.count({ where: { userName } })
  if (verifyDoesUsernameExists === 1) throw new Error('Username already exists')
  return false
}
