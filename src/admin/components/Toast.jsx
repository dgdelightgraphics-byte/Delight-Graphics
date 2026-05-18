import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'

export const Toast = () => {
  const { toast } = useAdminData()

  const toastConfig = {
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      text: 'text-green-300',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      text: 'text-red-300',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      text: 'text-blue-300',
      icon: Info,
    },
  }

  const config = toastConfig[toast?.type] || toastConfig.info
  const Icon = config.icon

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg border ${config.bg} ${config.border} flex items-center gap-3 backdrop-blur-xl z-50`}
        >
          <Icon size={20} className={config.text} />
          <span className={`${config.text} font-medium text-sm`}>{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
