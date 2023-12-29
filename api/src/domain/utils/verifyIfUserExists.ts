import { prisma } from "../../infrastructure/database/adapter.prisma";
import { IMessageRequest } from "../../types/global";

/**
 *@param userIds - are the user that are verified his existence
 *@returns Promise<Void>
 *@throws before the end the for ,  the reason for this is reduce iteration and optimize execution times.
 */
export const verifyUsersExists = async (userIds: IMessageRequest): Promise<void> => {
  for (const key in userIds) {
    const findUserExists = await prisma.user.findUnique({
      where: {
        id: userIds[key as keyof IMessageRequest]
      }
    })
    if (!findUserExists) throw new Error('User not exists, Access denied. Line 12 verifyUsersExists.')
  }

}
