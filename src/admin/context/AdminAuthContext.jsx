import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../../config/firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUser({ uid: user.uid, email: user.email })
        setIsAuthenticated(true)
      } else {
        setAdminUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      setAdminUser({ uid: user.uid, email: user.email })
      setIsAuthenticated(true)
      return { success: true }
    } catch (err) {
      const message = err?.message || 'Login failed. Check your credentials.'
      setError(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setAdminUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        loading,
        error,
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
