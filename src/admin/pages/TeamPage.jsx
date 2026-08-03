import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'
import {
  ALLOWED_TESTIMONIAL_IMAGE_TYPES,
  MAX_TESTIMONIAL_IMAGE_SIZE_BYTES,
  deleteCloudinaryImage,
  uploadImageToCloudinary,
  validateImageUpload,
} from '../../utils/cloudinaryService'

const createEmptyMember = () => ({
  name: '',
  designation: '',
  bio: '',
  displayOrder: 1,
  active: true,
  image: '',
  photo: '',
  social: { twitter: '', linkedin: '', instagram: '' },
})

export const TeamPage = () => {
  const { data, addTeamMember, deleteTeamMember, updateTeam } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newMember, setNewMember] = useState(createEmptyMember())
  const [editedTeam, setEditedTeam] = useState(data.team)
  const [uploadingState, setUploadingState] = useState({ type: 'idle', progress: 0, message: '', targetId: null })
  const [selectedImagePreview, setSelectedImagePreview] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')
  const acceptedTypesLabel = useMemo(
    () => ALLOWED_TESTIMONIAL_IMAGE_TYPES.map((type) => type.split('/')[1].toUpperCase()).join(', '),
    []
  )

  const resetUploadState = () => {
    setUploadingState({ type: 'idle', progress: 0, message: '', targetId: null })
    setSelectedImagePreview('')
    setSelectedFileName('')
  }

  const handleImageSelection = async (event, target, isNew = false) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validation = validateImageUpload(file, MAX_TESTIMONIAL_IMAGE_SIZE_BYTES, ALLOWED_TESTIMONIAL_IMAGE_TYPES)
    if (!validation.valid) {
      setUploadingState({ type: 'error', progress: 0, message: validation.error, targetId: isNew ? 'new' : target.id })
      return
    }

    const previewUrl = URL.createObjectURL(file)
    if (isNew) {
      setSelectedImagePreview(previewUrl)
      setSelectedFileName(file.name)
    }

    setUploadingState({ type: 'uploading', progress: 0, message: 'Uploading profile photo...', targetId: isNew ? 'new' : target.id })

    try {
      const url = await uploadImageToCloudinary(file, 'team', (percent) => {
        setUploadingState({ type: 'uploading', progress: percent, message: 'Uploading profile photo...', targetId: isNew ? 'new' : target.id })
      })

      if (isNew) {
        setNewMember((prev) => ({ ...prev, image: url, photo: url }))
      } else {
        handleMemberChange(target.id, 'image', url)
        handleMemberChange(target.id, 'photo', url)
      }

      setUploadingState({ type: 'success', progress: 100, message: 'Profile photo uploaded successfully.', targetId: isNew ? 'new' : target.id })
    } catch (error) {
      if (isNew) {
        setNewMember((prev) => ({ ...prev, image: '', photo: '' }))
      } else {
        handleMemberChange(target.id, 'image', '')
        handleMemberChange(target.id, 'photo', '')
      }
      setUploadingState({ type: 'error', progress: 0, message: error.message || 'Image upload failed.', targetId: isNew ? 'new' : target.id })
    }
  }

  const handleAddMember = async () => {
    if (newMember.name.trim() && (newMember.designation.trim() || newMember.role?.trim())) {
      const normalizedMember = {
        ...newMember,
        id: String(Date.now()),
        name: newMember.name.trim(),
        designation: newMember.designation.trim() || newMember.role?.trim() || '',
        role: newMember.designation.trim() || newMember.role?.trim() || '',
        bio: newMember.bio.trim(),
        image: newMember.image || newMember.photo || '',
        photo: newMember.image || newMember.photo || '',
        displayOrder: Number(newMember.displayOrder) || 1,
        active: newMember.active !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await addTeamMember(normalizedMember)
      setNewMember(createEmptyMember())
      resetUploadState()
      setIsAdding(false)
    }
  }

  const handleSave = async () => {
    const normalizedTeam = editedTeam.map((member, index) => ({
      ...member,
      name: member.name?.trim() || '',
      designation: member.designation?.trim() || member.role?.trim() || '',
      role: member.designation?.trim() || member.role?.trim() || '',
      bio: member.bio?.trim() || '',
      image: member.image || member.photo || '',
      photo: member.image || member.photo || '',
      displayOrder: Number(member.displayOrder) || index + 1,
      active: member.active !== false,
      updatedAt: member.updatedAt || new Date().toISOString(),
    }))
    await updateTeam(normalizedTeam)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTeam(data.team)
    setIsEditing(false)
  }

  const handleMemberChange = (id, field, value) => {
    setEditedTeam((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    )
  }

  const handleRemoveImage = async (member) => {
    const imageUrl = member.image || member.photo
    if (imageUrl) {
      await deleteCloudinaryImage(imageUrl)
    }
    handleMemberChange(member.id, 'image', '')
    handleMemberChange(member.id, 'photo', '')
  }

  const handleDeleteMember = async (member) => {
    const imageUrl = member.image || member.photo
    if (imageUrl) {
      await deleteCloudinaryImage(imageUrl)
    }
    await deleteTeamMember(member.id)
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Team Members</h1>
            <p className="text-slate-400">Manage your team</p>
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
                  Add Member
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

        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New Team Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Designation"
                value={newMember.designation}
                onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Short Bio"
                value={newMember.bio}
                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                className="md:col-span-2 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="number"
                min="1"
                placeholder="Display Order"
                value={newMember.displayOrder}
                onChange={(e) => setNewMember({ ...newMember, displayOrder: Number(e.target.value) || 1 })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <label className="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={newMember.active}
                  onChange={(e) => setNewMember({ ...newMember, active: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-500 bg-slate-800"
                />
                Active member
              </label>
              <div className="md:col-span-2 rounded-lg border border-dashed border-slate-600 bg-slate-700/30 p-4">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-3 text-sm font-medium text-slate-300 hover:border-blue-500 hover:text-blue-300">
                  <Upload size={16} />
                  {newMember.image ? 'Replace Profile Photo' : 'Upload Profile Photo'}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleImageSelection(e, newMember, true)}
                  />
                </label>
                <p className="mt-2 text-xs text-slate-400">Accepted: {acceptedTypesLabel}. Max size: 3MB.</p>
                {uploadingState.targetId === 'new' && uploadingState.message && (
                  <div className={`mt-3 text-sm ${uploadingState.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {uploadingState.message}
                    {uploadingState.type === 'uploading' && ` ${uploadingState.progress}%`}
                  </div>
                )}
                {(selectedImagePreview || newMember.image) && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-slate-600">
                    <img
                      src={selectedImagePreview || newMember.image}
                      alt="Preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
                {selectedFileName && <p className="mt-2 text-sm text-slate-400">Selected: {selectedFileName}</p>}
              </div>
              <input
                type="text"
                placeholder="Twitter URL"
                value={newMember.social.twitter}
                onChange={(e) => setNewMember({ ...newMember, social: { ...newMember.social, twitter: e.target.value } })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={newMember.social.linkedin}
                onChange={(e) => setNewMember({ ...newMember, social: { ...newMember.social, linkedin: e.target.value } })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Instagram URL"
                value={newMember.social.instagram}
                onChange={(e) => setNewMember({ ...newMember, social: { ...newMember.social, instagram: e.target.value } })}
                className="md:col-span-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddMember}
                className="md:col-span-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Add Member
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isEditing ? editedTeam : data.team).map((member, idx) => {
            const imageUrl = member.image || member.photo || ''
            const title = member.designation || member.role || 'Team Member'
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl"
              >
                <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-slate-400 overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-5xl font-bold text-slate-300">{member.name?.charAt(0) || 'T'}</span>
                  )}
                </div>

                <div className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={member.designation || member.role || ''}
                        onChange={(e) => handleMemberChange(member.id, 'designation', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                      <textarea
                        rows="2"
                        value={member.bio || ''}
                        onChange={(e) => handleMemberChange(member.id, 'bio', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        value={member.displayOrder || 1}
                        onChange={(e) => handleMemberChange(member.id, 'displayOrder', Number(e.target.value) || 1)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                      <label className="flex items-center gap-3 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={member.active !== false}
                          onChange={(e) => handleMemberChange(member.id, 'active', e.target.checked)}
                          className="h-4 w-4 rounded border-slate-500 bg-slate-800"
                        />
                        Active member
                      </label>
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-blue-300">
                        <Upload size={14} />
                        {imageUrl ? 'Replace Photo' : 'Upload Photo'}
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleImageSelection(e, member, false)}
                        />
                      </label>
                      {uploadingState.targetId === member.id && uploadingState.message && (
                        <div className={`text-sm ${uploadingState.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                          {uploadingState.message}
                          {uploadingState.type === 'uploading' && ` ${uploadingState.progress}%`}
                        </div>
                      )}
                      {imageUrl && (
                        <button
                          onClick={() => handleRemoveImage(member)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/70 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm"
                        >
                          <ImageIcon size={14} />
                          Remove Image
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMember(member)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-slate-400 text-sm mb-4">{title}</p>
                      {member.bio && <p className="text-slate-400 text-sm mb-4">{member.bio}</p>}
                      <div className="flex gap-2 justify-center pt-3 border-t border-slate-700">
                        {member.social?.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors text-xs">
                            Twitter
                          </a>
                        )}
                        {member.social?.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors text-xs">
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
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
