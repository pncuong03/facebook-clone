import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchStatus } from '~/types/user'
import { IPost, LikeData } from '~/types/post'
import {
  deletePost,
  fetchDetailPost,
  fetchLikePost,
  fetchPostFriend,
  fetchPostOfMe,
  fetchPostPublicOfFriend,
  likePost,
  sharePost,
  unLikePost
} from '~/apis/post/postThunk'

export interface PostState {
  postPublic: IPost[]
  postOfMe: IPost[]
  postOfFriend: IPost[]
  listLike: LikeData[]
  postStatus: FetchStatus
  likeStatus: FetchStatus
  detailPost: IPost
}

const initialPost: IPost = {
  id: '',
  userId: '',
  state: '',
  fullName: '',
  imageUrl: '',
  createdAt: '',
  content: '',
  imageUrls: [],
  shareId: '',
  sharePost: {} as IPost,
  likeCount: 0,
  commentCount: 0,
  shareCount: 0,
  comments: [] || null,
  hasLike: false,
  type: ''
}

const initialState: PostState = {
  postPublic: [],
  postOfMe: [],
  postOfFriend: [],
  listLike: [],
  detailPost: initialPost,
  postStatus: FetchStatus.idle,
  likeStatus: FetchStatus.idle
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    increaseLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const postPublic = state.postPublic.find((post) => post.id === postId)
      const postOfMe = state.postOfMe.find((post) => post.id === postId)
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId)
      if (postPublic) {
        postPublic.hasLike = true
        postPublic.likeCount += 1
      }
      if (postOfMe) {
        postOfMe.hasLike = true
        postOfMe.likeCount += 1
      }
      if (postOfFriend) {
        postOfFriend.hasLike = true
        postOfFriend.likeCount += 1
      }
    },
    decreaseLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const postPublic = state.postPublic.find((post) => post.id === postId)
      const postOfMe = state.postOfMe.find((post) => post.id === postId)
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId)
      if (postPublic) {
        postPublic.hasLike = false
        postPublic.likeCount -= 1
      }

      if (postOfMe) {
        postOfMe.hasLike = false
        postOfMe.likeCount -= 1
      }
      if (postOfFriend) {
        postOfFriend.hasLike = false
        postOfFriend.likeCount -= 1
      }
    },
    increaseShare: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const postPublic = state.postPublic.find((post) => post.id === postId)
      const postOfMe = state.postOfMe.find((post) => post.id === postId)
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId)
      if (postPublic) {
        postPublic.shareCount += 1
      }
      if (postOfMe) {
        postOfMe.shareCount += 1
      }
      if (postOfFriend) {
        postOfFriend.shareCount += 1
      }
    },
    increaseComment: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const postPublic = state.postPublic.find((post) => post.id === postId)
      const postOfMe = state.postOfMe.find((post) => post.id === postId)
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId)
      if (postPublic) {
        postPublic.commentCount += 1
      }
      if (postOfMe) {
        postOfMe.commentCount += 1
      }
      if (postOfFriend) {
        postOfFriend.commentCount += 1
      }
    },
    deletePostofMe: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      state.postOfMe = state.postOfMe.filter((post) => post.id !== postId)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostPublicOfFriend.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      .addCase(fetchPostPublicOfFriend.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postStatus = FetchStatus.succeeded
        state.postPublic = action.payload
      })
      .addCase(fetchPostPublicOfFriend.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })

      .addCase(fetchPostOfMe.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      .addCase(fetchPostOfMe.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postStatus = FetchStatus.succeeded
        state.postOfMe = action.payload
      })
      .addCase(fetchPostOfMe.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })

      .addCase(fetchLikePost.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      .addCase(fetchLikePost.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postStatus = FetchStatus.succeeded
        state.listLike = action.payload
      })
      .addCase(fetchLikePost.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })

      .addCase(likePost.pending, (state) => {
        state.likeStatus = FetchStatus.pending
      })
      .addCase(likePost.fulfilled, (state) => {
        state.likeStatus = FetchStatus.succeeded
      })
      .addCase(likePost.rejected, (state) => {
        state.likeStatus = FetchStatus.failed
      })

      .addCase(unLikePost.pending, (state) => {
        state.likeStatus = FetchStatus.pending
      })
      .addCase(unLikePost.fulfilled, (state) => {
        state.likeStatus = FetchStatus.succeeded
      })
      .addCase(unLikePost.rejected, (state) => {
        state.likeStatus = FetchStatus.failed
      })

      .addCase(sharePost.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      .addCase(sharePost.fulfilled, (state) => {
        state.postStatus = FetchStatus.succeeded
      })
      .addCase(sharePost.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })

      .addCase(fetchDetailPost.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      .addCase(fetchDetailPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.postStatus = FetchStatus.succeeded
        state.detailPost = action.payload
      })
      .addCase(fetchDetailPost.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })

      .addCase(fetchPostFriend.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      .addCase(fetchPostFriend.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postStatus = FetchStatus.succeeded
        state.postOfFriend = action.payload
      })
      .addCase(fetchPostFriend.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })

      .addCase(deletePost.pending, (state) => {
        state.postStatus = FetchStatus.pending
      })
      // .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
      //   const postId = action.payload
      //   state.postOfMe = state.postOfMe.filter((post) => post.id !== postId)
      // })
      .addCase(deletePost.rejected, (state) => {
        state.postStatus = FetchStatus.failed
      })
  }
})

export const { increaseLike, decreaseLike, increaseShare, increaseComment, deletePostofMe } = postSlice.actions
export default postSlice.reducer
