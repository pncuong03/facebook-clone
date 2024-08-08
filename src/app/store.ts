import { configureStore } from '@reduxjs/toolkit'
import authSlice from '~/slices/auth/authSlice'
import friendSlice from '~/slices/friend/friendSlice'
import messageSlice from '~/slices/message/messageSlice'
import notiSlice from '~/slices/noti/notiSlice'
import postSlice from '~/slices/post/postSlice'
import userSlice from '~/slices/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    user: userSlice,
    friend: friendSlice,
    noti: notiSlice,
    message: messageSlice
  }
})

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   // whitelist: ['auth']
//   blacklist: ['auth']
// }

// const rootReducer = combineReducers({
//   auth: authSlice,
//   post: postSlice,
//   user: userSlice,
//   friend: friendSlice,
//   noti: notiSlice
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     })
// })

// export let persistor = persistStore(store)
