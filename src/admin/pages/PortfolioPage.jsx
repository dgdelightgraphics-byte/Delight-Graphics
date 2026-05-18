import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const PortfolioPage = () => {
  const { data, addPortfolioItem, deletePortfolioItem, updatePortfolio } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    featured: false,
    images: [],
  })
  const [editedPortfolio, setEditedPortfolio] = useState(data.portfolio)

  const handleAddItem = () => {
    if (newItem.title.trim()) {
      addPortfolioItem(newItem)
      setNewItem({ title: '', description: '', category: 'Web Design', featured: false, images: [] })
      setIsAdding(false)
    }
  }

  const handleSave = () => {
    updatePortfolio(editedPortfolio)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedPortfolio(data.portfolio)
    setIsEditing(false)
  }

  const handleItemChange = (id, field, value) => {
    setEditedPortfolio((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const categories = ['Web Design', 'Web Development', 'Branding', 'UI/UX', 'Photography']

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-slate-400">Manage your portfolio items</p>
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
                  Add Project
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

        {/* Add Project Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New Project</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Project Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                rows="3"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.featured}
                  onChange={(e) => setNewItem({ ...newItem, featured: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm">Featured Project</span>
              </label>
              <button
                onClick={handleAddItem}
                className="w-full px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Add Project
              </button>
            </div>
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(isEditing ? editedPortfolio : data.portfolio).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-slate-400">
                [Project Image]
              </div>

              {/* Content */}
              <div className="p-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                      rows="2"
                    />
                    <select
                      value={item.category}
                      onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.featured}
                        onChange={(e) => handleItemChange(item.id, 'featured', e.target.checked)}
                        className="w-4 h-4"
                      />
                      Featured
                    </label>
                    <button
                      onClick={() => deletePortfolioItem(item.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                ) : (
                  <>
                    {item.featured && (
                      <div className="mb-2 inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full text-xs font-semibold">
                        ⭐ Featured
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-full text-xs">
                        {item.category}
                      </span>
                    </div>
                  </>
                )}
              </div>
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
