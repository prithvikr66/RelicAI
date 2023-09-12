import React, { useContext } from 'react'
import img from "../../public/relicai_no_bg.png"
import GhostButton from './GhostButton'
import SolidButton from './SolidButton'
import { BsRobot } from "react-icons/bs"
import { LoginContext } from "../contexts/LoginContext"
import { motion } from "framer-motion"
import {Link} from "react-scroll"


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
          <h1 className=' font-semibold drop-shadow-xl text-xl'>Relic.ai</h1>

        </motion.div>

        <ul className=' flex text-xs justify-between items-center gap-7 font-medium '>
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" cursor-pointer"
        ><motion.li
          className=' hover:underline '
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >Home</motion.li>
          </Link>
          <Link
          to="tour"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" cursor-pointer">
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >Tour</motion.li></Link>
          <Link
          to="places"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" cursor-pointer">
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >Places </motion.li></Link>
        </ul>
        <div className=' flex flex-row gap-2'>
          <GhostButton
            y1={-10}
            y2={0}
            d={0.9}
            name={authState} />
            <a href='/chat'>
          <SolidButton
            y1={-10}
            y2={0}
            d={0.9}

            name="Chat with AI"
            icon={<BsRobot className=' font-bold text-lg' />}

          /></a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar