import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserFriends } from "../../types/loginTypes";
import { TInitialState } from "../reducers/types/userTypes";

export const findUserController = createAsyncThunk("user/findUserController",
  async ({ id } : {id:number} ,{ getState }) => {
    try {
      const { auth } = await getState() as { auth: TInitialState }
      const findFriend = auth.friends.find((friend:IUserFriends) => friend.id === id)
      return findFriend
    }
    catch (error) {
      console.error(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      }
    }
  });
