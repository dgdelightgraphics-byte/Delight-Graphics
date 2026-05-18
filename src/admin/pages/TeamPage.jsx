import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

export const TeamPage = () => {
  const { data, addTeamMember, deleteTeamMember, updateTeam } = useAdminData()
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    photo: '',
    social: { twitter: '', linkedin: '', instagram: '' },
  })
  const [editedTeam, setEditedTeam] = useState(data.team)

  const handleAddMember = () => {
    if (newMember.name.trim() && newMember.role.trim()) {
      addTeamMember(newMember)
      setNewMember({ name: '', role: '', photo: '', social: { twitter: '', linkedin: '', instagram: '' } })
      setIsAdding(false)
    }
  }

  const handleSave = () => {
    updateTeam(editedTeam)
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

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
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

        {/* Add Member Form */}
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
                placeholder="Role/Position"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Twitter URL"
                value={newMember.social.twitter}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    social: { ...newMember.social, twitter: e.target.value },
                  })
                }
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={newMember.social.linkedin}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    social: { ...newMember.social, linkedin: e.target.value },
                  })
                }
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Instagram URL"
                value={newMember.social.instagram}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    social: { ...newMember.social, instagram: e.target.value },
                  })
                }
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isEditing ? editedTeam : data.team).map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl"
            >
              {/* Avatar */}
              <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-slate-400">
                [Profile Photo]
              </div>

              {/* Content */}
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
                      value={member.role}
                      onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Twitter"
                      value={member.social?.twitter || ''}
                      onChange={(e) =>
                        handleMemberChange(member.id, 'social', {
                          ...member.social,
                          twitter: e.target.value,
                        })
                      }
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => deleteTeamMember(member.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{member.role}</p>
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
