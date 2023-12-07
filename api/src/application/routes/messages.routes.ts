import { type Request, type Response, Router } from 'express'
import { prisma } from '../../infrastructure/adapters/Input/prisma/adapter.prisma'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { senderId, receiverId, content }: { senderId: number, receiverId: number, content: string } = req.body
  try {
    if (senderId === undefined || senderId === null || typeof senderId !== 'number') throw new Error('User not exists')
    if (receiverId === undefined || receiverId === null || typeof senderId !== 'number') throw new Error('User not exists')
    const getConversation = await prisma.conversation.findFirst({
      where: {
        AND: [{ participants: { some: { id: senderId } } }, { participants: { some: { id: receiverId } } }]
      }
    })

    if (getConversation === null) {
    /**
      *@const relationConversationBetween2Users: Create Conversation between 2 users if the conversation doesn't exists.
      */
      const relationConversationBetween2Users = await prisma.conversation.create({
        data: {
          name: 'Default',
          participants: { connect: [{ id: senderId }, { id: receiverId }] }
        }
      })
      const message = await prisma.message.create({
        data: {
          content,
          senderId,
          conversation: { connect: { id: relationConversationBetween2Users.id } }
        }
      })
      res.status(200).send(message)
    } else {
      const message = await prisma.message.create({
        data: {
          content,
          senderId,
          conversation: { connect: { id: getConversation.id } }
        }
      })
      res.status(200).send(message)
    }
    // console.log(getConversation)

    // const deleteConversation = await prisma.conversation.update({
    //   data: {
    //     messages: { deleteMany: { conversationId: 7 } }
    //   },
    //   where: {
    //     id: 7
    //   }
    // })
    // const getConversation = await prisma.message.findFirst({
    //   where: { conversationId: 7 }
    // })
    // console.log(getConversation)

    // const messageSended = await prisma.message.create({
    //   data: {
    //     senderId,
    //     content,
    //     conversation: {
    //       connect: {
    //         id: relationConversationBetween2Users.id
    //       }
    //     }
    //   }
    // })
    // console.log(messageSended)
  } catch (err: any) {
    console.error(err.message)
    res.sendStatus(500)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    // const messages = await prisma.user.findMany({
    //   include: {
    //     conversations: { select: { participants: { select: { id: true } }, id: true, name: true } }
    //   }
    // })
    // const users = await prisma.user.findMany({
    //   include: {
    // conversations
    // senderMessages: true,
    // receivedMessages: true
    // }
    // })
    const conversation = await prisma.conversation.findFirst({
      where: { AND: [{ participants: { some: { id: 1 } } }, { participants: { some: { id: 3 } } }] }, include: { messages: true }
    })
    console.log(conversation)
    res.status(200).send(conversation)
  } catch (err: any) {
    console.error(err.message)
    res.sendStatus(500)
  }
})

export default router
