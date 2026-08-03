import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Upload, Search, Eye, EyeOff, ChevronUp, ChevronDown, Image as ImageIcon } from 'lucide-react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'
import { storage } from '../../config/firebase'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const createEmptyOffer = () => ({
  title: '',
  description: '',
  image: '',
  buttonText: 'Learn More',
  buttonUrl: '',
  active: true,
  order: 1,
})

const validateImageFile = (file) => {
  if (!file) return { valid: false, error: 'Please select an image file.' }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) return { valid: false, error: 'Only JPG, JPEG, PNG, and WEBP images are supported.' }
  if (file.size > MAX_IMAGE_SIZE_BYTES) return { valid: false, error: 'Image size must be 5MB or less.' }
  return { valid: true }
}

const compressImageFile = async (file) => {
  const imageBitmap = await createImageBitmap(file)
  const maxWidth = 1800
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

export const PromotionalOffersPage = () => {
  const { data, addPromotionalOffer, deletePromotionalOffer, updatePromotionalOffers, showToast } = useAdminData()
  const [draftOffer, setDraftOffer] = useState(createEmptyOffer())
  const [editingId, setEditingId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadState, setUploadState] = useState({ uploading: false, progress: 0, message: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const offers = data?.promotionalOffers || []
  const itemsPerPage = 6

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredOffers = useMemo(() => {
    const filtered = offers.filter((offer) => {
      const searchText = `${offer.title || ''} ${offer.description || ''}`.toLowerCase()
      return searchText.includes(searchQuery.toLowerCase())
    })
    return [...filtered].sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
  }, [offers, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredOffers.length / itemsPerPage))
  const visibleOffers = filteredOffers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const resetForm = () => {
    setDraftOffer(createEmptyOffer())
    setEditingId(null)
    setUploadState({ uploading: false, progress: 0, message: '' })
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

    setUploadState({ uploading: true, progress: 0, message: 'Optimizing and uploading poster...' })

    try {
      const optimizedFile = await compressImageFile(file)
      const { url } = await uploadStorageFile(optimizedFile, 'promotional-offers/posters', (progress) => {
        setUploadState({ uploading: true, progress, message: 'Uploading poster...' })
      })

      setDraftOffer((prev) => ({ ...prev, image: url }))
      setUploadState({ uploading: false, progress: 100, message: 'Poster uploaded successfully.' })
      showToast('Poster uploaded successfully.', 'success')
    } catch (error) {
      setUploadState({ uploading: false, progress: 0, message: error.message || 'Poster upload failed.' })
      showToast(error.message || 'Poster upload failed.', 'error')
    }
  }

  const handleStartEdit = (offer) => {
    setEditingId(offer.id)
    setDraftOffer({
      id: offer.id,
      title: offer.title || '',
      description: offer.description || '',
      image: offer.image || '',
      buttonText: offer.buttonText || 'Learn More',
      buttonUrl: offer.buttonUrl || '',
      active: offer.active !== false,
      order: Number(offer.order || 1),
    })
  }

  const handleSaveOffer = async () => {
    if (!draftOffer.title.trim()) {
      showToast('Please enter a title before saving.', 'error')
      return
    }

    if (!draftOffer.image) {
      showToast('Please upload a poster image before saving.', 'error')
      return
    }

    setIsSubmitting(true)

    const normalizedOffer = {
      ...draftOffer,
      id: editingId ? String(editingId) : String(Date.now()),
      title: draftOffer.title.trim(),
      description: draftOffer.description.trim(),
      image: draftOffer.image,
      buttonText: draftOffer.buttonText.trim() || 'Learn More',
      buttonUrl: draftOffer.buttonUrl.trim(),
      active: draftOffer.active !== false,
      order: Number(draftOffer.order) || 1,
      updatedAt: new Date().toISOString(),
      createdAt: editingId ? offers.find((offer) => String(offer.id) === String(editingId))?.createdAt || new Date().toISOString() : new Date().toISOString(),
    }

    try {
      if (editingId) {
        const nextOffers = offers.map((offer) => (String(offer.id) === String(editingId) ? normalizedOffer : offer))
        await updatePromotionalOffers(nextOffers)
        showToast('Offer updated successfully.', 'success')
      } else {
        await addPromotionalOffer(normalizedOffer)
        showToast('Offer added successfully.', 'success')
      }
      resetForm()
    } catch (error) {
      showToast(error.message || 'Unable to save offer.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteOffer = async (offer) => {
    if (!window.confirm(`Delete ${offer.title || 'this offer'}?`)) return
    try {
      await deletePromotionalOffer(offer.id)
      showToast('Offer deleted.', 'success')
    } catch (error) {
      showToast(error.message || 'Unable to delete offer.', 'error')
    }
  }

  const handleToggleActive = async (offer) => {
    const nextOffers = offers.map((entry) => (String(entry.id) === String(offer.id) ? { ...entry, active: entry.active !== false ? false : true } : entry))
    await updatePromotionalOffers(nextOffers)
    showToast('Visibility updated.', 'success')
  }

  const handleReorder = async (offerId, direction) => {
    const index = offers.findIndex((offer) => String(offer.id) === String(offerId))
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= offers.length) return

    const reordered = [...offers]
    const [movedOffer] = reordered.splice(index, 1)
    reordered.splice(targetIndex, 0, movedOffer)
    const nextOffers = reordered.map((entry, idx) => ({ ...entry, order: idx + 1 }))
    await updatePromotionalOffers(nextOffers)
    showToast('Order updated.', 'success')
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Promotional Offers</h1>
            <p className="text-slate-400">Manage premium promotional banners for the home and services pages.</p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setDraftOffer((prev) => ({ ...prev, order: offers.length + 1 }))
            }}
            className="flex items-center gap-2 rounded-lg bg-green-500/20 px-6 py-3 font-semibold text-green-300 transition-all hover:bg-green-500/30"
          >
            <Plus size={18} />
            Add Offer
          </button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Offer' : 'Add New Offer'}</h2>
                <p className="text-sm text-slate-400">Create premium promotional cards with a poster, CTA text, URL, and ordering.</p>
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
                placeholder="Main Heading"
                value={draftOffer.title}
                onChange={(e) => setDraftOffer((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                rows="3"
                placeholder="Short Description"
                value={draftOffer.description}
                onChange={(e) => setDraftOffer((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <div className="rounded-lg border border-dashed border-slate-600 bg-slate-700/30 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <Upload size={16} />
                  Cover Poster
                </label>
                <label className="block cursor-pointer rounded-lg border border-slate-600 px-4 py-3 text-center text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-300">
                  {draftOffer.image ? 'Replace Poster' : 'Upload Poster'}
                  <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleImageUpload} />
                </label>
                <p className="mt-2 text-xs text-slate-400">JPG, JPEG, PNG, WEBP • Max 5MB • Auto optimized</p>
                {uploadState.uploading && <div className="mt-3 text-sm text-slate-300">{uploadState.message} {uploadState.progress}%</div>}
                {!uploadState.uploading && uploadState.message && <div className={`mt-3 text-sm ${uploadState.message.includes('successfully') ? 'text-emerald-400' : 'text-red-400'}`}>{uploadState.message}</div>}
                {draftOffer.image && (
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                    <span>Poster ready</span>
                    <button onClick={() => setDraftOffer((prev) => ({ ...prev, image: '' }))} className="text-red-400 hover:text-red-300">Remove</button>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Button Text"
                value={draftOffer.buttonText}
                onChange={(e) => setDraftOffer((prev) => ({ ...prev, buttonText: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="url"
                placeholder="Button URL"
                value={draftOffer.buttonUrl}
                onChange={(e) => setDraftOffer((prev) => ({ ...prev, buttonUrl: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  min="1"
                  placeholder="Display Order"
                  value={draftOffer.order}
                  onChange={(e) => setDraftOffer((prev) => ({ ...prev, order: Number(e.target.value) || 1 }))}
                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                <label className="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={draftOffer.active !== false}
                    onChange={(e) => setDraftOffer((prev) => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-500 bg-slate-800"
                  />
                  Active on website
                </label>
              </div>

              <button
                onClick={handleSaveOffer}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Save Changes' : 'Add Offer'}
              </button>
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-xl">
            <div>
              <h2 className="text-xl font-bold text-white">Preview</h2>
              <p className="text-sm text-slate-400">This is how the promotional card will appear on the public pages.</p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-slate-700/50 bg-slate-900/70 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                {draftOffer.image ? (
                  <img src={draftOffer.image} alt="Preview poster" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500/30 via-slate-900 to-secondary-500/30">
                    <span className="text-lg font-semibold text-white">Poster Preview</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary-300 backdrop-blur-md">Featured Offer</div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{draftOffer.title || 'Creative Offer'}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{draftOffer.description || 'Short description preview'}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-2.5 text-sm font-semibold text-white">{draftOffer.buttonText || 'Learn More'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Saved Offers</h2>
              <p className="text-sm text-slate-400">Search, reorder, and manage your promotional banners.</p>
            </div>
            <label className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-300">
              <Search size={16} />
              <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none" />
            </label>
          </div>

          <div className="mt-6 grid gap-4">
            {visibleOffers.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-600 bg-slate-800/60 p-6 text-center text-slate-400">No offers yet. Add your first promotional banner.</div>
            )}
            {visibleOffers.map((offer) => (
              <div key={offer.id} className="flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-900/70 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white">
                    {offer.image ? <img src={offer.image} alt={offer.title} className="h-12 w-12 rounded-lg object-cover" /> : <ImageIcon size={18} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{offer.title}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs ${offer.active !== false ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'}`}>
                        {offer.active !== false ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{offer.description || 'No description provided'}</p>
                    <p className="mt-1 text-xs text-slate-500">Order: {offer.order || 1}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => handleReorder(offer.id, -1)} className="rounded-lg border border-slate-600 bg-slate-800/80 p-2 text-slate-300 hover:text-white"><ChevronUp size={16} /></button>
                  <button onClick={() => handleReorder(offer.id, 1)} className="rounded-lg border border-slate-600 bg-slate-800/80 p-2 text-slate-300 hover:text-white"><ChevronDown size={16} /></button>
                  <button onClick={() => handleToggleActive(offer)} className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-slate-300 hover:text-white">
                    {offer.active !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                    {offer.active !== false ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleStartEdit(offer)} className="rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-slate-300 hover:text-white"><Edit3 size={16} className="mr-2 inline" />Edit</button>
                  <button onClick={() => handleDeleteOffer(offer)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20"><Trash2 size={16} className="mr-2 inline" />Delete</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">Page {currentPage} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-50">←</button>
              <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-50">→</button>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
