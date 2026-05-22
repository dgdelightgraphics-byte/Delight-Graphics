import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, index }) {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/contact')
  }

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

      <motion.button
        onClick={handleGetStarted}
        whileHover={{ x: 5 }}
        className="mt-6 px-6 py-2.5 bg-gradient-to-r from-secondary-500 to-primary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center gap-2 group/btn"
      >
        <span>Get Started</span>
        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  )
}
