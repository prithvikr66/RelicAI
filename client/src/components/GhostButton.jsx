import React, { useState, useContext } from 'react'
import { LoginContext } from "../contexts/LoginContext"
import { motion } from "framer-motion"

const GhostButton = ({ name ,x1,y1,x2,y2,d}) => {
  const { setShowLogin } = useContext(LoginContext)

  const handleSignup = () => {
    setShowLogin(true)

  }

  return (
    <motion.button
      initial={{ opacity: 0, y: y1,x:x1 }}
      animate={{ opacity: 1, y: y2 ,x:x2}}
      transition={{ duration: 0.5, delay: d }}
      className=' bg-none border px-4 font-semibold text-xs rounded-3xl hover:bg-black hover:text-whie filter drop-shadow-xl'
      onClick={handleSignup}>
      {name}
    </motion.button>
  )
}

export default GhostButton