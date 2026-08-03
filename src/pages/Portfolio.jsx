import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Play } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PortfolioCard from '../components/PortfolioCard'
import TestimonialsSection from '../components/TestimonialsSection'
import { useWebsiteData } from '../context/WebsiteDataContext'

const portfolioItems = [
  {
    title: 'Luxury Brand Campaign',
    category: 'Branding',
    description: 'Award-winning brand identity and campaign design',
  },
  {
    title: 'Social Content Series',
    category: 'Social Media',
    description: 'Viral content series with 2M+ organic reach',
  },
  {
    title: 'Corporate Video',
    category: 'Video',
    description: 'Professional corporate video with motion graphics',
  },
  {
    title: 'E-Commerce Shots',
    category: 'Photography',
    description: 'High-end product photography for luxury e-commerce',
  },
  {
    title: 'Animated Explainer',
    category: 'Animation',
    description: 'Custom 2D animation video for SaaS startup',
  },
  {
    title: 'Digital Campaign',
    category: 'Marketing',
    description: '500% ROI digital marketing campaign',
  },
  {
    title: 'Web Design Project',
    category: 'Web Design',
    description: 'Premium website design and development',
  },
  {
    title: 'Branding Package',
    category: 'Branding',
    description: 'Complete brand identity system and guidelines',
  },
  {
    title: 'TikTok Series',
    category: 'Social Media',
    description: 'Trending TikTok content series, 5M views',
  },
  {
    title: 'Product Launch',
    category: 'Video',
    description: 'Product launch video for tech company',
  },
  {
    title: 'Billboard Design',
    category: 'Graphic Design',
    description: 'Large-scale advertising billboard campaign',
  },
  {
    title: 'Influencer Campaign',
    category: 'Marketing',
    description: 'Multi-influencer marketing collaboration',
  },
]

const categories = ['All', 'Branding', 'Social Media', 'Video', 'Photography', 'Animation', 'Web Design', 'Marketing', 'Graphic Design']

const getVideoEmbedUrl = (videoItem) => {
  const url = videoItem?.videoUrl || ''
  const normalized = url.toLowerCase()

  if (normalized.includes('youtube.com') || normalized.includes('youtu.be')) {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const id = match && match[1] ? match[1] : ''
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : ''
  }

  if (normalized.includes('vimeo.com')) {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : ''
  }

  return ''
}

export default function Portfolio() {
  const { data, isLoaded } = useWebsiteData()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState(null)

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const portfolioItems = data?.portfolio || []
  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)
  const showcaseVideos = (data?.portfolioVideoShowcase || [])
    .filter((item) => item.isActive !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl text-center"
        >
          <motion.div className="inline-block px-6 py-2 rounded-full glass mb-8">
            <span className="text-sm font-semibold text-secondary-400 uppercase">Portfolio</span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-8">
            Our Creative Work
          </h1>

          <p className="text-2xl text-text-muted leading-relaxed">
            Explore our collection of premium projects that showcase our creativity, expertise, and dedication to excellence.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeCategory === category
                    ? 'gradient-btn text-white'
                    : 'glass hover:bg-white/20 border border-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={`${item.title}-${index}`}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  image={item.image || item.images?.[0]}
                  images={item.images}
                  destinationUrl={item.destinationUrl}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Video Showcase" subtitle="Watch Our Best" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Premium Brand Video', description: 'See our latest brand storytelling video' },
              { title: 'Social Media Reel', description: 'Trending content from our portfolio' },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
                  >
                    <span className="text-4xl">▶</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">{video.title}</h3>
                  <p className="text-white/80 mt-2">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection title="What Clients Say" subtitle="Testimonials" />

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Projects' },
              { value: '150+', label: 'Happy Clients' },
              { value: '50M+', label: 'Total Reach' },
              { value: '10+', label: 'Awards' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl font-bold gradient-text mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-text-muted font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold gradient-text mb-6"
          >
            Want Similar Results?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted mb-12"
          >
            Let's create something amazing for your brand
          </motion.p>

          <Link to="/contact">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-gradient px-12 py-4 text-xl font-semibold"
            >
              Start Your Project
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
