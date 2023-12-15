import { Conversation } from '@prisma/client'
import { prisma } from '../../adapters/Input/prisma/adapter.prisma'
import { IMessageRequest } from '../../../types/global'

export const findConversationById = async ({ senderId, receiverId }: IMessageRequest): Promise<Conversation | null> => {
  const getConversation = await prisma.conversation.findFirst({
    where: {
      AND: [{ participants: { some: { id: senderId } } }, { participants: { some: { id: receiverId } } }]
    },
    include: { messages: true }
  })
  return getConversation
}
