import type { User } from '@prisma/client'
import { prisma } from '../../database/adapter.prisma'

export const doesUserExists = async (id: number): Promise<User> => {
  const existId = await prisma.user.findUnique({ where: { id } })
  if (existId === undefined || existId === null) throw new Error('id is not found')
  return existId
}
