import React from 'react'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice.js'
import api from '../../utils/axios'

function useCurrentUser() {
    const dispatch=useDispatch()
useEffect(()=>{
const get=async ()=>{
    try {
        const {data}=await api.get("/api/me")
       dispatch(setUserData(data.user))
    } catch (error) {
        console.log(error)
    }
}
get()
},[])
}

export default useCurrentUser
