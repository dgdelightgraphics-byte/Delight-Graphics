import React from 'react'
import { motion } from 'framer-motion'
import { Users, FileText, Image, MessageSquare, BarChart3, Activity } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import { AdminLayout } from './AdminLayout'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-gradient-to-br ${color} p-6 rounded-xl border border-white/10 backdrop-blur-xl`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-300 text-sm mb-2">{label}</p>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
      <Icon size={40} className="text-white/50" />
    </div>
  </motion.div>
)

export const AdminDashboard = () => {
  const { data } = useAdminData()

  const stats = [
    {
      label: 'Total Services',
      value: data.services.length,
      icon: BarChart3,
      color: 'from-blue-600/20 to-blue-400/10',
    },
    {
      label: 'Portfolio Items',
      value: data.portfolio.length,
      icon: Image,
      color: 'from-purple-600/20 to-purple-400/10',
    },
    {
      label: 'Testimonials',
      value: data.testimonials.length,
      icon: MessageSquare,
      color: 'from-pink-600/20 to-pink-400/10',
    },
    {
      label: 'Team Members',
      value: data.team.length,
      icon: Users,
      color: 'from-emerald-600/20 to-emerald-400/10',
    },
  ]

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Welcome back!
          </motion.h1>
          <p className="text-slate-400">
            Here's what's happening with your website today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Content Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity size={24} />
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Update Hero Section', desc: 'Edit heading and CTA buttons' },
                { title: 'Manage Services', desc: 'Add, edit or delete services' },
                { title: 'Portfolio Items', desc: 'Showcase your latest work' },
                { title: 'Manage Team', desc: 'Update team member information' },
              ].map((action, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-white text-sm">{action.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{action.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText size={24} />
              Website Overview
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                <span className="text-slate-300">Hero Section</span>
                <span className="text-green-400 text-sm font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                <span className="text-slate-300">About Section</span>
                <span className="text-green-400 text-sm font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                <span className="text-slate-300">Contact Form</span>
                <span className="text-green-400 text-sm font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Dark Mode</span>
                <span className="text-blue-400 text-sm font-semibold">Enabled</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl"
        >
          <h3 className="text-white font-semibold mb-2">📌 Tip</h3>
          <p className="text-slate-300 text-sm">
            All changes you make in the admin panel are automatically saved to your website. Use the sidebar to
            navigate between different sections and manage your website content with ease.
          </p>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}
