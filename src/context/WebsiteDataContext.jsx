import React, { createContext, useContext, useState, useEffect } from 'react'

const WebsiteDataContext = createContext()

// Default data structure
const DEFAULT_DATA = {
  hero: {
    heading: 'Creative Excellence Meets Digital Innovation',
    subheading: 'Premium Digital Design & Marketing Solutions',
    ctaButton1: { text: 'Get Started', link: '#services' },
    ctaButton2: { text: 'Learn More', link: '#about' },
    backgroundEffect: 'gradient',
  },
  about: {
    description: 'We are Delight Graphics, a premier creative digital agency specializing in delivering exceptional design, development, and marketing solutions that elevate brands.',
    mission: 'To empower businesses with innovative digital solutions that drive growth and engagement',
    vision: 'To be the leading creative digital agency transforming brands through exceptional design and strategy',
    values: ['Innovation', 'Excellence', 'Client-Focused', 'Creative'],
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
      role: 'Creative Director',
      photo: '',
      social: { twitter: '', linkedin: '', instagram: '' },
    },
  ],
  stats: [
    { value: '500', label: 'Projects Completed' },
    { value: '150', label: 'Happy Clients' },
    { value: '50M', label: 'Total Reach' },
    { value: '10', label: 'Years Experience' },
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
    twitter: 'https://twitter.com/delightgraphics',
  },
  settings: {
    darkMode: true,
    seoTitle: 'Delight Graphics | Premium Digital Design & Development',
    seoDescription: 'Creative digital agency delivering exceptional design and development solutions',
    favicon: '',
    footerText: '© 2024 Delight Graphics. All rights reserved.',
  },
  media: [],
}

export const WebsiteDataProvider = ({ children }) => {
  const [data, setData] = useState(DEFAULT_DATA)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('website_data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Merge with defaults to handle new fields
        setData({ ...DEFAULT_DATA, ...parsedData })
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
        setData(DEFAULT_DATA)
      }
    } else {
      setData(DEFAULT_DATA)
    }
    setIsLoaded(true)
  }, [])

  // Save data to localStorage whenever it changes (only if loaded)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('website_data', JSON.stringify(data))
      // Trigger storage event for other tabs/components
      window.dispatchEvent(new Event('websiteDataChanged'))
    }
  }, [data, isLoaded])

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'website_data' && e.newValue) {
        try {
          setData(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Error updating data from storage:', error)
        }
      }
    }

    const handleWebsiteDataChanged = () => {
      const savedData = localStorage.getItem('website_data')
      if (savedData) {
        try {
          const newData = JSON.parse(savedData)
          console.log('🔄 Website: websiteDataChanged event received, updating data', newData)
          setData(newData)
        } catch (error) {
          console.error('Error updating data:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('websiteDataChanged', handleWebsiteDataChanged)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('websiteDataChanged', handleWebsiteDataChanged)
    }
  }, [])

  const updateData = (section, newValue) => {
    setData((prev) => ({
      ...prev,
      [section]: typeof newValue === 'object' ? { ...prev[section], ...newValue } : newValue,
    }))
  }

  return (
    <WebsiteDataContext.Provider value={{ data, updateData, isLoaded }}>
      {children}
    </WebsiteDataContext.Provider>
  )
}

export const useWebsiteData = () => {
  const context = useContext(WebsiteDataContext)
  if (!context) {
    throw new Error('useWebsiteData must be used within WebsiteDataProvider')
  }
  return context
}
