
// import './App.css'
// import ChatBot from './components/ChatBot'
// import Home from './components/LandingPage'
// import Navbar from './components/Navbar'
// import Places from './components/Places'
// import Tour from './components/Tour'
// import {LoginContext} from "./contexts/LoginContext"
// import { useState } from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// function App() {

//   const [showLogin,setShowLogin]= useState(false)
//   const [authState,setAuthState]= useState("Sign up")
  


//   return (
//     <div className=' font-Noto'>
//     <div className=' h-screen'>
//     <LoginContext.Provider value={{showLogin,setShowLogin,authState,setAuthState}}>
//       <Navbar/>
//       <Home/>
//       </LoginContext.Provider>
//       </div>
//       <Tour/>
//       <ChatBot/>
//       <Places/>
//       </div>
//   )
// }

// export default App
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Main from './components/Main'
import ChatBot from './components/ChatBot'
function App() {
  const router = createBrowserRouter([
    { path: "/", element: (<Main/>) },
  
    { path: "/chat", element: (<ChatBot />) },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App