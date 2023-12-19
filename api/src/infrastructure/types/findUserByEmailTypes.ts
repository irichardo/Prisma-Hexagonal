import { type User, type Conversation } from '@prisma/client'
type friendType = Omit<User, | 'email' | 'userName' | 'password'>

// interface ISenderMessages {
//   id: number
//   content: string
//   senderId: number
//   receiverId: number
// }

// interface IReceivedMessages {
//   id: number
//   content: string
//   senderId: number
//   receiverId: number
// }

export type TLogin = Omit<User, 'userName' | 'password'> & { friends: friendType[]
  conversations: Conversation[]
  // receivedMessages: IReceivedMessages[], senderMessages: ISenderMessages[]
}
