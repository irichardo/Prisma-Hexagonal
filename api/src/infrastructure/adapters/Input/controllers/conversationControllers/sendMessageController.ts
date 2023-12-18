import { Request, Response } from "express";
import { findConversationById } from "../../../services/find_conversation_by_id";

export const sendMessageController = (req: Request, res: Response) => {
  const { senderId, receiverId, content } = req.body
  try {
    const conversation = findConversationById({ senderId, receiverId })
    if (conversation === null || conversation === undefined) throw new Error("Conversation not exists")

  }
  catch (error) {

  }
}
