import { prisma } from '../../../adapters/Input/prisma/adapter.prisma'

export const resolvers = {
  Query: {
    allUsers: async () => await prisma.user.findMany(),
    userCount: async () => await prisma.user.count()
  }
}
