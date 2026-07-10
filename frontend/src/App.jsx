import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import useCurrentUser from './hooks/useCurrentUser'

function App() {
  // ✅ Safe! This is now securely inside the BrowserRouter's context.
  useCurrentUser() 
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default App