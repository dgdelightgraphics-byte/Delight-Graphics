import React from 'react'
import { motion } from 'framer-motion'

export default function SectionTitle({ title, subtitle, className = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`text-center mb-16 ${className}`}
    >
      <motion.div
        variants={itemVariants}
        className="inline-block px-6 py-2 rounded-full glass mb-6"
      >
        <span className="text-xs font-semibold tracking-widest text-secondary-400 uppercase">
          {subtitle}
        </span>
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold gradient-text">
        {title}
      </motion.h2>
    </motion.div>
  )
}
