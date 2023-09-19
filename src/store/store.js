import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import roleReducer from './user/roleSlice'


export default configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
  },
})