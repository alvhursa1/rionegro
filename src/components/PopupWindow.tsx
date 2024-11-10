import React from 'react'
import { motion } from 'framer-motion'

interface PopupWindowProps {
  title: string
  content: string
  isActive: boolean
}

const PopupWindow: React.FC<PopupWindowProps> = ({ title, content, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-85 p-8 rounded-lg shadow-lg w-96 z-30"
    >
      <h2 className="text-[1.875rem] font-['MinionItalic'] mb-4 text-[#74131f]">{title}</h2>
      <p className="text-[1rem] leading-[1.25rem] font-['MinionPro-Regular'] text-black">{content}</p>
    </motion.div>
  )
}

export default PopupWindow
