import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Phone, Mail, MapPin, MessageSquare } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const ContactPage = () => {
  const { data, updateContact } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.contact)

  const handleSave = () => {
    updateContact(formData)
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
            <h1 className="text-4xl font-bold text-white mb-2">Contact Information</h1>
            <p className="text-slate-400">Manage your contact details</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                setFormData(data.contact)
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
            <h2 className="text-2xl font-bold text-white mb-6">Edit Contact Details</h2>

            <div className="space-y-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-slate-300">{formData.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-slate-300">{formData.email}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-slate-300">{formData.address}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <MessageSquare size={16} />
                  WhatsApp Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-slate-300">{formData.whatsapp}</p>
                )}
              </div>

              {/* Google Maps Embed */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Google Maps Embed Code
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.googleMapsEmbed}
                    onChange={(e) => handleChange('googleMapsEmbed', e.target.value)}
                    placeholder="Paste your Google Maps embed code here"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none text-xs"
                    rows="3"
                  />
                ) : (
                  <p className="text-slate-400 text-xs">
                    {formData.googleMapsEmbed ? 'Map embed configured' : 'No map embed added'}
                  </p>
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
            <h2 className="text-2xl font-bold text-white mb-6">Contact Preview</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg flex items-start gap-4">
                <Phone className="text-blue-400 mt-1" size={20} />
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-white font-semibold">{formData.phone}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg flex items-start gap-4">
                <Mail className="text-green-400 mt-1" size={20} />
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white font-semibold">{formData.email}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg flex items-start gap-4">
                <MapPin className="text-red-400 mt-1" size={20} />
                <div>
                  <p className="text-slate-400 text-sm">Address</p>
                  <p className="text-white font-semibold text-sm">{formData.address}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg flex items-start gap-4">
                <MessageSquare className="text-purple-400 mt-1" size={20} />
                <div>
                  <p className="text-slate-400 text-sm">WhatsApp</p>
                  <p className="text-white font-semibold">{formData.whatsapp}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
