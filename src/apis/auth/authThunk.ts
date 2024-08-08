import { createAsyncThunk } from '@reduxjs/toolkit'
import { authLogin, authRegister } from '.'

export const userLogin = createAsyncThunk<string, { username: string; password: string }>(
  'auth/login',
  async (params, thunkAPI) => {
    try {
      const response = await authLogin(params)
      return response.data.accessToken
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const userRegister = createAsyncThunk<string, { fullName: any; username: any; password: string }>(
  'auth/register',
  async (params, thunkAPI) => {
    try {
      const response = await authRegister(params)

      return response.data.accessToken
    } catch (error) {
      // return thunkAPI.rejectWithValue(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)
