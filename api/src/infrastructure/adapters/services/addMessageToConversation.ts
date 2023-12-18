import { prisma } from "../Input/prisma/adapter.prisma";
import { Message } from "@prisma/client";

type TCreateMessage = Pick<Message, 'senderId' | 'content' | 'conversationId'>

export const createMessage = async ({ senderId, content, conversationId }: TCreateMessage): Promise<void> => {
  prisma.message.create({
    data: {
      content,
      senderId,
      conversation: { connect: { id: conversationId } }
    }
  })
}
