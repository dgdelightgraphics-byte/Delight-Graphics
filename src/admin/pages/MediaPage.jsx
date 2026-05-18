import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Trash2, X } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const MediaPage = () => {
  const { data, addMedia, deleteMedia } = useAdminData()
  const [isAdding, setIsAdding] = useState(false)
  const [newMedia, setNewMedia] = useState({
    name: '',
    url: '',
    type: 'image',
  })

  const handleAddMedia = () => {
    if (newMedia.name.trim() && newMedia.url.trim()) {
      addMedia(newMedia)
      setNewMedia({ name: '', url: '', type: 'image' })
      setIsAdding(false)
    }
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Media Manager</h1>
            <p className="text-slate-400">Upload and manage your media files</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(!isAdding)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isAdding
                ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
            }`}
          >
            {isAdding ? (
              <>
                <X size={20} />
                Cancel
              </>
            ) : (
              <>
                <Upload size={20} />
                Add Media
              </>
            )}
          </motion.button>
        </div>

        {/* Upload Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Add New Media</h2>

            {/* Drag and Drop Area */}
            <div className="mb-6">
              <motion.div
                whileHover={{ borderColor: '#60a5fa' }}
                className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-700/20 transition-colors"
              >
                <Upload size={40} className="mx-auto text-slate-400 mb-2" />
                <p className="text-slate-300 font-semibold mb-1">Drag and drop your files here</p>
                <p className="text-slate-500 text-sm">or click to select files</p>
              </motion.div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Media Name"
                value={newMedia.name}
                onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Media URL / File Path"
                value={newMedia.url}
                onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <select
                value={newMedia.type}
                onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="document">Document</option>
              </select>

              <button
                onClick={handleAddMedia}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Upload Media
              </button>
            </div>
          </motion.div>
        )}

        {/* Media Grid */}
        {data.media.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.media.map((media, idx) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl"
              >
                {/* Preview */}
                <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-slate-400">
                  {media.type === 'image' ? '[Image]' : media.type === 'video' ? '[Video]' : '[Document]'}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 truncate">{media.name}</h3>
                  <p className="text-slate-400 text-xs mb-4 truncate">{media.url}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded text-xs font-semibold">
                      {media.type}
                    </span>
                    <button
                      onClick={() => deleteMedia(media.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-12 text-center backdrop-blur-xl"
          >
            <Upload size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-300 font-semibold mb-2">No media uploaded yet</p>
            <p className="text-slate-500 text-sm">Click "Add Media" to start uploading your files</p>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  )
}
