import { createAsyncThunk } from "@reduxjs/toolkit";

export const findUserController = createAsyncThunk("user/findUserController",
  async (state, { id }: { id: number }, { rejectWithValue }) => {
    try {
      console.log(id, state, 214124124124)
    }
    catch (error) {
      console.error(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      }
    }
  });
