import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { fetchListChat, fetchListMessage, sendMessage } from '~/apis/message/messageThunk'
import { IChat } from '~/types/message'
import { IMessage } from '~/types/noti'
import { FetchStatus } from '~/types/user'

export interface MessageState {
  messageStatus: FetchStatus
  listChat: IChat[]
  listMessage: IMessage[]
}

const initialState: MessageState = {
  messageStatus: FetchStatus.idle,
  listChat: [],
  listMessage: []
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessageReceived: (state, action: PayloadAction<IMessage[]>) => {
      state.listMessage = [...action.payload, ...state.listMessage]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListChat.pending, (state) => {
        state.messageStatus = FetchStatus.pending
      })
      .addCase(fetchListChat.fulfilled, (state, action: PayloadAction<IChat[]>) => {
        state.messageStatus = FetchStatus.succeeded
        state.listChat = action.payload
      })
      .addCase(fetchListChat.rejected, (state) => {
        state.messageStatus = FetchStatus.failed
      })

      .addCase(fetchListMessage.pending, (state) => {
        state.messageStatus = FetchStatus.pending
      })
      .addCase(fetchListMessage.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.messageStatus = FetchStatus.succeeded
        state.listMessage = action.payload
      })
      .addCase(fetchListMessage.rejected, (state) => {
        state.messageStatus = FetchStatus.failed
      })

    // .addCase(sendMessage.pending, (state) => {
    //   state.messageStatus = FetchStatus.pending
    // })
    // .addCase(sendMessage.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
    //   state.messageStatus = FetchStatus.succeeded
    //   state.listMessage = action.payload
    // })
    // .addCase(sendMessage.rejected, (state) => {
    //   state.messageStatus = FetchStatus.failed
    // })
  }
})

export const { addMessageReceived } = messageSlice.actions

export default messageSlice.reducer
