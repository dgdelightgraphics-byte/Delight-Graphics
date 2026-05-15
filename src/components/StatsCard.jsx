import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function StatsCard({ value, label, index }) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value)

  useEffect(() => {
    let start = 0
    const increment = numericValue / 50
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [numericValue])

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.05 }}
      className="p-8 rounded-2xl glass-premium hover:border-secondary-400/50 transition-all duration-500 text-center card-hover"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-5xl md:text-6xl font-bold gradient-text mb-3"
      >
        {count}+
      </motion.div>
      <p className="text-text-muted text-lg font-semibold">{label}</p>
    </motion.div>
  )
}
