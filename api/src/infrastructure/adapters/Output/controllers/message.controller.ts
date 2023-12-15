import { Request, Response } from "express"
import { findConversationById } from "../../services/find_conversation_by_id"

export const getAllMessageControllerBeetweenUsers = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body
  try {
    if (senderId === null || senderId === undefined || typeof senderId !== 'number') throw new Error("Datos no validos")
    if (receiverId === null || receiverId === undefined || typeof receiverId !== 'number') throw new Error("Datos no validos")
    const getConversation = await findConversationById({ senderId, receiverId })
    if (getConversation === null) throw new Error("Esta conversacion no existe")
    res.status(200).send(getConversation)
  }
  catch (error: any) {
    console.error(error.message)
    res.sendStatus(203)
  }
}
