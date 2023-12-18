import { getConversationById } from "."
import { createMessage } from "../../infrastructure/adapters/services/addMessageToConversation"
import { createConversation } from "../../infrastructure/adapters/services/createConversation"
import type { IsendMessageStructure } from "../types/index.types"
/**
 * @param (number) SenderId - user Id that gimme the posibily of verify his existence.
 * @param (number) receiverId - same That SenderId.
 * @param (string) Content - It's the message that was be added into de coversation for save.
 */

export const sendMessageService = async ({ senderId, receiverId, content }: IsendMessageStructure): Promise<void> => {
  const conversation = await getConversationById({ senderId, receiverId })
  if (conversation !== null) await createMessage({ senderId, content, conversationId: conversation.id })
  //Check if it's necessary put that else in this line
  else {
    const createdConversation = await createConversation({ senderId, receiverId })
    await createMessage({ senderId, content, conversationId: createdConversation.id })
  }
}
