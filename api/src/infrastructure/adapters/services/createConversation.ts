import { IMessageRequest } from "../../../types/global";
import { prisma } from "../Input/prisma/adapter.prisma";

const createConversation = ({ senderId, receiverId }: IMessageRequest) => {
  const conversation = prisma.conversation.create({
    data: {
      name: 'Default',
      participants: { connect: [{ id: senderId }, { id: receiverId }] }
    }
  })

}
