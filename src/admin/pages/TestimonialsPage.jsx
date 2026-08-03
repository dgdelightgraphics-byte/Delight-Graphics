import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2, Star, Upload, Image as ImageIcon } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'
import {
  ALLOWED_TESTIMONIAL_IMAGE_TYPES,
  MAX_TESTIMONIAL_IMAGE_SIZE_BYTES,
  deleteCloudinaryImage,
  uploadImageToCloudinary,
  validateImageUpload,
} from '../../utils/cloudinaryService'

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
    clientImage: '',
  })
  const [editedTestimonials, setEditedTestimonials] = useState(data.testimonials)
  const [uploadingState, setUploadingState] = useState({
    type: 'idle',
    progress: 0,
    message: '',
  })
  const [selectedImagePreview, setSelectedImagePreview] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')
  const [uploadingTestimonialId, setUploadingTestimonialId] = useState(null)

  const acceptedTypesLabel = useMemo(() => ALLOWED_TESTIMONIAL_IMAGE_TYPES.map((type) => type.split('/')[1].toUpperCase()).join(', '), [])

  const resetUploadState = () => {
    setUploadingState({ type: 'idle', progress: 0, message: '' })
    setSelectedImagePreview('')
    setSelectedFileName('')
    setUploadingTestimonialId(null)
  }

  const handleImageSelection = async (event, target, isNew = false) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validation = validateImageUpload(file)
    if (!validation.valid) {
      setUploadingState({ type: 'error', progress: 0, message: validation.error })
      return
    }

    const previewUrl = URL.createObjectURL(file)
    if (isNew) {
      setSelectedImagePreview(previewUrl)
      setSelectedFileName(file.name)
    }

    const nextState = isNew ? { ...newTestimonial, clientImage: '' } : target
    setUploadingState({ type: 'uploading', progress: 0, message: 'Uploading image...' })
    if (isNew) {
      setNewTestimonial(nextState)
    } else {
      handleTestimonialChange(target.id, 'clientImage', '')
    }

    try {
      const url = await uploadImageToCloudinary(file, 'testimonials', (percent) => {
        setUploadingState({ type: 'uploading', progress: percent, message: 'Uploading image...' })
      })

      if (isNew) {
        setNewTestimonial((prev) => ({ ...prev, clientImage: url }))
      } else {
        handleTestimonialChange(target.id, 'clientImage', url)
      }

      setUploadingState({ type: 'success', progress: 100, message: 'Image uploaded successfully.' })
    } catch (error) {
      if (isNew) {
        setNewTestimonial((prev) => ({ ...prev, clientImage: '' }))
      } else {
        handleTestimonialChange(target.id, 'clientImage', '')
      }
      setUploadingState({ type: 'error', progress: 0, message: error.message || 'Image upload failed.' })
    }
  }

  const handleAddTestimonial = async () => {
    if (newTestimonial.name.trim() && newTestimonial.content.trim()) {
      await addTestimonial({ ...newTestimonial, image: newTestimonial.clientImage || '' })
      setNewTestimonial({ name: '', company: '', content: '', rating: 5, image: '', clientImage: '' })
      resetUploadState()
      setIsAdding(false)
    }
  }

  const handleSave = async () => {
    await updateTestimonials(editedTestimonials)
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

  const handleRemoveImage = async (testimonial) => {
    if (testimonial.clientImage) {
      await deleteCloudinaryImage(testimonial.clientImage)
    }
    handleTestimonialChange(testimonial.id, 'clientImage', '')
    handleTestimonialChange(testimonial.id, 'image', '')
  }

  const handleDeleteTestimonial = async (testimonial) => {
    if (testimonial.clientImage) {
      await deleteCloudinaryImage(testimonial.clientImage)
    }
    await deleteTestimonial(testimonial.id)
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
              <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <ImageIcon size={16} /> Client Image
                </label>
                <p className="mb-3 text-xs text-slate-400">
                  JPG, JPEG, PNG, WEBP up to 2MB. {acceptedTypesLabel}
                </p>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-500 bg-slate-800/50 px-4 py-3 text-sm text-slate-300 transition hover:border-blue-400 hover:text-white">
                  <Upload size={16} />
                  Choose Image
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleImageSelection(e, newTestimonial, true)}
                  />
                </label>
                {uploadingState.message && (
                  <p className={`mt-2 text-sm ${uploadingState.type === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
                    {uploadingState.message}
                  </p>
                )}
                {uploadingState.type === 'uploading' && (
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${uploadingState.progress}%` }} />
                  </div>
                )}
                {(selectedImagePreview || newTestimonial.clientImage) && (
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={selectedImagePreview || newTestimonial.clientImage}
                      alt="Preview"
                      className="h-16 w-16 rounded-full border border-white/70 object-cover shadow-lg"
                    />
                    <span className="text-sm text-slate-300">{selectedFileName || 'Uploaded image'}</span>
                  </div>
                )}
              </div>
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
                  <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-3">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                      <ImageIcon size={14} /> Client Image
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-500 bg-slate-800/50 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-400 hover:text-white">
                      <Upload size={14} />
                      {testimonial.clientImage ? 'Replace Image' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handleImageSelection(e, testimonial)}
                      />
                    </label>
                    {testimonial.clientImage && (
                      <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-slate-800/70 p-2">
                        <div className="flex items-center gap-3">
                          <img src={testimonial.clientImage || testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full border border-white/70 object-cover shadow-md" />
                          <span className="text-xs text-slate-300">Current image</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(testimonial)}
                          className="text-xs text-red-300 hover:text-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial)}
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
