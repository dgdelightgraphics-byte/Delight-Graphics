import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function ServiceCard({ name, description, image, url, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const hasDestinationUrl = Boolean(url && url.trim())

  const openDestination = () => {
    if (!hasDestinationUrl) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.92 },
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
      whileHover={{ y: -8, scale: 1.01 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={hasDestinationUrl ? openDestination : undefined}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && hasDestinationUrl) {
          event.preventDefault()
          openDestination()
        }
      }}
      tabIndex={hasDestinationUrl ? 0 : -1}
      role={hasDestinationUrl ? 'button' : undefined}
      className={`group relative overflow-hidden rounded-2xl border border-background-border bg-slate-900/60 backdrop-blur-xl transition-all duration-500 card-hover ${hasDestinationUrl ? 'cursor-pointer hover:border-primary-500/50 glow-primary hover:glow-primary' : 'cursor-default'}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${image ? 'bg-cover bg-center' : 'bg-gradient-to-br from-primary-500 to-secondary-500'}`}
          style={image ? { backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        />

        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <h3 className="text-2xl font-bold text-white mb-3">{name}</h3>
          <p className="text-sm leading-relaxed text-slate-200/90">{description}</p>
        </div>

        <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-semibold z-20 text-secondary-400">
          Service
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Sparkles size={16} className="text-secondary-400" />
            Premium Service
          </div>
          <motion.button
            onClick={(event) => {
              event.stopPropagation()
              openDestination()
            }}
            whileHover={{ x: 5 }}
            disabled={!hasDestinationUrl}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>Explore Service</span>
            <ArrowRight size={16} className="transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
