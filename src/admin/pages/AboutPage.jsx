import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const AboutPage = () => {
  const { data, updateAbout } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.about)

  const handleSave = () => {
    updateAbout(formData)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">About Section</h1>
            <p className="text-slate-400">Edit your about page content</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                setFormData(data.about)
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

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Edit Content</h2>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Company Description
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows="4"
                  />
                ) : (
                  <p className="text-slate-300">{formData.description}</p>
                )}
              </div>

              {/* Mission */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Mission
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.mission}
                    onChange={(e) => handleChange('mission', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-slate-300">{formData.mission}</p>
                )}
              </div>

              {/* Vision */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Vision
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.vision}
                    onChange={(e) => handleChange('vision', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-slate-300">{formData.vision}</p>
                )}
              </div>

              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <Save size={20} />
                  Save Changes
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Live Preview</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">About Us</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{formData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Our Mission</p>
                  <p className="text-white text-sm font-semibold">{formData.mission}</p>
                </div>
                <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Our Vision</p>
                  <p className="text-white text-sm font-semibold">{formData.vision}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
