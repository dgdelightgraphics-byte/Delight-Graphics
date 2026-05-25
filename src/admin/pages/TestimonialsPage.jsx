import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2, Star } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const TestimonialsPage = () => {
  const { data, addTestimonial, deleteTestimonial, updateTestimonials } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
  })
  const [editedTestimonials, setEditedTestimonials] = useState(data.testimonials)

  const handleAddTestimonial = () => {
    if (newTestimonial.name.trim() && newTestimonial.content.trim()) {
      addTestimonial(newTestimonial)
      setNewTestimonial({ name: '', company: '', content: '', rating: 5, image: '' })
      setIsAdding(false)
    }
  }

  const handleSave = () => {
    updateTestimonials(editedTestimonials)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTestimonials(data.testimonials)
    setIsEditing(false)
  }

  const handleTestimonialChange = (id, field, value) => {
    setEditedTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    )
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Testimonials</h1>
            <p className="text-slate-400">Manage client testimonials</p>
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
                  Add Testimonial
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

        {/* Add Testimonial Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New Testimonial</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Company/Title"
                value={newTestimonial.company}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Testimonial Content"
                value={newTestimonial.content}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                rows="3"
              />
              <select
                value={newTestimonial.rating}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{'s'[num !== 1]}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddTestimonial}
                className="w-full px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Add Testimonial
              </button>
            </div>
          </motion.div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(isEditing ? editedTestimonials : data.testimonials).map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
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
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Client Name"
                  />
                  <input
                    type="text"
                    value={testimonial.company}
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'company', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Company/Title"
                  />
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'content', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                    rows="2"
                    placeholder="Testimonial Content"
                  />
                  <select
                    value={testimonial.rating}
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'rating', parseInt(e.target.value))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{'s'[num !== 1]}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              ) : (
                <>
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-slate-300 text-sm mb-4 italic">"{testimonial.content}"</p>

                  {/* Client Name */}
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-slate-400 text-xs">— {testimonial.company}</p>
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
