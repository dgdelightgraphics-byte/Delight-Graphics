import React from 'react'
import { motion } from 'framer-motion'

export default function ProcessStep({ number, title, description, index }) {
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
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl glass-premium hover:border-primary-500/50 transition-all duration-500"
      >
        {/* Step Number */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-all"
        >
          <span className="text-2xl font-bold text-white">{String(number).padStart(2, '0')}</span>
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:gradient-text transition-all">
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted leading-relaxed group-hover:text-text-primary transition-colors">
          {description}
        </p>
      </motion.div>

      {/* Connecting Line for Desktop */}
      {index < 5 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-1 bg-gradient-to-r from-primary-500/50 to-secondary-500/50" />
      )}
    </motion.div>
  )
}
