import { prisma } from '../../database/adapter.prisma'
import { type Message } from '@prisma/client'

type TCreateMessage = Pick<Message, 'senderId' | 'content' | 'conversationId'>

export const createMessage = async ({ senderId, content, conversationId }: TCreateMessage): Promise<Message> => {
  const messageCreated = await prisma.message.create({
    data: {
      content,
      senderId,
      conversation: { connect: { id: conversationId } }
    }
  })
  return messageCreated
}
