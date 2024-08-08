import { createAsyncThunk } from '@reduxjs/toolkit'
import { addMessageReceived } from '~/slices/message/messageSlice'
import { IEventNoti, INoti } from '~/types/noti'
import { axiosInstance } from '~/utilities/services/initRequest'

interface FetchListNotiParams {
  page: number
  size: number
}

export const fetchListNoti = createAsyncThunk<INoti[], FetchListNotiParams>(
  'noti/fetchListNoti',
  async ({ page, size }) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      const data = await axiosInstance.get(`/notification?page=${page}&size=${size}`, auth)
      return data.data.content
    } catch (error) {}
  }
)

export const fetchEventNoti = createAsyncThunk<IEventNoti>('noti/fetchEventNoti', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/event-notification`, auth)
    return data.data
  } catch (error) {}
})

export const deleteEventNoti = createAsyncThunk('noti/deleteEventNoti', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.delete(`/event-notification`, auth)
  } catch (error) {}
})
