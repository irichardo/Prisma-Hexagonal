import { Conversation } from "@prisma/client"
import { findConversationById } from "../../infrastructure/adapters/services/find_conversation_by_id"

export const getConversationById = async ({ senderId, receiverId }: { senderId: number, receiverId: number }): Promise<Conversation> => {
  const conversation = await findConversationById({ senderId, receiverId })
  if (conversation === null) throw new Error("conversation not Exists")
  return conversation
}
