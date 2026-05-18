import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Instagram, Facebook, Youtube, Linkedin, Edit3 } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

const socialPlatforms = [
  { key: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-rose-500' },
  { key: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
  { key: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-600 to-red-700' },
  { key: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-500 to-cyan-500' },
  { key: 'behance', name: 'Behance', icon: Edit3, color: 'from-purple-500 to-indigo-500' },
]

export const SocialMediaPage = () => {
  const { data, updateSocialMedia } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.socialMedia)

  const handleSave = () => {
    updateSocialMedia(formData)
    setIsEditing(false)
  }

  const handleChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: value,
    }))
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Social Media Links</h1>
            <p className="text-slate-400">Manage your social media profiles</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                setFormData(data.socialMedia)
              }
              setIsEditing(!isEditing)
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isEditing
                ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
            }`}
          >
            {isEditing ? (
              <>
                <X size={20} />
                Cancel
              </>
            ) : (
              <>
                <Edit size={20} />
                Edit
              </>
            )}
          </motion.button>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {socialPlatforms.map((platform, idx) => {
            const Icon = platform.icon
            return (
              <motion.div
                key={platform.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${platform.color} p-6 rounded-xl border border-white/10 backdrop-blur-xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{platform.name}</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData[platform.key] || ''}
                    onChange={(e) => handleChange(platform.key, e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:border-white/50 focus:outline-none"
                  />
                ) : (
                  <a
                    href={formData[platform.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white text-sm truncate block transition-colors"
                  >
                    {formData[platform.key] || 'Not configured'}
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>

        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all mx-auto"
          >
            <Save size={20} />
            Save Changes
          </motion.button>
        )}
      </motion.div>
    </AdminLayout>
  )
}
