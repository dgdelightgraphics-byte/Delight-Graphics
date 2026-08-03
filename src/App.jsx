import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

// Data Context
import { WebsiteDataProvider } from './context/WebsiteDataContext'

// Admin imports
import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import { AdminDataProvider } from './admin/context/AdminDataContext'
import { ProtectedRoute } from './admin/components/ProtectedRoute'
import { AdminLogin } from './admin/pages/AdminLogin'
import { AdminDashboard } from './admin/pages/Dashboard'
import { HeroPage } from './admin/pages/HeroPage'
import { AboutPage } from './admin/pages/AboutPage'
import { ServicesPage } from './admin/pages/ServicesPage'
import { PromotionalOffersPage } from './admin/pages/PromotionalOffersPage'
import { PortfolioPage } from './admin/pages/PortfolioPage'
import { PortfolioVideoShowcasePage } from './admin/pages/PortfolioVideoShowcasePage'
import { TestimonialsPage } from './admin/pages/TestimonialsPage'
import { TeamPage } from './admin/pages/TeamPage'
import { ContactPage } from './admin/pages/ContactPage'
import { SocialMediaPage } from './admin/pages/SocialMediaPage'
import { MediaPage } from './admin/pages/MediaPage'
import { SettingsPage } from './admin/pages/SettingsPage'

function App() {
  const [isDark, setIsDark] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <WebsiteDataProvider>
      <AdminAuthProvider>
        <AdminDataProvider>
          <Router>
            <AnimatePresence mode="wait">
              {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>
          
          {!isLoading && (
            <>
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/hero"
                    element={
                      <ProtectedRoute>
                        <HeroPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/about"
                    element={
                      <ProtectedRoute>
                        <AboutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/services"
                    element={
                      <ProtectedRoute>
                        <ServicesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/promotional-offers"
                    element={
                      <ProtectedRoute>
                        <PromotionalOffersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/portfolio"
                    element={
                      <ProtectedRoute>
                        <PortfolioPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/portfolio-video-showcase"
                    element={
                      <ProtectedRoute>
                        <PortfolioVideoShowcasePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/testimonials"
                    element={
                      <ProtectedRoute>
                        <TestimonialsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/team"
                    element={
                      <ProtectedRoute>
                        <TeamPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/contact"
                    element={
                      <ProtectedRoute>
                        <ContactPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/social-media"
                    element={
                      <ProtectedRoute>
                        <SocialMediaPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/media"
                    element={
                      <ProtectedRoute>
                        <MediaPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Main Website Routes */}
                  <Route path="/" element={
                    <div className="bg-background-main dark:bg-background-main text-text-primary min-h-screen">
                      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                      <Home />
                      <Footer />
                      <FloatingWhatsApp />
                      <ScrollToTop />
                    </div>
                  } />
                  <Route path="/about" element={
                    <div className="bg-background-main dark:bg-background-main text-text-primary min-h-screen">
                      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                      <About />
                      <Footer />
                      <FloatingWhatsApp />
                      <ScrollToTop />
                    </div>
                  } />
                  <Route path="/services" element={
                    <div className="bg-background-main dark:bg-background-main text-text-primary min-h-screen">
                      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                      <Services />
                      <Footer />
                      <FloatingWhatsApp />
                      <ScrollToTop />
                    </div>
                  } />
                  <Route path="/portfolio" element={
                    <div className="bg-background-main dark:bg-background-main text-text-primary min-h-screen">
                      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                      <Portfolio />
                      <Footer />
                      <FloatingWhatsApp />
                      <ScrollToTop />
                    </div>
                  } />
                  <Route path="/contact" element={
                    <div className="bg-background-main dark:bg-background-main text-text-primary min-h-screen">
                      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                      <Contact />
                      <Footer />
                      <FloatingWhatsApp />
                      <ScrollToTop />
                    </div>
                  } />
                </Routes>
              </AnimatePresence>
            </>
          )}
        </Router>
        </AdminDataProvider>
      </AdminAuthProvider>
    </WebsiteDataProvider>
  )
}

export default App
