import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { logout } from '~/apis/auth'
import { userLogin, userRegister } from '~/apis/auth/authThunk'
import { FetchStatus, IUserGoogle } from '~/types/user'

export interface AuthState {
  loginStatus: FetchStatus
  accessToken: string | null
  userGoogle: IUserGoogle | null
}

const initialState: AuthState = {
  loginStatus: FetchStatus.idle,
  accessToken: null,
  userGoogle: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserGoogle: (state, action: PayloadAction<IUserGoogle>) => {
      state.userGoogle = action.payload
    },
    logOut: () => {
      logout()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loginStatus = FetchStatus.pending
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<string>) => {
        toast.success('Login successful')
        state.accessToken = action.payload
        state.loginStatus = FetchStatus.succeeded
      })
      .addCase(userLogin.rejected, (state) => {
        toast.error('Username or password is incorrect')
        state.loginStatus = FetchStatus.failed
        state.accessToken = null
      })

      .addCase(userRegister.pending, (state) => {
        state.loginStatus = FetchStatus.pending
      })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<string>) => {
        toast.success('Register successful')
        state.accessToken = action.payload
        state.loginStatus = FetchStatus.succeeded
      })
      .addCase(userRegister.rejected, (state) => {
        toast.error('Username already exists')
        state.loginStatus = FetchStatus.failed
        state.accessToken = null
      })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
