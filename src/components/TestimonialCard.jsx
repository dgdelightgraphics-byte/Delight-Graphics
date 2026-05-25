import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function TestimonialCard({ name, company, content, rating, image, index }) {
  const containerVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl glass-premium hover:border-secondary-400/50 transition-all duration-500 card-hover"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-text-muted mb-6 leading-relaxed italic">
        &quot;{content}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-background-border">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden flex-shrink-0"
        >
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500" />
          )}
        </motion.div>
        <div>
          <p className="font-semibold text-text-primary">{name}</p>
          <p className="text-text-muted text-sm">{company}</p>
        </div>
      </div>
    </motion.div>
  )
}
