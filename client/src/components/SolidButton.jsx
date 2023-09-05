import React from 'react'
import {motion} from "framer-motion"

const SolidButton = ({ name, icon ,x1,x2,y1,y2,d}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: y1, x: x1 }}
      animate={{ opacity: 1, y: y2, x: x2 }}
      transition={{ duration: 0.5, delay: d }}
      className=' bg-buttonColor px-4 py-2 font-semibold rounded-3xl bg-whietext-white text-xs text-whie hover:bg-whie border hover:border-buttonColor hover:text-buttonColor flex gap-2 items-center'
    >

      {icon}

      {name}
    </motion.button>
  )
}

export default SolidButton