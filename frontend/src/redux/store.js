import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export const store = configureStore({
//   reducer: {}, is for storing what data needed 

 reducer: {
    user:userReducer
 },
})