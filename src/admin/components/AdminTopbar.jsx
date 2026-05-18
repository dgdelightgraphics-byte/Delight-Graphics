import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Settings, User } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

export const AdminTopbar = () => {
  const { adminUser, logout } = useAdminAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 right-0 left-64 h-16 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-xl z-40 flex items-center justify-between px-8"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">Admin Dashboard</h2>
      </div>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm text-white font-medium">{adminUser?.username}</span>
        </motion.button>

        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <button className="w-full text-left px-4 py-2 hover:bg-slate-700/50 transition-colors text-white flex items-center gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                logout()
                setShowUserMenu(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-500/20 transition-colors text-red-400 flex items-center gap-2 border-t border-slate-700"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
