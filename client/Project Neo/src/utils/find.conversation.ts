import { IConversation } from "../redux/reducers/types/userTypes"

export const findConversation = (conversations, participant) => {
  for (const conversation of conversations as IConversation[]){
      console.log(conversation)
  }
}
