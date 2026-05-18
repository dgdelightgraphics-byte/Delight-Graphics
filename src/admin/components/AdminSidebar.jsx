import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Zap,
  BookOpen,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Phone,
  Share2,
  Settings,
  Upload,
  LogOut,
} from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
    category: 'main',
  },
  {
    title: 'Hero Section',
    icon: Zap,
    path: '/admin/hero',
    category: 'content',
  },
  {
    title: 'About',
    icon: BookOpen,
    path: '/admin/about',
    category: 'content',
  },
  {
    title: 'Services',
    icon: Briefcase,
    path: '/admin/services',
    category: 'content',
  },
  {
    title: 'Portfolio',
    icon: ImageIcon,
    path: '/admin/portfolio',
    category: 'content',
  },
  {
    title: 'Testimonials',
    icon: MessageSquare,
    path: '/admin/testimonials',
    category: 'content',
  },
  {
    title: 'Team',
    icon: Users,
    path: '/admin/team',
    category: 'content',
  },
  {
    title: 'Contact',
    icon: Phone,
    path: '/admin/contact',
    category: 'settings',
  },
  {
    title: 'Social Media',
    icon: Share2,
    path: '/admin/social-media',
    category: 'settings',
  },
  {
    title: 'Media Manager',
    icon: Upload,
    path: '/admin/media',
    category: 'settings',
  },
  {
    title: 'Website Settings',
    icon: Settings,
    path: '/admin/settings',
    category: 'settings',
  },
]

export const AdminSidebar = () => {
  const { logout } = useAdminAuth()

  const categories = {
    main: 'Main',
    content: 'Content Management',
    settings: 'Settings',
  }

  const groupedItems = {
    main: menuItems.filter((item) => item.category === 'main'),
    content: menuItems.filter((item) => item.category === 'content'),
    settings: menuItems.filter((item) => item.category === 'settings'),
  }

  const sidebarVariants = {
    hidden: { x: -250 },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  }

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 overflow-y-auto z-50"
    >
      <div className="p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
            DG Admin
          </h1>
          <p className="text-xs text-slate-400">Delight Graphics</p>
        </motion.div>
      </div>

      <nav className="px-4 py-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {categories[category]}
            </h3>
            <ul className="space-y-2">
              {items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.path}
                    custom={idx}
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700/50'
                        }`
                      }
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </NavLink>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-gradient-to-t from-slate-900">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
