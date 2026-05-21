import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const containerVariants = {
    hidden: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-primary-500 via-secondary-500 to-secondary-400 rounded-xl flex items-center justify-center"
        >
          <span className="text-xl font-black text-white">DG</span>
        </motion.div>

        {/* Text Animation */}
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
        >
          Delight Graphics
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-text-muted text-lg mb-8"
        >
          Creating Premium Digital Experiences
        </motion.p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-12 w-32 h-1 rounded-full bg-gray-800 mx-auto overflow-hidden">
          <motion.div
            animate={{ x: [-100, 500] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-20 bg-gradient-to-r from-primary-500 to-secondary-500"
          />
        </div>
      </div>
    </motion.div>
  )
}
