import { type IMessageRequest } from '../../../types/global'
import { type Conversation } from '@prisma/client'
import { prisma } from '../../database/adapter.prisma'

export const createConversation = async ({ senderId, receiverId }: IMessageRequest): Promise<Pick<Conversation, 'id'>> => {
  const conversation = await prisma.conversation.create({
    data: {
      name: 'Default',
      participants: { connect: [{ id: senderId }, { id: receiverId }] }
    }
  })
  return {
    id: conversation.id
  }
}
