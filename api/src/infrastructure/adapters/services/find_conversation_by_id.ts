import { type Conversation } from '@prisma/client'
import { prisma } from '../../database/adapter.prisma'
import { type IMessageRequest } from '../../../types/global'

export const findConversationById = async ({ senderId, receiverId }: IMessageRequest): Promise<Conversation | null> => {
  // const user = await prisma.user.findUnique({
  //   where: { id: senderId },
  //   include: {
  //     conversations: {
  //       include: {
  //         participants: true
  //       }
  //     }
  //   }
  // })
  // if (user === null) throw new Error('User not exists')
  // const conversationConAmigo = user.conversations.find(conversation => conversation.participants.some(participant => participant.id === receiverId))
  // console.log(conversationConAmigo)
  const getConversation = await prisma.conversation.findFirst({
    where: {
      AND: [{ participants: { some: { id: senderId } } }, { participants: { some: { id: receiverId } } }]
    },
    include: { messages: true }
  })
  return getConversation
}
