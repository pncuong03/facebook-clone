import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '~/utilities/services/initRequest'
import { decreaseLike, deletePostofMe, increaseComment, increaseLike, increaseShare } from '~/slices/post/postSlice'

export const fetchPostPublicOfFriend = createAsyncThunk('post/fetchPostPulic', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get('/post/list/friends', auth)

    return data.data.content
  } catch (error) {}
})

export const fetchPostFriend = createAsyncThunk('post/fetchPostFriend', async (friendId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/post/list/post-friend?friendId=${friendId}`, auth)

    return data.data.content
  } catch (error) {}
})

export const fetchPostOfMe = createAsyncThunk('post/fetchPostOfMe', async (thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/post/list/me`, auth)
    return data.data.content
  } catch (error) {}
})

export const createPost = createAsyncThunk('post/createPost', async (postData: FormData, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    await axiosInstance.post('/post/post', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
    thunkAPI.dispatch(fetchPostOfMe())
  } catch (error) {}
})

export const fetchLikePost = createAsyncThunk('post/fetchLikePost', async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/user/post/interaction/like/list?postId=${postId}`, auth)
    return data.data.content
  } catch (error) {}
})

export const fetchDetailPost = createAsyncThunk('post/fetchDetailPost', async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const data = await axiosInstance.get(`/user/post/interaction?postId=${postId}`, auth)

    return data.data
  } catch (error) {}
})

// export const updatePost = createAsyncThunk(
//   'post/updatePost',
//   async ({ createPostInputString, images, accessToken, postId }: UpdatePostPayload, thunkAPI) => {
//     try {
//       await apiUpdatePost({ createPostInputString, images }, accessToken, postId)
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   }
// )

export const likePost = createAsyncThunk('post/likePost', async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    await axiosInstance.post(`/user/post/interaction/like?postId=${postId}`, {}, auth)
    thunkAPI.dispatch(increaseLike(postId))
  } catch (error) {}
})

export const unLikePost = createAsyncThunk('post/unLikePost', async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.delete(`/user/post/interaction/remove-like?postId=${postId}`, auth)
    thunkAPI.dispatch(decreaseLike(postId))
  } catch (error) {}
})

export const sharePost = createAsyncThunk(
  'post/sharePost',
  async ({ content, state, shareId }: { content: string; state: string; shareId: string }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      await axiosInstance.post(`/post/share?shareId=${shareId}`, { content, state }, auth)
      thunkAPI.dispatch(increaseShare(shareId))
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const commentPost = createAsyncThunk(
  'post/commentPost',
  async ([postId, comment]: [string, string], thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      await axiosInstance.post(`/user/post/interaction/comment?postId=${postId}&comment=${comment}`, {}, auth)
      thunkAPI.dispatch(fetchDetailPost(postId))
      thunkAPI.dispatch(increaseComment(postId))
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteComment = createAsyncThunk('post/deleteComment', async (commentId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.delete(`/user/post/interaction/comment/delete?commentId=${commentId}`, auth)

    // thunkAPI.dispatch(addComment(comment))
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deletePost = createAsyncThunk('post/deletePost', async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    await axiosInstance.delete(`/post/delete?postId=${postId}`, auth)
    thunkAPI.dispatch(deletePostofMe(postId))
  } catch (error) {}
})
