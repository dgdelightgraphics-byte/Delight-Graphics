import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminDataContext = createContext()

const DEFAULT_DATA = {
  hero: {
    heading: 'Welcome to Delight Graphics',
    subheading: 'Premium Digital Design & Development',
    ctaButton1: { text: 'Get Started', link: '#services' },
    ctaButton2: { text: 'Learn More', link: '#about' },
    backgroundEffect: 'gradient',
  },
  about: {
    description:
      'We are a creative digital agency focused on delivering exceptional design and development solutions.',
    mission: 'To empower businesses with innovative digital solutions',
    vision: 'To be the leading digital creative agency',
    images: [],
  },
  services: [
    {
      id: 1,
      title: 'Web Design',
      description: 'Beautiful and responsive web design',
      icon: 'globe',
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Fast and scalable web applications',
      icon: 'code',
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'User-centered design solutions',
      icon: 'palette',
    },
    {
      id: 4,
      title: 'Branding',
      description: 'Complete brand identity solutions',
      icon: 'briefcase',
    },
  ],
  portfolio: [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Modern e-commerce website',
      category: 'Web Design',
      images: [],
      featured: true,
    },
  ],
  testimonials: [
    {
      id: 1,
      clientName: 'John Doe',
      review: 'Excellent service and outstanding results!',
      rating: 5,
      photo: '',
    },
  ],
  team: [
    {
      id: 1,
      name: 'Team Member',
      role: 'Designer',
      photo: '',
      social: { twitter: '', linkedin: '', instagram: '' },
    },
  ],
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'info@delightgraphics.com',
    address: '123 Creative Street, Design City, DC 12345',
    whatsapp: '+1 (555) 123-4567',
    googleMapsEmbed: '',
  },
  socialMedia: {
    instagram: 'https://instagram.com/delightgraphics',
    facebook: 'https://facebook.com/delightgraphics',
    youtube: 'https://youtube.com/delightgraphics',
    linkedin: 'https://linkedin.com/company/delightgraphics',
    behance: 'https://behance.net/delightgraphics',
  },
  settings: {
    darkMode: true,
    seoTitle: 'Delight Graphics | Premium Digital Design & Development',
    seoDescription:
      'Creative digital agency delivering exceptional design and development solutions',
    favicon: '',
    footerText: '© 2024 Delight Graphics. All rights reserved.',
  },
  media: [],
}

export const AdminDataProvider = ({ children }) => {
  const [data, setData] = useState(DEFAULT_DATA)
  const [toast, setToast] = useState(null)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('admin_data')
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admin_data', JSON.stringify(data))
  }, [data])

  const updateHero = (heroData) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...heroData } }))
    showToast('Hero section updated!', 'success')
  }

  const updateAbout = (aboutData) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...aboutData } }))
    showToast('About section updated!', 'success')
  }

  const updateServices = (services) => {
    setData((prev) => ({ ...prev, services }))
    showToast('Services updated!', 'success')
  }

  const addService = (service) => {
    setData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { ...service, id: Date.now() },
      ],
    }))
    showToast('Service added!', 'success')
  }

  const deleteService = (id) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }))
    showToast('Service deleted!', 'success')
  }

  const updatePortfolio = (portfolio) => {
    setData((prev) => ({ ...prev, portfolio }))
    showToast('Portfolio updated!', 'success')
  }

  const addPortfolioItem = (item) => {
    setData((prev) => ({
      ...prev,
      portfolio: [...prev.portfolio, { ...item, id: Date.now() }],
    }))
    showToast('Portfolio item added!', 'success')
  }

  const deletePortfolioItem = (id) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== id),
    }))
    showToast('Portfolio item deleted!', 'success')
  }

  const updateTestimonials = (testimonials) => {
    setData((prev) => ({ ...prev, testimonials }))
    showToast('Testimonials updated!', 'success')
  }

  const addTestimonial = (testimonial) => {
    setData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { ...testimonial, id: Date.now() },
      ],
    }))
    showToast('Testimonial added!', 'success')
  }

  const deleteTestimonial = (id) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }))
    showToast('Testimonial deleted!', 'success')
  }

  const updateTeam = (team) => {
    setData((prev) => ({ ...prev, team }))
    showToast('Team updated!', 'success')
  }

  const addTeamMember = (member) => {
    setData((prev) => ({
      ...prev,
      team: [...prev.team, { ...member, id: Date.now() }],
    }))
    showToast('Team member added!', 'success')
  }

  const deleteTeamMember = (id) => {
    setData((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== id),
    }))
    showToast('Team member deleted!', 'success')
  }

  const updateContact = (contactData) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...contactData } }))
    showToast('Contact information updated!', 'success')
  }

  const updateSocialMedia = (socialData) => {
    setData((prev) => ({ ...prev, socialMedia: { ...prev.socialMedia, ...socialData } }))
    showToast('Social media links updated!', 'success')
  }

  const updateSettings = (settingsData) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...settingsData } }))
    showToast('Settings updated!', 'success')
  }

  const addMedia = (media) => {
    setData((prev) => ({
      ...prev,
      media: [...prev.media, { ...media, id: Date.now() }],
    }))
    showToast('Media uploaded!', 'success')
  }

  const deleteMedia = (id) => {
    setData((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== id),
    }))
    showToast('Media deleted!', 'success')
  }

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <AdminDataContext.Provider
      value={{
        data,
        toast,
        updateHero,
        updateAbout,
        updateServices,
        addService,
        deleteService,
        updatePortfolio,
        addPortfolioItem,
        deletePortfolioItem,
        updateTestimonials,
        addTestimonial,
        deleteTestimonial,
        updateTeam,
        addTeamMember,
        deleteTeamMember,
        updateContact,
        updateSocialMedia,
        updateSettings,
        addMedia,
        deleteMedia,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

export const useAdminData = () => {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData must be used within AdminDataProvider')
  }
  return context
}
