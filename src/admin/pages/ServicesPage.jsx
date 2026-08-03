import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit3, Save, X, Plus, Trash2, Upload, Image as ImageIcon, Search, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'
import { storage } from '../../config/firebase'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const validateImageFile = (file) => {
  if (!file) return { valid: false, error: 'Please select an image file.' }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Only JPG, JPEG, PNG, and WEBP images are supported.' }
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { valid: false, error: 'Image size must be 5MB or less.' }
  }
  return { valid: true }
}

const compressImageFile = async (file) => {
  const imageBitmap = await createImageBitmap(file)
  const maxWidth = 1600
  const scale = Math.min(1, maxWidth / imageBitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(imageBitmap.width * scale)
  canvas.height = Math.round(imageBitmap.height * scale)
  const context = canvas.getContext('2d')
  context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result)
      else reject(new Error('Unable to optimize image.'))
    }, file.type === 'image/png' ? 'image/png' : 'image/webp', 0.82)
  })

  return new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' })
}

const uploadStorageFile = async (file, folder, onProgress) => {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        onProgress(progress)
      },
      reject,
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          resolve({ url, path: uploadTask.snapshot.ref.fullPath })
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

const createEmptyService = () => ({
  name: '',
  description: '',
  image: '',
  url: '',
  active: true,
  order: 1,
})

export const ServicesPage = () => {
  const { data, addService, deleteService, updateServices, showToast } = useAdminData()
  const [draftService, setDraftService] = useState(createEmptyService())
  const [editingId, setEditingId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadState, setUploadState] = useState({ uploading: false, progress: 0, message: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [saveError, setSaveError] = useState('')

  const services = data?.services || []
  const itemsPerPage = 6

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredServices = useMemo(() => {
    const filtered = services.filter((service) => {
      const searchText = `${service.name || service.title || ''} ${service.description || ''}`.toLowerCase()
      return searchText.includes(searchQuery.toLowerCase())
    })
    return [...filtered].sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
  }, [services, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / itemsPerPage))
  const visibleServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const resetForm = () => {
    setDraftService(createEmptyService())
    setEditingId(null)
    setUploadState({ uploading: false, progress: 0, message: '' })
    setSaveError('')
  }

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

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.valid) {
      setUploadState({ uploading: false, progress: 0, message: validation.error })
      showToast(validation.error, 'error')
      return
    }

    setUploadState({ uploading: true, progress: 0, message: 'Optimizing and uploading cover image...' })

    try {
      const optimizedFile = await compressImageFile(file)
      const { url } = await uploadStorageFile(optimizedFile, 'services/covers', (progress) => {
        setUploadState({ uploading: true, progress, message: 'Uploading cover image...' })
      })

      setDraftService((prev) => ({ ...prev, image: url }))
      setUploadState({ uploading: false, progress: 100, message: 'Image uploaded successfully.' })
      showToast('Image uploaded successfully.', 'success')
    } catch (error) {
      setUploadState({ uploading: false, progress: 0, message: error.message || 'Image upload failed.' })
      showToast(error.message || 'Image upload failed.', 'error')
    }
  }

  const handleStartEdit = (service) => {
    setEditingId(service.id)
    setDraftService({
      id: service.id,
      name: service.name || service.title || '',
      description: service.description || '',
      image: service.image || '',
      url: service.url || service.destinationUrl || '',
      active: service.active !== false && service.isActive !== false,
      order: Number(service.order || service.displayOrder || 1),
    })
  }

  const handleSaveService = async () => {
    const urlError = getUrlError(draftService.url)
    if (urlError) {
      setSaveError(urlError)
      return
    }

    if (!draftService.name.trim()) {
      showToast('Please add a service name before saving.', 'error')
      return
    }

    setIsSubmitting(true)
    setSaveError('')

    const normalizedService = {
      ...draftService,
      id: editingId ? String(editingId) : String(Date.now()),
      name: draftService.name.trim(),
      description: draftService.description.trim(),
      image: draftService.image || '',
      url: draftService.url.trim(),
      active: draftService.active !== false,
      order: Number(draftService.order) || 1,
      updatedAt: new Date().toISOString(),
      createdAt: editingId ? services.find((service) => String(service.id) === String(editingId))?.createdAt || new Date().toISOString() : new Date().toISOString(),
    }

    try {
      if (editingId) {
        const nextServices = services.map((service) => (String(service.id) === String(editingId) ? normalizedService : service))
        await updateServices(nextServices)
        showToast('Service updated successfully.', 'success')
      } else {
        await addService(normalizedService)
        showToast('Service added successfully.', 'success')
      }
      resetForm()
    } catch (error) {
      showToast(error.message || 'Unable to save service.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteService = async (service) => {
    if (!window.confirm(`Delete ${service.name || service.title || 'this service'}?`)) return
    try {
      await deleteService(service.id)
      showToast('Service deleted.', 'success')
    } catch (error) {
      showToast(error.message || 'Unable to delete service.', 'error')
    }
  }

  const handleToggleActive = async (service) => {
    const nextServices = services.map((entry) => (String(entry.id) === String(service.id) ? { ...entry, active: entry.active !== false ? false : true } : entry))
    await updateServices(nextServices)
    showToast('Visibility updated.', 'success')
  }

  const handleReorder = async (serviceId, direction) => {
    const index = services.findIndex((service) => String(service.id) === String(serviceId))
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= services.length) return

    const reordered = [...services]
    const [movedService] = reordered.splice(index, 1)
    reordered.splice(targetIndex, 0, movedService)
    const nextServices = reordered.map((entry, idx) => ({ ...entry, order: idx + 1 }))
    await updateServices(nextServices)
    showToast('Order updated.', 'success')
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Services</h1>
            <p className="text-slate-400">Manage premium service cards and their destinations from a single place.</p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setDraftService((prev) => ({ ...prev, order: services.length + 1 }))
            }}
            className="flex items-center gap-2 rounded-lg bg-green-500/20 px-6 py-3 font-semibold text-green-300 transition-all hover:bg-green-500/30"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                <p className="text-sm text-slate-400">Create a premium service card with image, link, ordering, and visibility controls.</p>
              </div>
              {editingId && (
                <button onClick={resetForm} className="text-sm font-semibold text-slate-300 hover:text-white">
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                value={draftService.name}
                onChange={(e) => setDraftService((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                rows="3"
                placeholder="Short Description"
                value={draftService.description}
                onChange={(e) => setDraftService((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <div className="rounded-lg border border-dashed border-slate-600 bg-slate-700/30 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <Upload size={16} />
                  Cover Image
                </label>
                <label className="block cursor-pointer rounded-lg border border-slate-600 px-4 py-3 text-center text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-300">
                  {draftService.image ? 'Replace Cover Image' : 'Upload Cover Image'}
                  <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleImageUpload} />
                </label>
                <p className="mt-2 text-xs text-slate-400">JPG, JPEG, PNG, WEBP • Max 5MB • Auto optimized</p>
                {uploadState.uploading && (
                  <div className="mt-3 text-sm text-slate-300">{uploadState.message} {uploadState.progress}%</div>
                )}
                {!uploadState.uploading && uploadState.message && (
                  <div className={`mt-3 text-sm ${uploadState.message.includes('successfully') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {uploadState.message}
                  </div>
                )}
                {draftService.image && (
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                    <span>Image ready</span>
                    <button onClick={() => setDraftService((prev) => ({ ...prev, image: '' }))} className="text-red-400 hover:text-red-300">
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <input
                type="url"
                placeholder="https://example.com"
                value={draftService.url}
                onChange={(e) => setDraftService((prev) => ({ ...prev, url: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {getUrlError(draftService.url) && <p className="text-sm text-red-400">{getUrlError(draftService.url)}</p>}

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  min="1"
                  placeholder="Display Order"
                  value={draftService.order}
                  onChange={(e) => setDraftService((prev) => ({ ...prev, order: Number(e.target.value) || 1 }))}
                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                <label className="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={draftService.active !== false}
                    onChange={(e) => setDraftService((prev) => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-500 bg-slate-800"
                  />
                  Active on website
                </label>
              </div>

              {saveError && <p className="text-sm text-red-400">{saveError}</p>}
              <button
                onClick={handleSaveService}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <p className="text-sm text-slate-400">This is how the card will appear on the services page.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className={`absolute inset-0 ${draftService.image ? 'bg-cover bg-center' : 'bg-gradient-to-br from-primary-500 to-secondary-500'}`}
                  style={draftService.image ? { backgroundImage: `url('${draftService.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <h3 className="text-2xl font-bold text-white">{draftService.name || 'Service Name'}</h3>
                  <p className="mt-2 text-sm text-slate-200">{draftService.description || 'Short description preview'}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Premium Service</span>
                  <span className="rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 px-3 py-1 text-sm font-semibold text-white">Explore Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Saved Services</h2>
              <p className="text-sm text-slate-400">Search, reorder, and manage your service cards.</p>
            </div>
            <label className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-300">
              <Search size={16} />
              <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none" />
            </label>
          </div>

          <div className="mt-6 grid gap-4">
            {visibleServices.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-600 bg-slate-800/60 p-6 text-center text-slate-400">
                No services yet. Add your first one to get started.
              </div>
            )}

            {visibleServices.map((service) => (
              <div key={service.id} className="flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-900/70 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white">
                    {service.image ? <img src={service.image} alt={service.name || service.title} className="h-12 w-12 rounded-lg object-cover" /> : <ImageIcon size={18} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{service.name || service.title}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs ${service.active !== false ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'}`}>
                        {service.active !== false ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{service.description || 'No description provided'}</p>
                    <p className="mt-1 text-xs text-slate-500">Order: {service.order || 1}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => handleReorder(service.id, -1)} className="rounded-lg border border-slate-600 bg-slate-800/80 p-2 text-slate-300 hover:text-white">
                    <ChevronUp size={16} />
                  </button>
                  <button onClick={() => handleReorder(service.id, 1)} className="rounded-lg border border-slate-600 bg-slate-800/80 p-2 text-slate-300 hover:text-white">
                    <ChevronDown size={16} />
                  </button>
                  <button onClick={() => handleToggleActive(service)} className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-slate-300 hover:text-white">
                    {service.active !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                    {service.active !== false ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleStartEdit(service)} className="rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-slate-300 hover:text-white">
                    <Edit3 size={16} className="mr-2 inline" />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteService(service)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20">
                    <Trash2 size={16} className="mr-2 inline" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">Page {currentPage} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-50">
                ←
              </button>
              <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-50">
                →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
