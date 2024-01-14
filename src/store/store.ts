import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import reportReducer from './comments/reportSlice'
import dialogMenuReducer from './comments/dialogMenuSlice'

import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    reportSlice: reportReducer,
    dialogMenuSlice: dialogMenuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
