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
      icon: 'TrendingUp',
      title: 'Digital Marketing',
      description: 'Comprehensive strategies to grow your brand online',
    },
    {
      id: 2,
      icon: 'Smartphone',
      title: 'Social Media',
      description: 'Engaging content that connects with your audience',
    },
    {
      id: 3,
      icon: 'Camera',
      title: 'Video Editing',
      description: 'Professional video production and editing services',
    },
    {
      id: 4,
      icon: 'PenTool',
      title: 'Reel Creation',
      description: 'Viral-ready reels and short-form content',
    },
    {
      id: 5,
      icon: 'Palette',
      title: 'Branding',
      description: 'Complete brand identity and strategy development',
    },
    {
      id: 6,
      icon: 'Code',
      title: 'Web Design',
      description: 'Beautiful and functional website design',
    },
  ],
  portfolio: [
    {
      id: 1,
      title: 'Premium Brand Campaign',
      category: 'Branding',
      description: 'Award-winning campaign for luxury brand',
      images: [],
      featured: true,
    },
    {
      id: 2,
      title: 'Social Media Series',
      category: 'Social Media',
      description: 'Engaging content series with 2M+ views',
      images: [],
      featured: true,
    },
    {
      id: 3,
      title: 'Corporate Video',
      category: 'Video Editing',
      description: 'Professional corporate video production',
      images: [],
      featured: true,
    },
    {
      id: 4,
      title: 'Product Photography',
      category: 'Photography',
      description: 'High-end product shoot for e-commerce',
      images: [],
      featured: false,
    },
    {
      id: 5,
      title: 'Animated Explainer',
      category: 'Animation',
      description: 'Custom animated explainer video',
      images: [],
      featured: false,
    },
    {
      id: 6,
      title: 'Digital Campaign',
      category: 'Marketing',
      description: '500% ROI digital marketing campaign',
      images: [],
      featured: false,
    },
    {
      id: 7,
      title: 'Luxury Brand Campaign',
      category: 'Branding',
      description: 'Multi-channel marketing campaign for AMRA & ELMA luxury brand',
      images: ['/portfolio-luxury-brand.jpg'],
      featured: true,
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechStart CEO',
      content: 'Delight Graphics transformed our brand presence. Their creativity and professionalism exceeded expectations.',
      rating: 5,
      image: '',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Fashion House',
      content: 'The team delivers stunning visuals that resonate with our audience. Highly recommended for premium brands.',
      rating: 5,
      image: '',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      company: 'Luxury Retail',
      content: 'Outstanding work across all platforms. They understand premium branding like no one else.',
      rating: 5,
      image: '',
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
    // Check for website_data first (shared with website), then fall back to admin_data
    const savedData = localStorage.getItem('website_data') || localStorage.getItem('admin_data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Merge with defaults to handle new fields
        setData({ ...DEFAULT_DATA, ...parsedData })
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('website_data', JSON.stringify(data))
    // Trigger event to notify website components of changes
    console.log('✅ Admin: Saved to localStorage and triggered websiteDataChanged event', data)
    window.dispatchEvent(new Event('websiteDataChanged'))
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
