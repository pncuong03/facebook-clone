import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  acceptRequest,
  deleteFriend,
  deleteRequestFriend,
  fetchInfoFriend,
  fetchListFriend,
  fetchListRequest,
  rejectRequest,
  sendRequest
} from '~/apis/friend/friendThunk'
import { IFriend } from '~/types/friend'
import { FetchStatus, IUser } from '~/types/user'

export interface FriendState {
  friendStatus: FetchStatus
  listRequest: IFriend[]
  friendInfo: IUser
  listFriend: IFriend[]
}

const initialState: FriendState = {
  friendStatus: FetchStatus.idle,
  listRequest: [],
  listFriend: [],
  friendInfo: {
    id: '',
    fullName: '',
    imageUrl: '',
    backgroundUrl: '',
    birthday: '',
    gender: '',
    description: '',
    state: ''
  }
}

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    rejectFriendRequest: (state, action: PayloadAction<string>) => {
      state.listRequest = state.listRequest.filter((friend) => friend.id !== action.payload)
    },
    acceptFriendRequest: (state, action: PayloadAction<string>) => {
      state.listRequest = state.listRequest.filter((friend) => friend.id !== action.payload)
    },
    unFriend: (state, action: PayloadAction<string>) => {
      state.listFriend = state.listFriend.filter((friend) => friend.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListRequest.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(fetchListRequest.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.friendStatus = FetchStatus.succeeded
        state.listRequest = action.payload
      })
      .addCase(fetchListRequest.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(fetchInfoFriend.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(fetchInfoFriend.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.friendStatus = FetchStatus.succeeded
        state.friendInfo = action.payload
      })
      .addCase(fetchInfoFriend.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(fetchListFriend.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(fetchListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.friendStatus = FetchStatus.succeeded
        state.listFriend = action.payload
      })
      .addCase(fetchListFriend.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(rejectRequest.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(rejectRequest.fulfilled, (state) => {
        state.friendStatus = FetchStatus.succeeded
      })
      .addCase(rejectRequest.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(sendRequest.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(sendRequest.fulfilled, (state) => {
        state.friendStatus = FetchStatus.succeeded
      })
      .addCase(sendRequest.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(acceptRequest.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(acceptRequest.fulfilled, (state) => {
        state.friendStatus = FetchStatus.succeeded
      })
      .addCase(acceptRequest.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(deleteFriend.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(deleteFriend.fulfilled, (state) => {
        state.friendStatus = FetchStatus.succeeded
      })
      .addCase(deleteFriend.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })

      .addCase(deleteRequestFriend.pending, (state) => {
        state.friendStatus = FetchStatus.pending
      })
      .addCase(deleteRequestFriend.fulfilled, (state) => {
        state.friendStatus = FetchStatus.succeeded
      })
      .addCase(deleteRequestFriend.rejected, (state) => {
        state.friendStatus = FetchStatus.failed
      })
  }
})

export const { rejectFriendRequest, acceptFriendRequest, unFriend } = friendSlice.actions
export default friendSlice.reducer
