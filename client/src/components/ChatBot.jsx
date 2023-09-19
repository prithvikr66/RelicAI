import React,{useState,useEffect} from 'react'
import axios from "axios"
import { client } from "@gradio/client";

const ChatBot = () => {
  const [prompt,setPrompt]=useState('');
  const [chatLog,setChatLog]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const handleSubmitForm=(e)=>{
    e.preventDefault();
    setChatLog((prevChatLog)=>[...prevChatLog,{type:"user",message:prompt}])
    fetchChatResponse(input)
    setPrompt('')
  }
  const fetchChatResponse=async(input)=>{
    try{
      const url=""
      const data={prompt}
      setIsLoading(true)
      const response=await axios.post(url,data)
      setChatLog((prevChatLog)=>[...prevChatLog,{type:"bot",message:response.data.response}])
      setIsLoading(false)

    }catch(err){console.log(err)}
  }

  
  return (
   <>
    <h1 className=' container '>RelicAI</h1>
    {
      chatLog.map((message,index)=>(
        <div key="index">{message.message}</div>
      ))
    }
    <form onSubmit={handleSubmitForm}>
      <input type='text' placeholder='Type your message..' value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}/>
      <button type='submit'>Send</button>
    </form>
   </>
  )
}

export default ChatBot