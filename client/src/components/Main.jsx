

import ChatBot from './ChatBot'
import Home from './LandingPage'
import Navbar from './Navbar'
import Places from './Places'
import Tour from './Tour'
import {LoginContext} from "../contexts/LoginContext"
import { useState } from 'react'
function Main() {

  const [showLogin,setShowLogin]= useState(false)
  const [authState,setAuthState]= useState("Sign up")
  


  return (
    <div className=' font-Noto'>
    <div className=' h-screen'>
    <LoginContext.Provider value={{showLogin,setShowLogin,authState,setAuthState}}>
      <Navbar/>
      <Home/>
      </LoginContext.Provider>
      </div>
      <Tour/>
      
      <Places/>
      </div>
  )
}

export default Main
