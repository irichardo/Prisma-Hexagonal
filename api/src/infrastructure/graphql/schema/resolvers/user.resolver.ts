import { prisma } from '../../../database/adapter.prisma'

export const resolvers = {
  Query: {
    allUsers: async () => await prisma.user.findMany(),
    userCount: async () => await prisma.user.count()
  }
}
