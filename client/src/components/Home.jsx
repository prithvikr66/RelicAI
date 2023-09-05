import React,{useState,useContext} from 'react'
import img from "../../public/map_no_bg.png"
import SolidButton from './SolidButton'
import {MdExplore} from "react-icons/md"
import { LoginContext } from '../contexts/LoginContext'
import {AiOutlineClose} from "react-icons/ai"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth"
import {auth} from "../firebase-config"
import {animate, motion} from "framer-motion"

const Home = () => {
  const {showLogin,setShowLogin,authState,setAuthState}=useContext(LoginContext)
  const [authType,setAuthType] =useState("Signup")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")


  const handleAuth=async()=>{
   
      if(authType=="Signup"){
        try{const user=await createUserWithEmailAndPassword(auth,email,password)
      setShowLogin(false)
      setAuthState("Log out")
      setAuthType("Logout")
      
        }catch(error){
          console.log(error.message)
        }
      }else if(authType=="Login"){
        try{
        const user=await signInWithEmailAndPassword(auth,email,password)
        setShowLogin(false)
        
        }catch(error){
          console.log(error.message)
        }

      }else{
        await signOut(auth)
        setAuthState("Sign up")

      }

    



  }

 

  return (
   
    <div className=' max-w-4xl mx-auto p-2 mt-9 '>
    <div className='flex h-96 gap-4 '>
    <div className=' flex flex-col gap-5 mt-9'>
    <motion.h3 initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5,delay:0.3}} className=' font-medium text-4xl '>Why <span className=' text-buttonColor font-bold'>RelicAI</span></motion.h3>
    <motion.p 
    initial={{opacity:0,y:10}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5,delay:0.6}}
    className=' leading-7'>Relic AI is your ultimate travel companion on the quest for unforgettable adventures. We understand that the world is a vast and beautiful place, filled with hidden gems and unique experiences waiting to be discovered. <br></br>That's why we've crafted Relic AI with a distinct passion for travel and a dedication to enhancing your explorations.</motion.p>
    <span>
    <SolidButton 
    y1={-10}
    y2={0}
    d={0.5}
    name="Start Exploring"
    icon={<MdExplore className=' text-xl font-extrabold'/>} />
    </span>
    
    
    </div>
    
    <motion.img src={img} initial={{opacity:0,x:40}}
    animate={{opacity:1,x:0}}
    transition={{duration:1,delay:0.3}}  />
  
    </div>
    {
      showLogin===true?(
        <div className=' bg-whie h-60 w-1/2 mx-auto relative bottom-72 rounded-xl flex flex-col items-center justify-center '>
    <div className=' flex'>
    <h3 className='text-center text-2xl font-medium p-5'>{authType}</h3>
    <motion.button 
    onClick={()=>{setShowLogin("false")}}
    className=' relative left-28'><AiOutlineClose className=''/></motion.button>
    </div>
    <div className=' flex flex-col items-center justify-center gap-3'>
    <input placeholder='email' 
    className=' border rounded-2xl py-1 px-3 focus:outline-none'
    onChange={(event)=>{setEmail(event.target.value)}}  
    />
    <input placeholder='password'
     className='border rounded-2xl py-1 px-3 focus:outline-none'
     onChange={(event)=>{setPassword(event.target.value)}}
     />
    <button className=' border border-buttonColor bg-buttonColor bg-opacity-75 w-full rounded-2xl py-1 px-3 text-whie font-semibold'
    onClick={handleAuth}>{authType}
    </button>
    </div>
    
    {
      authType==="Signup"?(<p className=' text-sm font-light m-3 '>Existing User..?<span className=' font-bold'><button onClick={()=>{setAuthType('Login')}}>
Login
    </button>
    
    </span></p>):(<p className=' text-sm font-light m-3 '>New User..?<span className=' font-bold'><button onClick={()=>{setAuthType('Signup')}}>
Sign up
    </button>
    
    </span></p>)
    }
      
    </div>
  
   ):(<></>)
    }
    
        
    </div>
  )
}

export default Home