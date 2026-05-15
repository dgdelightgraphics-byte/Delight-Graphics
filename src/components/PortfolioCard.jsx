import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

export default function PortfolioCard({ title, category, image, description, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
    >
      {/* Background Image Placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          index % 3 === 0
            ? 'from-primary-500 to-secondary-500'
            : index % 3 === 1
              ? 'from-secondary-500 to-primary-600'
              : 'from-primary-600 to-secondary-400'
        } transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
      />

      {/* Overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Content */}
      <motion.div
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10"
      >
        <Eye size={40} className="mb-4 text-text-primary" />
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-secondary-400 text-sm mb-4">{category}</p>
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </motion.div>

      {/* Category Badge */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-semibold z-20 text-secondary-400">
        {category}
      </div>
    </motion.div>
  )
}
