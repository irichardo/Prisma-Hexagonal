import { type TLogin } from '../../types/findUserByEmailTypes'
import { prisma } from '../Input/prisma/adapter.prisma'

/**
 * @param email
 * @returns user with password, for verify with password decrypted.
 * @throws If User Not found Or User Not Exist.
 * @example
 * ```ts
 * const user = await findUserByEmail('XXXXXXXXXXXXXXX')
 * ```
 * @example
 * ```ts
 * try {
 *   const user = await findUserByEmail('XXXXXXXXXXXXXXX')
 * }
*/

export const findUserByEmail = async (email: string): Promise<TLogin & { password: string }> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      friends: { select: { id: true, name: true, role: true } },
      conversations: { include: { participants: { select: { id: true, name: true } } } }
    }
  })
  if (user === null || user === undefined) throw new Error('User not found, use other Email')
  console.log(user.conversations[0])
  return user
}
