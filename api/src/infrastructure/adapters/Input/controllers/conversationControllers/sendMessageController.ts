import { Request, Response } from "express";
import MessageRepository from "../../../../../domain/repositories/createMessageRepository";

const messageRepository = new MessageRepository()

export const sendMessageController = async (req: Request, res: Response) => {
  const { senderId, receiverId, content } = req.body
  try {
    if (typeof senderId !== 'number' || typeof receiverId !== 'number') throw new Error('Invalid Id')
    if (senderId === undefined || senderId === null) throw new Error('Try again later')
    if (receiverId === undefined || receiverId === null) throw new Error('Access Denied')
    await messageRepository.sendMessage({ senderId, receiverId, content })
    res.sendStatus(200)
  }
  catch (error) {
    console.error(error)
    res.sendStatus(203)
  }
}
