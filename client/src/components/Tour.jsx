import React,{useEffect,useState} from 'react'
import {BiSearchAlt} from "react-icons/bi"
import {AiOutlineSend} from "react-icons/ai"
import {motion} from "framer-motion"
import Map from "./Map"



const Tour = () => {
  const [searchDestination,setSearchDestination]=useState("")
  const searchDestinationHandler=()=>{
    alert("form submitted")

  }
  const handleKeyPress=(event)=>{
    if(event.key==="Enter")searchDestinationHandler()
  }
  return (
    <div id='tour' className=' max-w-4xl mx-auto h-[1200px]'>
    
    <motion.div className="text-center "
    initial={{opacity:0,y:10}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5,delay:0.6}}
    >
  <h3 className="text-4xl font-semibold drop-shadow-xl relative inline-block ">
    Take a Tour
    <div className="absolute  left-0 w-full h-1 bg-buttonColor rounded-3xl "></div>
  </h3>
</motion.div>
       <div className=' relative mt-6' >
        <input 
        placeholder='Search'
        className=' block mx-auto py-2 px-14 rounded-3xl border focus:outline-none w-2/3 mt-5 drop-shadow-xl mb-9' 
        onChange={(event)=>{setSearchDestination(event.target.value)}} 
        onKeyPress={handleKeyPress}
       
        />
         <button className='block' onClick={searchDestinationHandler}>
  <BiSearchAlt className="text-2xl absolute left-44 bottom-11" />
</button>

        </div>

        <Map />
        {/* <div className=' m-5'>
          <p className=' '>Distance From your place:<span className=' italic font-bold'>18KM</span></p>
          <p className=' '>Estimated Time:<span className=' italic font-bold'></span></p>
        </div> */}
        
        
      
          
          
      

    </div>
  )
}

export default Tour