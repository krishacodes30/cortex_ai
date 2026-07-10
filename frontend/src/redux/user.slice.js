
import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
  userData:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData:(state,action)=>{
        state.userData=action.payload//update the inatilly state data state->acces instail state action-> payload me data milge jo ham reducer me dalege 
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserData} = userSlice.actions

export default userSlice.reducer