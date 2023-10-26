import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck : false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store