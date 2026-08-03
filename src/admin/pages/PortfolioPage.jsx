import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
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
    destinationUrl: '',
  })
  const [editedPortfolio, setEditedPortfolio] = useState(data.portfolio)
  const [dragTarget, setDragTarget] = useState(null)
  const [newUrlError, setNewUrlError] = useState('')
  const [editUrlErrors, setEditUrlErrors] = useState({})
  const [saveError, setSaveError] = useState('')

  const isValidUrl = (value) => {
    if (!value || !value.trim()) return true

    try {
      const url = new URL(value.trim())
      return ['http:', 'https:'].includes(url.protocol)
    } catch {
      return false
    }
  }

  const getUrlError = (value) => {
    if (!value || !value.trim()) return ''
    return isValidUrl(value) ? '' : 'Please enter a valid URL starting with http:// or https://'
  }

  const handleAddItem = () => {
    const urlError = getUrlError(newItem.destinationUrl)
    setNewUrlError(urlError)

    if (!newItem.title.trim() || urlError) {
      return
    }

    addPortfolioItem({ ...newItem, destinationUrl: newItem.destinationUrl.trim() })
    setNewItem({ title: '', description: '', category: 'Web Design', featured: false, images: [], destinationUrl: '' })
    setNewUrlError('')
    setIsAdding(false)
  }

  const addImagesToItem = async (itemId, files) => {
    const imageFiles = Array.from(files || []).filter((file) => file.type.startsWith('image/'))
    if (!imageFiles.length) return

    const imagePromises = imageFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
    )

    try {
      const base64Images = await Promise.all(imagePromises)
      if (itemId === 'new') {
        setNewItem((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...base64Images],
        }))
      } else {
        setEditedPortfolio((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, images: [...(item.images || []), ...base64Images] }
              : item
          )
        )
      }
    } catch (err) {
      console.error('Image upload failed:', err)
    }
  }

  const removeImage = (itemId, imageIndex) => {
    if (itemId === 'new') {
      setNewItem((prev) => ({
        ...prev,
        images: (prev.images || []).filter((_, i) => i !== imageIndex),
      }))
    } else {
      setEditedPortfolio((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, images: (item.images || []).filter((_, i) => i !== imageIndex) }
            : item
        )
      )
    }
  }

  const handleDragOver = (e, itemId) => {
    e.preventDefault()
    setDragTarget(itemId)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragTarget(null)
  }

  const handleDrop = (e, itemId) => {
    e.preventDefault()
    setDragTarget(null)
    addImagesToItem(itemId, e.dataTransfer.files)
  }

  const handleSave = () => {
    const hasInvalidUrl = editedPortfolio.some((item) => Boolean(getUrlError(item.destinationUrl)))
    if (hasInvalidUrl) {
      setSaveError('Please correct the invalid destination URLs before saving.')
      return
    }

    setSaveError('')
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

    if (field === 'destinationUrl') {
      setEditUrlErrors((prev) => ({ ...prev, [id]: getUrlError(value) }))
    }
  }

  const categories = ['Web Design', 'Web Development', 'Branding', 'UI/UX', 'Photography', 'Social Media', 'Video Editing', 'Animation']

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
              <input
                type="url"
                placeholder="https://example.com"
                value={newItem.destinationUrl}
                onChange={(e) => {
                  setNewItem({ ...newItem, destinationUrl: e.target.value })
                  setNewUrlError(getUrlError(e.target.value))
                }}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {newUrlError && <p className="text-sm text-red-400">{newUrlError}</p>}
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

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Project Images</label>
                <motion.label
                  whileHover={{ borderColor: '#60a5fa' }}
                  className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-700/20 transition-colors block"
                  onDragOver={(e) => handleDragOver(e, 'new')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'new')}
                >
                  <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                  <p className="text-slate-300 text-sm font-semibold">Click or drop images here</p>
                  <p className="text-slate-500 text-xs">PNG, JPG, GIF (Max 5MB each)</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => addImagesToItem('new', e.target.files)}
                    className="hidden"
                  />
                </motion.label>

                {/* Image Thumbnails */}
                {newItem.images && newItem.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {newItem.images.map((image, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${idx}`}
                          className="w-full h-20 object-cover rounded-lg border border-slate-600"
                        />
                        <button
                          onClick={() => removeImage('new', idx)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
              {/* Image Section */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center overflow-hidden group">
                {item.images && item.images.length > 0 ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
                        +{item.images.length - 1}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-sm">No Image</span>
                  </div>
                )}

                {/* Upload Button on Hover */}
                {isEditing && (
                  <motion.label
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-colors ${dragTarget === item.id ? 'bg-blue-600/30' : 'bg-black/50'}`}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item.id)}
                  >
                    <div className="text-center">
                      <Upload size={24} className="mx-auto text-white mb-2" />
                      <p className="text-white text-sm font-semibold">Add Image</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => addImagesToItem(item.id, e.target.files)}
                      className="hidden"
                    />
                  </motion.label>
                )}
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
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={item.destinationUrl || ''}
                      onChange={(e) => handleItemChange(item.id, 'destinationUrl', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                    {editUrlErrors[item.id] && <p className="text-sm text-red-400">{editUrlErrors[item.id]}</p>}
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

                    {/* Image Gallery */}
                    {item.images && item.images.length > 0 && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                          Images ({item.images.length})
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {item.images.map((image, imgIdx) => (
                            <div key={imgIdx} className="relative group">
                              <img
                                src={image}
                                alt={`Preview ${imgIdx}`}
                                className="w-full h-16 object-cover rounded border border-slate-600"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(item.id, imgIdx)}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} className="text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                      {item.images && item.images.length > 0 && (
                        <span className="text-xs text-slate-400">{item.images.length} image(s)</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-8 flex flex-col items-center gap-3">
            {saveError && <p className="text-sm text-red-400">{saveError}</p>}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Save size={20} />
              Save Changes
            </motion.button>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  )
}
