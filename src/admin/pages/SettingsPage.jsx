import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Moon, Sun } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const SettingsPage = () => {
  const { data, updateSettings } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.settings)

  const handleSave = () => {
    updateSettings(formData)
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
            <h1 className="text-4xl font-bold text-white mb-2">Website Settings</h1>
            <p className="text-slate-400">Configure your website settings</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                setFormData(data.settings)
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

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Display Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              {formData.darkMode ? (
                <Moon size={24} className="text-blue-400" />
              ) : (
                <Sun size={24} className="text-yellow-400" />
              )}
              Display Settings
            </h2>

            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Theme Mode
                </label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleChange('darkMode', true)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                        formData.darkMode
                          ? 'bg-blue-500/30 border border-blue-400 text-blue-300'
                          : 'bg-slate-700/30 border border-slate-600 text-slate-400'
                      }`}
                    >
                      <Moon size={16} />
                      Dark
                    </button>
                    <button
                      onClick={() => handleChange('darkMode', false)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                        !formData.darkMode
                          ? 'bg-yellow-500/30 border border-yellow-400 text-yellow-300'
                          : 'bg-slate-700/30 border border-slate-600 text-slate-400'
                      }`}
                    >
                      <Sun size={16} />
                      Light
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-300">{formData.darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* SEO Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">SEO Settings</h2>

            <div className="space-y-6">
              {/* SEO Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Meta Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => handleChange('seoTitle', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-slate-300 text-sm">{formData.seoTitle}</p>
                )}
              </div>

              {/* SEO Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Meta Description
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => handleChange('seoDescription', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-slate-300 text-sm">{formData.seoDescription}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer & Other Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Other Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Footer Text */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Footer Text
              </label>
              {isEditing ? (
                <textarea
                  value={formData.footerText}
                  onChange={(e) => handleChange('footerText', e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                  rows="2"
                />
              ) : (
                <p className="text-slate-300 text-sm">{formData.footerText}</p>
              )}
            </div>

            {/* Favicon */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Favicon URL
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.favicon}
                  onChange={(e) => handleChange('favicon', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <p className="text-slate-300 text-sm">
                  {formData.favicon || 'No favicon configured'}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Save size={20} />
              Save All Changes
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}
