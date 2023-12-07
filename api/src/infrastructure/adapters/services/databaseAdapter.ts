import { prisma } from '../../adapters/Input/prisma/adapter.prisma'

export const doesEmailExists = async (email: string): Promise<boolean> => {
  const emailExists = await prisma.user.findUnique({ where: { email } })
  if (emailExists !== null) throw new Error('Email already exists')
  return false
}
