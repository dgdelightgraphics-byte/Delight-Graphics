import React from 'react'
import { AdminSidebar } from '../components/AdminSidebar'
import { AdminTopbar } from '../components/AdminTopbar'
import { Toast } from '../components/Toast'

export const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <AdminSidebar />
      <AdminTopbar />
      <Toast />
      <div className="ml-64 mt-16">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}
