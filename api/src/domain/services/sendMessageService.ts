import { type Message } from '@prisma/client'
import { createMessage } from '../../infrastructure/adapters/services/addMessageToConversation'
import { createConversation } from '../../infrastructure/adapters/services/createConversation'
import { findConversationById } from '../../infrastructure/adapters/services/find_conversation_by_id'
import type { IsendMessageStructure } from '../types/index.types'
import { verifyUsersExists } from '../utils/verifyIfUserExists'
/**
 * @param (number) SenderId - user Id that gimme the posibily of verify his existence.
 * @param (number) receiverId - same That SenderId.
 * @param (string) Content - It's the message that was be added into de coversation for save.
 */

export const sendMessageService = async ({ senderId, receiverId, content }: IsendMessageStructure): Promise<Message> => {
  await verifyUsersExists({ senderId, receiverId })
  const conversation = await findConversationById({ senderId, receiverId })
  if (conversation !== null) return await createMessage({ senderId, content, conversationId: conversation.id })
  // Check if it's necessary put that else in this line
  else {
    const createdConversation = await createConversation({ senderId, receiverId })
    const createFirstMessage = await createMessage({ senderId, content, conversationId: createdConversation.id })
    return createFirstMessage
  }
}
