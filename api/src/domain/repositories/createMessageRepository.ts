import { type Message, type Conversation } from '@prisma/client'
import { type IMessageRequest } from '../../types/global'
import { getConversationById, sendMessageService } from '../services/index'
import { type IMessageRepository, type IsendMessageStructure } from '../types/index.types'

export default class MessageRepository implements IMessageRepository {
  async getConversation (usersID: IMessageRequest): Promise<Conversation> {
    const conversation = getConversationById(usersID)
    return await conversation
  }

  async sendMessage (usersIdAndMessage: IsendMessageStructure): Promise<Message> {
    const sendMessageSocket = await sendMessageService(usersIdAndMessage)
    return sendMessageSocket
  }
}
