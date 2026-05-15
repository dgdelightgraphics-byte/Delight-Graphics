import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Delight%20Graphics', '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 p-4 rounded-lg glass text-sm max-w-xs"
          >
            <p className="mb-3 text-gray-100">Hello! 👋 How can we help you today?</p>
            <button
              onClick={handleWhatsApp}
              className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors font-semibold"
            >
              Chat on WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full gradient-btn shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" size={24} />
          ) : (
            <MessageCircle key="chat" size={24} />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
