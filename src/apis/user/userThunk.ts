import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISearchUser } from '~/types/user'
import { axiosInstance } from '~/utilities/services/initRequest'

export const fetchInfoUser = createAsyncThunk('post/fetchInfoUser', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get('/user', auth)
    return data.data
  } catch (error) {}
})

export const editUser = createAsyncThunk('post/editUser', async (userData: FormData, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    await axiosInstance.post('/user/change-user-information', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
    thunkAPI.dispatch(fetchInfoUser())
  } catch (error) {}
})

export const editBackground = createAsyncThunk('post/editBackground', async (userData: FormData, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    await axiosInstance.post('/user/change-user-background', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
    thunkAPI.dispatch(fetchInfoUser())
  } catch (error) {}
})

export const editAvatar = createAsyncThunk('post/editAvatar', async (userData: FormData, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    await axiosInstance.post('/user/change-user-avatar', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
    thunkAPI.dispatch(fetchInfoUser())
  } catch (error) {}
})

// export const fetchSearchUser = createAsyncThunk<ISearchUser[], string> (search: string) => {
//   try {
//     const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
//     const auth = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     }
//     const data = await axiosInstance.get(`/user/list?search=${search}`, auth)
//     return data.data.content
//   } catch (error) {}
// }

export const fetchSearchUser = createAsyncThunk<ISearchUser[], string>(
  'user/fetchSearchUser',
  async (search: string, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      const data = await axiosInstance.get(`/user/list?search=${search}`, auth)
      return data.data.content
    } catch (error) {}
  }
)
