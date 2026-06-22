import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  getData,
  getCollectionData,
  subscribeToCollection,
  subscribeToDocument,
  saveData,
  createData,
  deleteData,
} from '../../utils/firestoreService'

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
      id: '1',
      icon: 'TrendingUp',
      title: 'Digital Marketing',
      description: 'Comprehensive strategies to grow your brand online',
    },
    {
      id: '2',
      icon: 'Smartphone',
      title: 'Social Media',
      description: 'Engaging content that connects with your audience',
    },
    {
      id: '3',
      icon: 'Camera',
      title: 'Video Editing',
      description: 'Professional video production and editing services',
    },
    {
      id: '4',
      icon: 'PenTool',
      title: 'Reel Creation',
      description: 'Viral-ready reels and short-form content',
    },
    {
      id: '5',
      icon: 'Palette',
      title: 'Branding',
      description: 'Complete brand identity and strategy development',
    },
    {
      id: '6',
      icon: 'Code',
      title: 'Web Design',
      description: 'Beautiful and functional website design',
    },
  ],
  portfolio: [
    {
      id: '1',
      title: 'Premium Brand Campaign',
      category: 'Branding',
      description: 'Award-winning campaign for luxury brand',
      images: [],
      featured: true,
    },
    {
      id: '2',
      title: 'Social Media Series',
      category: 'Social Media',
      description: 'Engaging content series with 2M+ views',
      images: [],
      featured: true,
    },
    {
      id: '3',
      title: 'Corporate Video',
      category: 'Video Editing',
      description: 'Professional corporate video production',
      images: [],
      featured: true,
    },
    {
      id: '4',
      title: 'Product Photography',
      category: 'Photography',
      description: 'High-end product shoot for e-commerce',
      images: [],
      featured: false,
    },
    {
      id: '5',
      title: 'Animated Explainer',
      category: 'Animation',
      description: 'Custom animated explainer video',
      images: [],
      featured: false,
    },
    {
      id: '6',
      title: 'Digital Campaign',
      category: 'Marketing',
      description: '500% ROI digital marketing campaign',
      images: [],
      featured: false,
    },
    {
      id: '7',
      title: 'Luxury Brand Campaign',
      category: 'Branding',
      description: 'Multi-channel marketing campaign for AMRA & ELMA luxury brand',
      images: ['/portfolio-luxury-brand.jpg'],
      featured: true,
    },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechStart CEO',
      content:
        'Delight Graphics transformed our brand presence. Their creativity and professionalism exceeded expectations.',
      rating: 5,
      image: '',
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Fashion House',
      content:
        'The team delivers stunning visuals that resonate with our audience. Highly recommended for premium brands.',
      rating: 5,
      image: '',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      company: 'Luxury Retail',
      content:
        'Outstanding work across all platforms. They understand premium branding like no one else.',
      rating: 5,
      image: '',
    },
  ],
  team: [
    {
      id: '1',
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const mergeData = (section, payload) => {
    setData((prev) => ({
      ...prev,
      [section]: payload !== null && typeof payload === 'object'
        ? { ...DEFAULT_DATA[section], ...payload }
        : payload,
    }))
  }

  const loadCollections = async () => {
    try {
      const [services, portfolio, testimonials] = await Promise.all([
        getCollectionData('services'),
        getCollectionData('portfolio'),
        getCollectionData('testimonials'),
      ])

      setData((prev) => ({
        ...prev,
        services: services.length ? services : DEFAULT_DATA.services,
        portfolio: portfolio.length ? portfolio : DEFAULT_DATA.portfolio,
        testimonials: testimonials.length ? testimonials : DEFAULT_DATA.testimonials,
      }))
    } catch (err) {
      console.error('AdminData load collections error:', err)
      setError(err.message || 'Failed to load collection data.')
    }
  }

  const loadDocuments = async () => {
    try {
      const [siteSettings, contactInfo, hero, about, socialMedia, team, media] = await Promise.all([
        getData('siteSettings', 'global'),
        getData('contactInfo', 'main'),
        getData('homepageContent', 'hero'),
        getData('homepageContent', 'about'),
        getData('homepageContent', 'socialMedia'),
        getData('homepageContent', 'team'),
        getData('homepageContent', 'media'),
      ])

      setData((prev) => ({
        ...prev,
        settings: siteSettings ? { ...DEFAULT_DATA.settings, ...siteSettings } : DEFAULT_DATA.settings,
        contact: contactInfo ? { ...DEFAULT_DATA.contact, ...contactInfo } : DEFAULT_DATA.contact,
        hero: hero ? { ...DEFAULT_DATA.hero, ...hero } : DEFAULT_DATA.hero,
        about: about ? { ...DEFAULT_DATA.about, ...about } : DEFAULT_DATA.about,
        socialMedia: socialMedia ? { ...DEFAULT_DATA.socialMedia, ...socialMedia } : DEFAULT_DATA.socialMedia,
        team: team?.members?.length ? team.members : DEFAULT_DATA.team,
        media: media?.items?.length ? media.items : DEFAULT_DATA.media,
      }))
    } catch (err) {
      console.error('AdminData load documents error:', err)
      setError(err.message || 'Failed to load document data.')
    }
  }

  useEffect(() => {
    setLoading(true)

    const subscribeAndSet = () => {
      const unsubscribers = []

      unsubscribers.push(
        subscribeToDocument('siteSettings', 'global', (snapshot) => {
          setData((prev) => ({
            ...prev,
            settings: snapshot ? { ...DEFAULT_DATA.settings, ...snapshot } : DEFAULT_DATA.settings,
          }))
        }, (err) => {
          console.error('siteSettings snapshot error:', err)
          setError(err.message || 'Realtime update failed for site settings.')
        })
      )

      unsubscribers.push(
        subscribeToDocument('contactInfo', 'main', (snapshot) => {
          setData((prev) => ({
            ...prev,
            contact: snapshot ? { ...DEFAULT_DATA.contact, ...snapshot } : DEFAULT_DATA.contact,
          }))
        }, (err) => {
          console.error('contactInfo snapshot error:', err)
          setError(err.message || 'Realtime update failed for contact info.')
        })
      )

      unsubscribers.push(
        subscribeToDocument('homepageContent', 'hero', (snapshot) => {
          setData((prev) => ({
            ...prev,
            hero: snapshot ? { ...DEFAULT_DATA.hero, ...snapshot } : DEFAULT_DATA.hero,
          }))
        }, (err) => {
          console.error('hero snapshot error:', err)
          setError(err.message || 'Realtime update failed for hero content.')
        })
      )

      unsubscribers.push(
        subscribeToDocument('homepageContent', 'about', (snapshot) => {
          setData((prev) => ({
            ...prev,
            about: snapshot ? { ...DEFAULT_DATA.about, ...snapshot } : DEFAULT_DATA.about,
          }))
        }, (err) => {
          console.error('about snapshot error:', err)
          setError(err.message || 'Realtime update failed for about content.')
        })
      )

      unsubscribers.push(
        subscribeToDocument('homepageContent', 'socialMedia', (snapshot) => {
          setData((prev) => ({
            ...prev,
            socialMedia: snapshot ? { ...DEFAULT_DATA.socialMedia, ...snapshot } : DEFAULT_DATA.socialMedia,
          }))
        }, (err) => {
          console.error('socialMedia snapshot error:', err)
          setError(err.message || 'Realtime update failed for social media.')
        })
      )

      unsubscribers.push(
        subscribeToDocument('homepageContent', 'team', (snapshot) => {
          setData((prev) => ({
            ...prev,
            team: snapshot?.members?.length ? snapshot.members : DEFAULT_DATA.team,
          }))
        }, (err) => {
          console.error('team snapshot error:', err)
          setError(err.message || 'Realtime update failed for team content.')
        })
      )

      unsubscribers.push(
        subscribeToDocument('homepageContent', 'media', (snapshot) => {
          setData((prev) => ({
            ...prev,
            media: snapshot?.items?.length ? snapshot.items : DEFAULT_DATA.media,
          }))
        }, (err) => {
          console.error('media snapshot error:', err)
          setError(err.message || 'Realtime update failed for media content.')
        })
      )

      unsubscribers.push(
        subscribeToCollection('services', (items) => {
          setData((prev) => ({
            ...prev,
            services: items.length ? items : DEFAULT_DATA.services,
          }))
        }, (err) => {
          console.error('services snapshot error:', err)
          setError(err.message || 'Realtime update failed for services.')
        })
      )

      unsubscribers.push(
        subscribeToCollection('portfolio', (items) => {
          setData((prev) => ({
            ...prev,
            portfolio: items.length ? items : DEFAULT_DATA.portfolio,
          }))
        }, (err) => {
          console.error('portfolio snapshot error:', err)
          setError(err.message || 'Realtime update failed for portfolio.')
        })
      )

      unsubscribers.push(
        subscribeToCollection('testimonials', (items) => {
          setData((prev) => ({
            ...prev,
            testimonials: items.length ? items : DEFAULT_DATA.testimonials,
          }))
        }, (err) => {
          console.error('testimonials snapshot error:', err)
          setError(err.message || 'Realtime update failed for testimonials.')
        })
      )

      return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
    }

    loadDocuments()
    loadCollections()
    const cleanup = subscribeAndSet()
    setLoading(false)

    return cleanup
  }, [])

  const syncCollection = async (collectionName, items) => {
    const existingItems = await getCollectionData(collectionName)
    const existingIds = existingItems.map((item) => String(item.id))
    const newIds = items.map((item) => String(item.id))

    const deleteOps = existingIds
      .filter((id) => !newIds.includes(id))
      .map((id) => deleteData(collectionName, id))

    const saveOps = items.map((item) =>
      saveData(collectionName, String(item.id), {
        ...item,
        id: String(item.id),
      })
    )

    await Promise.all([...deleteOps, ...saveOps])
  }

  const handleSave = async (operation, successMessage) => {
    try {
      await operation()
      showToast(successMessage, 'success')
    } catch (err) {
      console.error('Admin update error:', err)
      setError(err.message || 'Update failed.')
      showToast(err.message || 'Update failed.', 'error')
    }
  }

  const updateHero = async (heroData) => {
    await handleSave(
      () => saveData('homepageContent', 'hero', { ...heroData }),
      'Hero section updated!'
    )
    mergeData('hero', heroData)
  }

  const updateAbout = async (aboutData) => {
    await handleSave(
      () => saveData('homepageContent', 'about', { ...aboutData }),
      'About section updated!'
    )
    mergeData('about', aboutData)
  }

  const updateServices = async (services) => {
    await handleSave(
      () => syncCollection('services', services),
      'Services updated!'
    )
    setData((prev) => ({ ...prev, services }))
  }

  const addService = async (service) => {
    const newService = { ...service, id: String(Date.now()) }
    await handleSave(
      () => createData('services', newService),
      'Service added!'
    )
    setData((prev) => ({ ...prev, services: [...prev.services, newService] }))
  }

  const deleteService = async (id) => {
    await handleSave(
      () => deleteData('services', String(id)),
      'Service deleted!'
    )
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => String(s.id) !== String(id)),
    }))
  }

  const updatePortfolio = async (portfolio) => {
    await handleSave(
      () => syncCollection('portfolio', portfolio),
      'Portfolio updated!'
    )
    setData((prev) => ({ ...prev, portfolio }))
  }

  const addPortfolioItem = async (item) => {
    const newItem = { ...item, id: String(Date.now()) }
    await handleSave(
      () => createData('portfolio', newItem),
      'Portfolio item added!'
    )
    setData((prev) => ({ ...prev, portfolio: [...prev.portfolio, newItem] }))
  }

  const deletePortfolioItem = async (id) => {
    await handleSave(
      () => deleteData('portfolio', String(id)),
      'Portfolio item deleted!'
    )
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => String(p.id) !== String(id)),
    }))
  }

  const updateTestimonials = async (testimonials) => {
    await handleSave(
      () => syncCollection('testimonials', testimonials),
      'Testimonials updated!'
    )
    setData((prev) => ({ ...prev, testimonials }))
  }

  const addTestimonial = async (testimonial) => {
    const newTestimonial = { ...testimonial, id: String(Date.now()) }
    await handleSave(
      () => createData('testimonials', newTestimonial),
      'Testimonial added!'
    )
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newTestimonial],
    }))
  }

  const deleteTestimonial = async (id) => {
    await handleSave(
      () => deleteData('testimonials', String(id)),
      'Testimonial deleted!'
    )
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => String(t.id) !== String(id)),
    }))
  }

  const updateTeam = async (team) => {
    await handleSave(
      () => saveData('homepageContent', 'team', { members: team }),
      'Team updated!'
    )
    setData((prev) => ({ ...prev, team }))
  }

  const addTeamMember = async (member) => {
    const newMember = { ...member, id: String(Date.now()) }
    const nextTeam = [...data.team, newMember]
    await handleSave(
      () => saveData('homepageContent', 'team', { members: nextTeam }),
      'Team member added!'
    )
    setData((prev) => ({ ...prev, team: nextTeam }))
  }

  const deleteTeamMember = async (id) => {
    const nextTeam = data.team.filter((m) => String(m.id) !== String(id))
    await handleSave(
      () => saveData('homepageContent', 'team', { members: nextTeam }),
      'Team member deleted!'
    )
    setData((prev) => ({ ...prev, team: nextTeam }))
  }

  const updateContact = async (contactData) => {
    await handleSave(
      () => saveData('contactInfo', 'main', contactData),
      'Contact information updated!'
    )
    mergeData('contact', contactData)
  }

  const updateSocialMedia = async (socialData) => {
    await handleSave(
      () => saveData('homepageContent', 'socialMedia', socialData),
      'Social media links updated!'
    )
    mergeData('socialMedia', socialData)
  }

  const updateSettings = async (settingsData) => {
    await handleSave(
      () => saveData('siteSettings', 'global', settingsData),
      'Settings updated!'
    )
    mergeData('settings', settingsData)
  }

  const addMedia = async (media) => {
    const newMedia = { ...media, id: String(Date.now()) }
    const nextMedia = [...data.media, newMedia]
    await handleSave(
      () => saveData('homepageContent', 'media', { items: nextMedia }),
      'Media uploaded!'
    )
    setData((prev) => ({ ...prev, media: nextMedia }))
  }

  const deleteMedia = async (id) => {
    const nextMedia = data.media.filter((m) => String(m.id) !== String(id))
    await handleSave(
      () => saveData('homepageContent', 'media', { items: nextMedia }),
      'Media deleted!'
    )
    setData((prev) => ({ ...prev, media: nextMedia }))
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
        loading,
        error,
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
