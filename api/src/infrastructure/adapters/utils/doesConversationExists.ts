import { IMessageRequest } from "../../../types/global";
import { findConversationById } from "../services/find_conversation_by_id";
import { Conversation } from "@prisma/client";
export const doesConversationExists = async ({ senderId, receiverId }: IMessageRequest): Promise<Conversation | null> => {
  const doesConversationExists = await findConversationById({ senderId, receiverId })
  if (doesConversationExists === null || doesConversationExists === undefined) return null
  return doesConversationExists
}
