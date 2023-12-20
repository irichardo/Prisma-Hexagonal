type TInitialState = {
    loading:boolean
    userInfo:userInterface
    isAuth:boolean
    userToken:string | undefined
    refreshToken:string | undefined
    error: any
}

enum role{
    USER="USER",
    ADMIN="ADMIN"
}

interface userInterface{
    id:number|null,
    userName:string,
    name:string,
    email:string,
    role: role | null
    friends: Pick<userInterface, "id" | "name" | "role">[]
    conversations:any[]
    // receivedMessages: any[],
    // senderMessages: any[]
}

interface IUserFetch {
    user:userInterface
    refreshToken:string
}

export type {TInitialState, userInterface, IUserFetch}