import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState/initialState";
import { autoLogin, userLogin } from "../actions/authActions";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    findUser: (state, { payload }) => {
      console.log(state, payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuth = true;
        state.userInfo = payload!.user;
        state.friends = payload!.user.friends;
        state.userToken = payload!.refreshToken;
        state.error = null;
      }),
      builder.addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }),
      builder.addCase(autoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(autoLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuth = true;
        state.userInfo = payload!.user;
        state.userToken = payload!.refreshToken;
        state.error = null;
      }),
      builder.addCase(autoLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
  }
})

export const { findUser } = authSlice.actions;
export default authSlice.reducer;
