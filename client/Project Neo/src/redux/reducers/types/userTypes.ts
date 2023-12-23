type TInitialState = {
  loading: boolean
  userInfo: userInterface
  isAuth: boolean
  userToken: string | undefined
  refreshToken: string | undefined
  error: any
}

enum role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface IParticipants {
  id: number,
  name: string,
}

export interface IConversation {
  id: number,
  name: string,
  participants: IParticipants[]
}

interface userInterface {
  id: number | null,
  userName: string,
  name: string,
  email: string,
  role: role | null
  friends: Pick<userInterface, "id" | "name" | "role">[]
  conversations: IConversation[]
  // receivedMessages: any[],
  // senderMessages: any[]
}

interface IUserFetch {
  user: userInterface
  refreshToken: string
}

export type { TInitialState, userInterface, IUserFetch }
