import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '~/utilities/services/initRequest'

export const fetchListChat = createAsyncThunk('message/fetchListChat', async () => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/chat`, auth)
    return data.data.content
  } catch (error) {}
})

export const fetchListMessage = createAsyncThunk('message/fetchListMessage', async (chatId: string) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/chat/messages?chatId=${chatId}`, auth)
    return data.data.content
  } catch (error) {}
})

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async ({ chatId, message }: { chatId: string; message: string }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      const data = await axiosInstance.post(`/message`, { chatId, message }, auth)
      thunkAPI.dispatch(fetchListMessage(chatId))
      return data.data.content
    } catch (error) {}
  }
)
