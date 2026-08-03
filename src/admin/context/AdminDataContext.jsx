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
import { deleteCloudinaryImage } from '../../utils/cloudinaryService'

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
  services: [],
  promotionalOffers: [],
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
      clientImage: '',
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Fashion House',
      content:
        'The team delivers stunning visuals that resonate with our audience. Highly recommended for premium brands.',
      rating: 5,
      image: '',
      clientImage: '',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      company: 'Luxury Retail',
      content:
        'Outstanding work across all platforms. They understand premium branding like no one else.',
      rating: 5,
      image: '',
      clientImage: '',
    },
  ],
  portfolioVideoShowcase: [],
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
  branding: {
    logo: '/logo-default.png',
    favicon: '',
  },
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
      const [services, portfolio, testimonials, portfolioVideoShowcase, promotionalOffers] = await Promise.all([
        getCollectionData('services'),
        getCollectionData('portfolio'),
        getCollectionData('testimonials'),
        getCollectionData('portfolioVideoShowcase'),
        getCollectionData('promotionalOffers'),
      ])

      setData((prev) => ({
        ...prev,
        services: services.length ? services : DEFAULT_DATA.services,
        portfolio: portfolio.length ? portfolio : DEFAULT_DATA.portfolio,
        testimonials: testimonials.length ? testimonials : DEFAULT_DATA.testimonials,
        portfolioVideoShowcase: portfolioVideoShowcase.length ? portfolioVideoShowcase : DEFAULT_DATA.portfolioVideoShowcase,
        promotionalOffers: promotionalOffers.length ? promotionalOffers : DEFAULT_DATA.promotionalOffers,
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
        subscribeToDocument('siteSettings', 'branding', (snapshot) => {
          setData((prev) => ({
            ...prev,
            branding: snapshot ? { ...DEFAULT_DATA.branding, ...snapshot } : DEFAULT_DATA.branding,
          }))
        }, (err) => {
          console.error('branding snapshot error:', err)
          setError(err.message || 'Realtime update failed for branding.')
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

      unsubscribers.push(
        subscribeToCollection('promotionalOffers', (items) => {
          setData((prev) => ({
            ...prev,
            promotionalOffers: items.length ? items : DEFAULT_DATA.promotionalOffers,
          }))
        }, (err) => {
          console.error('promotionalOffers snapshot error:', err)
          setError(err.message || 'Realtime update failed for promotional offers.')
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
      const result = await operation()
      showToast(successMessage, 'success')
      return result
    } catch (err) {
      console.error('Admin update error:', err)
      setError(err.message || 'Update failed.')
      showToast(err.message || 'Update failed.', 'error')
      throw err
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
    const normalizedServices = services.map((service) => ({
      ...service,
      id: String(service.id),
      name: service.name || service.title || '',
      description: service.description || '',
      image: service.image || service.coverImage || '',
      url: service.url || service.destinationUrl || '',
      active: service.active !== false && service.isActive !== false,
      order: Number(service.order ?? service.displayOrder ?? 1),
      createdAt: service.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    await handleSave(
      () => syncCollection('services', normalizedServices),
      'Services updated!'
    )
    setData((prev) => ({ ...prev, services: normalizedServices }))
  }

  const addService = async (service) => {
    const newService = {
      ...service,
      id: String(Date.now()),
      name: service.name || service.title || '',
      description: service.description || '',
      image: service.image || service.coverImage || '',
      url: service.url || service.destinationUrl || '',
      active: service.active !== false && service.isActive !== false,
      order: Number(service.order ?? service.displayOrder ?? 1),
      createdAt: service.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const savedService = await handleSave(
      async () => {
        const created = await createData('services', newService)
        return created
      },
      'Service added!'
    )
    const finalService = savedService && typeof savedService === 'object' ? savedService : newService
    setData((prev) => ({ ...prev, services: [...prev.services, finalService] }))
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

  const updatePortfolioVideoShowcase = async (showcaseItems) => {
    await handleSave(
      () => syncCollection('portfolioVideoShowcase', showcaseItems),
      'Portfolio video showcase updated!'
    )
    setData((prev) => ({ ...prev, portfolioVideoShowcase: showcaseItems }))
  }

  const addPortfolioVideoShowcase = async (item) => {
    const newItem = { ...item, id: String(Date.now()) }
    const nextItems = [...(data.portfolioVideoShowcase || []), newItem]
    await handleSave(
      () => createData('portfolioVideoShowcase', newItem),
      'Showcase item added!'
    )
    setData((prev) => ({ ...prev, portfolioVideoShowcase: nextItems }))
  }

  const deletePortfolioVideoShowcase = async (id) => {
    const nextItems = (data.portfolioVideoShowcase || []).filter((item) => String(item.id) !== String(id))
    await handleSave(
      () => deleteData('portfolioVideoShowcase', String(id)),
      'Showcase item deleted!'
    )
    setData((prev) => ({ ...prev, portfolioVideoShowcase: nextItems }))
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

  const updatePromotionalOffers = async (offers) => {
    const normalizedOffers = offers.map((offer) => ({
      ...offer,
      id: String(offer.id),
      title: offer.title || '',
      description: offer.description || '',
      image: offer.image || '',
      buttonText: offer.buttonText || 'Learn More',
      buttonUrl: offer.buttonUrl || '',
      active: offer.active !== false,
      order: Number(offer.order || 1),
      createdAt: offer.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    await handleSave(
      () => syncCollection('promotionalOffers', normalizedOffers),
      'Promotional offers updated!'
    )
    setData((prev) => ({ ...prev, promotionalOffers: normalizedOffers }))
  }

  const addPromotionalOffer = async (offer) => {
    const newOffer = {
      ...offer,
      id: String(Date.now()),
      title: offer.title || '',
      description: offer.description || '',
      image: offer.image || '',
      buttonText: offer.buttonText || 'Learn More',
      buttonUrl: offer.buttonUrl || '',
      active: offer.active !== false,
      order: Number(offer.order || 1),
      createdAt: offer.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await handleSave(
      () => createData('promotionalOffers', newOffer),
      'Promotional offer added!'
    )
    setData((prev) => ({ ...prev, promotionalOffers: [...prev.promotionalOffers, newOffer] }))
  }

  const deletePromotionalOffer = async (id) => {
    await handleSave(
      () => deleteData('promotionalOffers', String(id)),
      'Promotional offer deleted!'
    )
    setData((prev) => ({
      ...prev,
      promotionalOffers: prev.promotionalOffers.filter((offer) => String(offer.id) !== String(id)),
    }))
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
    const newMember = {
      ...member,
      id: String(Date.now()),
      designation: member.designation || member.role || '',
      role: member.designation || member.role || '',
      image: member.image || member.photo || '',
      photo: member.image || member.photo || '',
      bio: member.bio || '',
      displayOrder: Number(member.displayOrder) || 1,
      active: member.active !== false,
    }
    const nextTeam = [...data.team, newMember]
    await handleSave(
      () => saveData('homepageContent', 'team', { members: nextTeam }),
      'Team member added!'
    )
    setData((prev) => ({ ...prev, team: nextTeam }))
  }

  const deleteTeamMember = async (id) => {
    const memberToDelete = data.team.find((m) => String(m.id) === String(id))
    const imageUrl = memberToDelete?.image || memberToDelete?.photo || ''
    if (imageUrl) {
      await deleteCloudinaryImage(imageUrl)
    }
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

  const updateBranding = async (brandingData) => {
    await handleSave(
      () => saveData('siteSettings', 'branding', { ...brandingData }),
      'Branding updated!'
    )
    mergeData('branding', brandingData)
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
        updatePortfolioVideoShowcase,
        addPortfolioVideoShowcase,
        deletePortfolioVideoShowcase,
        updateTestimonials,
        addTestimonial,
        deleteTestimonial,
        updatePromotionalOffers,
        addPromotionalOffer,
        deletePromotionalOffer,
        updateTeam,
        addTeamMember,
        deleteTeamMember,
        updateContact,
        updateSocialMedia,
        updateBranding,
        updateSettings,
        addMedia,
        deleteMedia,
        showToast,
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
