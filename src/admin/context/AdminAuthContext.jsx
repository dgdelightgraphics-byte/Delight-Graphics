import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Admin credentials loaded from environment variables
  const ADMIN_CREDENTIALS = {
    username: import.meta.env.VITE_ADMIN_USERNAME || '',
    password: import.meta.env.VITE_ADMIN_PASSWORD || '',
  }

  // Check for existing session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem('admin_session')
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData)
        setAdminUser(user)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('admin_session')
      }
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user = {
        username,
        loginTime: new Date().toISOString(),
      }
      setAdminUser(user)
      setIsAuthenticated(true)
      localStorage.setItem('admin_session', JSON.stringify(user))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setAdminUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('admin_session')
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
