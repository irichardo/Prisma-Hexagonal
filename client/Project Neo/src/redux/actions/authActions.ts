import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserFetch } from "../reducers/types/userTypes";
import Cookies from "js-cookie";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      };
      const { data }: { data: IUserFetch } = await axios.post(
        `${URL}/api/v1/users/login`,
        { email, password },
        config
      );
      console.log(data.user)
      return data;
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const autoLogin = createAsyncThunk(
  "auth/autoLogin",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
        // withCredentials:true
      }
      const refresh_token = Cookies.get("refresh_token") ?? undefined
      // {refresh_token:localStorage.getItem("refresh_token")??undefined}
      if (!refresh_token) return rejectWithValue("Token not exists")
      console.log(refresh_token)
      const { data }: { data: IUserFetch } = await axios.post(`${URL}/api/v1/users/refresh_token`, { refresh_token }, config)
      console.log(data)
      return data;
    }
    catch (error) {
      // console.log(error.message)
      if (error.message === 'Network Error') return rejectWithValue(error.message)
      if (error.response.status === 401) return rejectWithValue(error.response.status)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)
