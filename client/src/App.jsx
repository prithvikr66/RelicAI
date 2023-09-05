
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Tour from './components/Tour'
import {LoginContext} from "./contexts/LoginContext"
import { useState } from 'react'
function App() {

  const [showLogin,setShowLogin]= useState(false)
  const [authState,setAuthState]= useState("Sign up")
 

  return (
    <div className=' font-Ubuntu'>
    <div className=' h-screen'>
    <LoginContext.Provider value={{showLogin,setShowLogin,authState,setAuthState}}>
      <Navbar/>
      <Home/>
      </LoginContext.Provider>
      </div>
      <Tour/>
      </div>
  )
}

export default App
