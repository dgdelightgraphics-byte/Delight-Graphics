import React from 'react'
import { motion } from 'framer-motion'

export default function ServiceCard({ icon: Icon, title, description, index }) {
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
      whileHover={{ y: -10 }}
      className="group p-8 rounded-2xl glass-premium hover:border-primary-500/50 transition-all duration-500 card-hover glow-primary hover:glow-primary"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-all"
      >
        <Icon size={32} className="text-white" />
      </motion.div>

      <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:gradient-text transition-all">
        {title}
      </h3>

      <p className="text-text-muted leading-relaxed group-hover:text-text-primary transition-colors">
        {description}
      </p>

      <motion.div
        whileHover={{ x: 5 }}
        className="mt-6 flex items-center text-secondary-400 font-semibold hover:text-secondary-300 transition-colors"
      >
        <span>Learn More</span>
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          →
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
