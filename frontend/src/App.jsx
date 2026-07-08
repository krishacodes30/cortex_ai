
import './App.css'
import { auth, googleProvider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth' // 1. Added missing import
import api from '../utils/axios'
import Home from './pages/Home'
import { useEffect } from 'react'
import getCurrentUser from './features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserData } from "./redux/userSlice";

function App() {

const dispatch=useDispatch()
useEffect(()=>{
const get=async ()=>{
    try {
        const {data}=await api.get("/api/me")
       dispatch(setUserData(data.user))//action
    } catch (error) {
        console.log(error)
    }
}
get()
},[])


  return (
    <>
    <h1>app</h1>
    <Home/>

    </>
  )
}

export default App