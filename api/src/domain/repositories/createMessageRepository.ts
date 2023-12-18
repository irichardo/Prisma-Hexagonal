import { Conversation } from "@prisma/client";
import { IMessageRequest } from "../../types/global";
import { getConversationById, sendMessageService } from '../services/index'
import { IMessageRepository, IsendMessageStructure } from "../types/index.types";

export default class MessageRepository implements IMessageRepository {
  async getConversation(usersID: IMessageRequest): Promise<Conversation> {
    const conversation = getConversationById(usersID)
    return conversation
  }
  async sendMessage(usersIdAndMessage: IsendMessageStructure): Promise<void> {
    await sendMessageService(usersIdAndMessage)
  }
}
