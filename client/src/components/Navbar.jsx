import React, { useContext } from 'react'
import img from "../../public/relicai_no_bg.png"
import GhostButton from './GhostButton'
import SolidButton from './SolidButton'
import { BsRobot } from "react-icons/bs"
import { LoginContext } from "../contexts/LoginContext"
import { motion } from "framer-motion"


const Navbar = () => {
  const { authState, setAuthState } = useContext(LoginContext)
  return (
    <nav className=' mt-5 ' >
      <div className=' max-w-4xl mx-auto rounded-2xl shadow-2xl p-3 flex justify-between bg-whie'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className=' flex items-center gap-2'>
          <img src={img} className='h-10' />
          <h1 className=' font-semibold'>Relic.ai</h1>

        </motion.div>

        <ul className=' flex text-xs justify-between items-center gap-7 font-medium '>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >Home</motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >About</motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >Random</motion.li>
        </ul>
        <div className=' flex flex-row gap-2'>
          <GhostButton
            y1={-10}
            y2={0}
            d={0.9}
            name={authState} />
          <SolidButton
            y1={-10}
            y2={0}
            d={0.9}

            name="Chat with AI"
            icon={<BsRobot className=' font-bold text-lg' />}

          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar