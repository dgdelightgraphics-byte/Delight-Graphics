import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const HeroPage = () => {
  const { data, updateHero } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.hero)

  const handleSave = () => {
    updateHero(formData)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleButtonChange = (buttonKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [buttonKey]: {
        ...prev[buttonKey],
        [field]: value,
      },
    }))
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Hero Section</h1>
            <p className="text-slate-400">Edit your homepage hero section</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                setFormData(data.hero)
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
              {/* Heading */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Main Heading
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.heading}
                    onChange={(e) => handleChange('heading', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-slate-300">{formData.heading}</p>
                )}
              </div>

              {/* Subheading */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Subheading
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.subheading}
                    onChange={(e) => handleChange('subheading', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-slate-300">{formData.subheading}</p>
                )}
              </div>

              {/* CTA Button 1 */}
              <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  CTA Button 1
                </label>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={formData.ctaButton1.text}
                      onChange={(e) => handleButtonChange('ctaButton1', 'text', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Button Link"
                      value={formData.ctaButton1.link}
                      onChange={(e) => handleButtonChange('ctaButton1', 'link', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none text-sm"
                    />
                  </div>
                ) : (
                  <div className="text-sm">
                    <p className="text-white font-semibold">{formData.ctaButton1.text}</p>
                    <p className="text-slate-400">{formData.ctaButton1.link}</p>
                  </div>
                )}
              </div>

              {/* CTA Button 2 */}
              <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  CTA Button 2
                </label>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={formData.ctaButton2.text}
                      onChange={(e) => handleButtonChange('ctaButton2', 'text', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Button Link"
                      value={formData.ctaButton2.link}
                      onChange={(e) => handleButtonChange('ctaButton2', 'link', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none text-sm"
                    />
                  </div>
                ) : (
                  <div className="text-sm">
                    <p className="text-white font-semibold">{formData.ctaButton2.text}</p>
                    <p className="text-slate-400">{formData.ctaButton2.link}</p>
                  </div>
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
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-lg border border-blue-500/30">
              <motion.h3 className="text-3xl font-bold text-white mb-4">
                {formData.heading}
              </motion.h3>
              <motion.p className="text-slate-300 mb-6 leading-relaxed">
                {formData.subheading}
              </motion.p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  {formData.ctaButton1.text}
                </button>
                <button className="px-6 py-3 border-2 border-slate-400 text-white rounded-lg font-semibold hover:bg-slate-700/50 transition-all">
                  {formData.ctaButton2.text}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
