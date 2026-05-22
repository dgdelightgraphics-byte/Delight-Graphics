import React from 'react'
import { motion } from 'framer-motion'

export default function ProcessStep({ number, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="relative p-8 rounded-2xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all"
    >
      <div className="text-5xl font-bold gradient-text mb-4">{String(number).padStart(2, '0')}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-text-muted">{description}</p>

      {index < 5 && (
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 text-secondary-400 text-3xl"
        >
          →
        </motion.div>
      )}
    </motion.div>
  )
}
