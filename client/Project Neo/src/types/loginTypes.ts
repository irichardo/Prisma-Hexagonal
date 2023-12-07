interface IUserFriends {
    id: number;
    name: string;
    role: string;
  }
  interface IReceivedMessages {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
  }
  
  interface ISenderMessages {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
  }
  
  interface IUserFetch {
    id: number;
    name: string;
    email: string;
    role: string;
    friends: IUserFriends[];
    receivedMessages: IReceivedMessages[];
    senderMessages: ISenderMessages[];
  }
  
  interface ILoginFetch {
    user: IUserFetch;
    login: boolean;
  }
  
  interface ILoginForm {
    email: string;
    password: string;
  }
  
 

  export type { ILoginForm, ILoginFetch, IUserFetch, IReceivedMessages, ISenderMessages, IUserFriends  };