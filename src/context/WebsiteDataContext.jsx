import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  subscribeToCollection,
  subscribeToDocument,
  getCollectionData,
  getData,
} from '../utils/firestoreService'

const WebsiteDataContext = createContext()

// Default data structure for website content
const DEFAULT_DATA = {
  hero: {
    heading: 'Creative Excellence Meets Digital Innovation',
    subheading: 'Premium Digital Design & Marketing Solutions',
    ctaButton1: { text: 'Get Started', link: '#services' },
    ctaButton2: { text: 'Learn More', link: '#about' },
    backgroundEffect: 'gradient',
  },
  about: {
    description:
      'We are Delight Graphics, a premier creative digital agency specializing in delivering exceptional design, development, and marketing solutions that elevate brands.',
    mission:
      'To empower businesses with innovative digital solutions that drive growth and engagement',
    vision:
      'To be the leading creative digital agency transforming brands through exceptional design and strategy',
    values: ['Innovation', 'Excellence', 'Client-Focused', 'Creative'],
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
      title: 'Social Media Series',
      category: 'Social Media',
      description: 'Engaging content series with 2M+ views',
      images: [],
      featured: true,
    },
    {
      id: '2',
      title: 'Corporate Video',
      category: 'Video Editing',
      description: 'Professional corporate video production',
      images: [],
      featured: true,
    },
    {
      id: '3',
      title: 'Product Photography',
      category: 'Photography',
      description: 'High-end product shoot for e-commerce',
      images: [],
      featured: false,
    },
    {
      id: '4',
      title: 'Animated Explainer',
      category: 'Animation',
      description: 'Custom animated explainer video',
      images: [],
      featured: false,
    },
    {
      id: '5',
      title: 'Digital Campaign',
      category: 'Marketing',
      description: '500% ROI digital marketing campaign',
      images: [],
      featured: false,
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
      role: 'Creative Director',
      photo: '',
      social: { twitter: '', linkedin: '', instagram: '' },
    },
  ],
  stats: [
    { value: '500', label: 'Projects Completed' },
    { value: '150', label: 'Happy Clients' },
    { value: '40+', label: 'Industries' },
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
    seoDescription:
      'Creative digital agency delivering exceptional design and development solutions',
    favicon: '',
    footerText: '© 2024 Delight Graphics. All rights reserved.',
  },
  media: [],
}

export const WebsiteDataProvider = ({ children }) => {
  const [data, setData] = useState(DEFAULT_DATA)
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null)

  const [loadedSections, setLoadedSections] = useState({
    settings: false,
    contact: false,
    hero: false,
    about: false,
    socialMedia: false,
    team: false,
    media: false,
    services: false,
    portfolio: false,
    testimonials: false,
  })

  useEffect(() => {
    if (Object.values(loadedSections).every(Boolean)) {
      setIsLoaded(true)
    }
  }, [loadedSections])

  useEffect(() => {
    const unsubscribers = []

    const captureError = (section, err) => {
      console.error(`${section} snapshot error:`, err)
      setError(err.message || `Realtime update failed for ${section}.`)
    }

    unsubscribers.push(
      subscribeToDocument('siteSettings', 'global', (snapshot) => {
        setData((prev) => ({
          ...prev,
          settings: snapshot ? { ...DEFAULT_DATA.settings, ...snapshot } : DEFAULT_DATA.settings,
        }))
        setLoadedSections((prev) => ({ ...prev, settings: true }))
      }, (err) => captureError('siteSettings', err))
    )

    unsubscribers.push(
      subscribeToDocument('contactInfo', 'main', (snapshot) => {
        setData((prev) => ({
          ...prev,
          contact: snapshot ? { ...DEFAULT_DATA.contact, ...snapshot } : DEFAULT_DATA.contact,
        }))
        setLoadedSections((prev) => ({ ...prev, contact: true }))
      }, (err) => captureError('contactInfo', err))
    )

    unsubscribers.push(
      subscribeToDocument('homepageContent', 'hero', (snapshot) => {
        setData((prev) => ({
          ...prev,
          hero: snapshot ? { ...DEFAULT_DATA.hero, ...snapshot } : DEFAULT_DATA.hero,
        }))
        setLoadedSections((prev) => ({ ...prev, hero: true }))
      }, (err) => captureError('hero', err))
    )

    unsubscribers.push(
      subscribeToDocument('homepageContent', 'about', (snapshot) => {
        setData((prev) => ({
          ...prev,
          about: snapshot ? { ...DEFAULT_DATA.about, ...snapshot } : DEFAULT_DATA.about,
        }))
        setLoadedSections((prev) => ({ ...prev, about: true }))
      }, (err) => captureError('about', err))
    )

    unsubscribers.push(
      subscribeToDocument('homepageContent', 'socialMedia', (snapshot) => {
        setData((prev) => ({
          ...prev,
          socialMedia: snapshot
            ? { ...DEFAULT_DATA.socialMedia, ...snapshot }
            : DEFAULT_DATA.socialMedia,
        }))
        setLoadedSections((prev) => ({ ...prev, socialMedia: true }))
      }, (err) => captureError('socialMedia', err))
    )

    unsubscribers.push(
      subscribeToDocument('homepageContent', 'team', (snapshot) => {
        setData((prev) => ({
          ...prev,
          team: snapshot?.members?.length ? snapshot.members : DEFAULT_DATA.team,
        }))
        setLoadedSections((prev) => ({ ...prev, team: true }))
      }, (err) => captureError('team', err))
    )

    unsubscribers.push(
      subscribeToDocument('homepageContent', 'media', (snapshot) => {
        setData((prev) => ({
          ...prev,
          media: snapshot?.items?.length ? snapshot.items : DEFAULT_DATA.media,
        }))
        setLoadedSections((prev) => ({ ...prev, media: true }))
      }, (err) => captureError('media', err))
    )

    unsubscribers.push(
      subscribeToCollection('services', (items) => {
        setData((prev) => ({
          ...prev,
          services: items.length ? items : DEFAULT_DATA.services,
        }))
        setLoadedSections((prev) => ({ ...prev, services: true }))
      }, (err) => captureError('services', err))
    )

    unsubscribers.push(
      subscribeToCollection('portfolio', (items) => {
        setData((prev) => ({
          ...prev,
          portfolio: items.length ? items : DEFAULT_DATA.portfolio,
        }))
        setLoadedSections((prev) => ({ ...prev, portfolio: true }))
      }, (err) => captureError('portfolio', err))
    )

    unsubscribers.push(
      subscribeToCollection('testimonials', (items) => {
        setData((prev) => ({
          ...prev,
          testimonials: items.length ? items : DEFAULT_DATA.testimonials,
        }))
        setLoadedSections((prev) => ({ ...prev, testimonials: true }))
      }, (err) => captureError('testimonials', err))
    )

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
  }, [])

  const refreshData = async () => {
    try {
      const [settings, contact, hero, about, socialMedia, team, media, services, portfolio, testimonials] = await Promise.all([
        getData('siteSettings', 'global'),
        getData('contactInfo', 'main'),
        getData('homepageContent', 'hero'),
        getData('homepageContent', 'about'),
        getData('homepageContent', 'socialMedia'),
        getData('homepageContent', 'team'),
        getData('homepageContent', 'media'),
        getCollectionData('services'),
        getCollectionData('portfolio'),
        getCollectionData('testimonials'),
      ])

      setData({
        hero: hero ? { ...DEFAULT_DATA.hero, ...hero } : DEFAULT_DATA.hero,
        about: about ? { ...DEFAULT_DATA.about, ...about } : DEFAULT_DATA.about,
        services: services.length ? services : DEFAULT_DATA.services,
        portfolio: portfolio.length ? portfolio : DEFAULT_DATA.portfolio,
        testimonials: testimonials.length ? testimonials : DEFAULT_DATA.testimonials,
        team: team?.members?.length ? team.members : DEFAULT_DATA.team,
        contact: contact ? { ...DEFAULT_DATA.contact, ...contact } : DEFAULT_DATA.contact,
        socialMedia: socialMedia
          ? { ...DEFAULT_DATA.socialMedia, ...socialMedia }
          : DEFAULT_DATA.socialMedia,
        settings: settings ? { ...DEFAULT_DATA.settings, ...settings } : DEFAULT_DATA.settings,
        media: media?.items?.length ? media.items : DEFAULT_DATA.media,
        stats: DEFAULT_DATA.stats,
      })
    } catch (err) {
      console.error('Refresh data failed:', err)
      setError(err.message || 'Unable to refresh website content.')
    }
  }

  return (
    <WebsiteDataContext.Provider value={{ data, isLoaded, error, refreshData }}>
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
