import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteEventNoti, fetchEventNoti, fetchListNoti } from '~/apis/noti/notiThunk'
import { IEventNoti, INoti } from '~/types/noti'
import { FetchStatus } from '~/types/user'

export interface NotiState {
  notiStatus: FetchStatus
  notification: INoti[]
  notiEvent: IEventNoti
  currentPage: number
  pageSize: number
  hasMore: boolean
}

const initialNoti: IEventNoti = {
  messageCount: 0,
  informCount: 0,
  messages: []
}

const initialState: NotiState = {
  notiStatus: FetchStatus.idle,
  notification: [],
  notiEvent: initialNoti,
  currentPage: 0,
  pageSize: 10,
  hasMore: true
}

export const notiSlice = createSlice({
  name: 'noti',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    resetNotifications: (state) => {
      state.notification = []
      state.currentPage = 0
      state.hasMore = true
    },
    deleteNoti: (state) => {
      state.notiEvent.informCount = 0
    },
    deleteMessageNoti: (state) => {
      state.notiEvent.messageCount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListNoti.pending, (state) => {
        state.notiStatus = FetchStatus.pending
      })
      .addCase(fetchListNoti.fulfilled, (state, action: PayloadAction<INoti[]>) => {
        state.notiStatus = FetchStatus.succeeded

        const newNotifications = action.payload.filter(
          (newNoti) => !state.notification.some((existingNoti) => existingNoti.id === newNoti.id)
        )

        state.notification = [...newNotifications, ...state.notification]
        state.hasMore = action.payload.length > 0
      })
      .addCase(fetchListNoti.rejected, (state) => {
        state.notiStatus = FetchStatus.failed
      })

      .addCase(fetchEventNoti.pending, (state) => {
        state.notiStatus = FetchStatus.pending
      })
      .addCase(fetchEventNoti.fulfilled, (state, action: PayloadAction<IEventNoti>) => {
        state.notiStatus = FetchStatus.succeeded
        state.notiEvent = action.payload
      })
      .addCase(fetchEventNoti.rejected, (state) => {
        state.notiStatus = FetchStatus.failed
      })

      .addCase(deleteEventNoti.pending, (state) => {
        state.notiStatus = FetchStatus.pending
      })
      .addCase(deleteEventNoti.fulfilled, (state) => {
        state.notiStatus = FetchStatus.succeeded
        state.notiEvent.messageCount = 0
      })
      .addCase(deleteEventNoti.rejected, (state) => {
        state.notiStatus = FetchStatus.failed
      })
  }
})

export const { setPage, resetNotifications, deleteNoti, deleteMessageNoti } = notiSlice.actions
export default notiSlice.reducer
