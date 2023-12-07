import { userInterface,TInitialState } from "../types/userTypes";
import cookies from 'js-cookie'

const token = cookies.get("refresh_token")??undefined;

const userInfoInitialState:userInterface={
    id:null,
    userName:"",
    name:"",
    email:"",
    role:null,
    friends:[],
    receivedMessages:[],
    senderMessages:[]
}

const initialState:TInitialState = {
    refreshToken:token,
    userToken:'',
    userInfo:userInfoInitialState,
    loading:false,
    isAuth:false,
    error:null
}

export { initialState }