
import './App.css'
import { auth, googleProvider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth' // 1. Added missing import
import api from '../utils/axios'
import Home from './pages/Home'
import { useEffect } from 'react'
import getCurrentUser from './features/getCurrentUser'

function App() {

  useEffect(()=>{
    const getUser=async()=>{

      await getCurrentUser()
    }

    getUser()

  },[])


  return (
    <>
    <h1>app</h1>
    <Home/>

    </>
  )
}

export default App