import { Conversation } from "@prisma/client";
import { IMessageRequest } from "../../types/global";
import { getConversationById } from '../services/index'

export default class messageRepository {
  async getConversation(usersID: IMessageRequest): Promise<Conversation> {
    const conversation = getConversationById(usersID)
    return conversation
  }
}
