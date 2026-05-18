import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const ServicesPage = () => {
  const { data, addService, deleteService, updateServices } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: 'briefcase',
  })
  const [editedServices, setEditedServices] = useState(data.services)

  const handleAddService = () => {
    if (newService.title.trim()) {
      addService(newService)
      setNewService({ title: '', description: '', icon: 'briefcase' })
      setIsAdding(false)
    }
  }

  const handleDeleteService = (id) => {
    deleteService(id)
  }

  const handleSave = () => {
    updateServices(editedServices)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedServices(data.services)
    setIsEditing(false)
  }

  const handleServiceChange = (id, field, value) => {
    setEditedServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    )
  }

  const ICONS = ['briefcase', 'code', 'palette', 'globe', 'zap', 'users']

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Services</h1>
            <p className="text-slate-400">Manage your services</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdding(!isAdding)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isAdding
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
              }`}
            >
              {isAdding ? (
                <>
                  <X size={20} />
                  Cancel
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Service
                </>
              )}
            </motion.button>
            {!isAdding && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isEditing) {
                    handleCancel()
                  } else {
                    setIsEditing(true)
                  }
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
            )}
          </div>
        </div>

        {/* Add Service Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Service Title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <select
                value={newService.icon}
                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                {ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="md:col-span-2 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                rows="2"
              />
              <button
                onClick={handleAddService}
                className="md:col-span-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Add Service
              </button>
            </div>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isEditing ? editedServices : data.services).map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                  />
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-white text-xl">◆</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-300 text-sm">{service.description}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="mt-8 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all mx-auto"
          >
            <Save size={20} />
            Save Changes
          </motion.button>
        )}
      </motion.div>
    </AdminLayout>
  )
}
