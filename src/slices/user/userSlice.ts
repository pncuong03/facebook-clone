import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchInfoUser, fetchSearchUser } from '~/apis/user/userThunk'
import { FetchStatus, ISearchUser, IUser } from '~/types/user'

export interface UserState {
  userStatus: FetchStatus
  user: IUser
  searchUser: ISearchUser[]
}

const initialState: UserState = {
  userStatus: FetchStatus.idle,
  user: {
    id: '',
    fullName: '',
    imageUrl: '',
    backgroundUrl: '',
    birthday: '',
    gender: '',
    description: '',
    state: ''
  },
  searchUser: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfoUser.pending, (state) => {
        state.userStatus = FetchStatus.pending
      })
      .addCase(fetchInfoUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.userStatus = FetchStatus.succeeded
        state.user = action.payload
      })
      .addCase(fetchInfoUser.rejected, (state) => {
        state.userStatus = FetchStatus.failed
      })

      .addCase(fetchSearchUser.pending, (state) => {
        state.userStatus = FetchStatus.pending
      })
      .addCase(fetchSearchUser.fulfilled, (state, action: PayloadAction<ISearchUser[]>) => {
        state.userStatus = FetchStatus.succeeded
        state.searchUser = action.payload
      })
      .addCase(fetchSearchUser.rejected, (state) => {
        state.userStatus = FetchStatus.failed
      })
  }
})

export const {} = userSlice.actions
export default userSlice.reducer
