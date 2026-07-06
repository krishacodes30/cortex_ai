import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { auth, googleProvider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth' // 1. Added missing import
import api from '../utils/axios'

function App() {


  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", {token})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider)
      console.log(data)
      const token = await data.user.getIdToken() 
      
      console.log("Firebase Token:", token)
      await handleLogin(token)

      console.log(data)
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  return (
    <>
      <h1 className="text-white text-center">hello</h1>

      <div className='w-full h-screen bg-black flex items-center justify-center'>
       <button 
          onClick={googleLogin} 
          className='w-48 h-24 bg-white text-black cursor-pointer hover:bg-gray-200'
        >
          continue with google
        </button>
      </div>    
    </>
  )
}

export default App