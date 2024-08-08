import { createAsyncThunk } from '@reduxjs/toolkit'
import { acceptFriendRequest, rejectFriendRequest, unFriend } from '~/slices/friend/friendSlice'
import { axiosInstance } from '~/utilities/services/initRequest'

export const fetchListFriend = createAsyncThunk('friend/fetchListFriend', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    const data = await axiosInstance.get('/friend/list', auth)

    return data.data.content
  } catch (error) {}
})

export const fetchListRequest = createAsyncThunk('friend/fetchListRequest', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get('/friend/request/list', auth)
    return data.data.content
  } catch (error) {}
})

export const fetchInfoFriend = createAsyncThunk('post/fetchInfoFriend', async (friendId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/friend/friend-information?checkId=${friendId}`, auth)
    return data.data
  } catch (error) {}
})

export const sendRequest = createAsyncThunk('friend/sendRequest', async (id: string) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.post(`/friend/add?id=${id}`, {}, auth)
  } catch (error) {}
})

export const acceptRequest = createAsyncThunk('friend/acceptRequest', async (id: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.post(`/friend/accept?id=${id}`, {}, auth)
    thunkAPI.dispatch(acceptFriendRequest(id))
  } catch (error) {}
})

export const rejectRequest = createAsyncThunk('friend/rejectRequest', async (senderId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.delete(`/friend/reject?senderId=${senderId}`, auth)
    thunkAPI.dispatch(rejectFriendRequest(senderId))
  } catch (error) {}
})

export const deleteFriend = createAsyncThunk('friend/deleteFriend', async (friendId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.delete(`/friend/delete?friendId=${friendId}`, auth)
    thunkAPI.dispatch(unFriend(friendId))
  } catch (error) {}
})

export const deleteRequestFriend = createAsyncThunk(
  'friend/deleteRequestFriend',
  async (receiverId: string, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      await axiosInstance.delete(`/friend/delete-request/user?receiverId=${receiverId}`, auth)
    } catch (error) {}
  }
)
