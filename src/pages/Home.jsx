import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import PortfolioCard from '../components/PortfolioCard'
import TestimonialCard from '../components/TestimonialCard'
import StatsCard from '../components/StatsCard'
import ProcessStep from '../components/ProcessStep'
import {
  Zap,
  Smartphone,
  PenTool,
  Camera,
  TrendingUp,
  Palette,
  Code,
  Image,
} from 'lucide-react'

const services = [
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Comprehensive strategies to grow your brand online',
  },
  {
    icon: Smartphone,
    title: 'Social Media',
    description: 'Engaging content that connects with your audience',
  },
  {
    icon: Camera,
    title: 'Video Editing',
    description: 'Professional video production and editing services',
  },
  {
    icon: PenTool,
    title: 'Reel Creation',
    description: 'Viral-ready reels and short-form content',
  },
  {
    icon: Palette,
    title: 'Branding',
    description: 'Complete brand identity and strategy development',
  },
  {
    icon: Code,
    title: 'Web Design',
    description: 'Beautiful and functional website design',
  },
]

const portfolioItems = [
  {
    title: 'Premium Brand Campaign',
    category: 'Branding',
    description: 'Award-winning campaign for luxury brand',
  },
  {
    title: 'Social Media Series',
    category: 'Social Media',
    description: 'Engaging content series with 2M+ views',
  },
  {
    title: 'Corporate Video',
    category: 'Video Editing',
    description: 'Professional corporate video production',
  },
  {
    title: 'Product Photography',
    category: 'Photography',
    description: 'High-end product shoot for e-commerce',
  },
  {
    title: 'Animated Explainer',
    category: 'Animation',
    description: 'Custom animated explainer video',
  },
  {
    title: 'Digital Campaign',
    category: 'Marketing',
    description: '500% ROI digital marketing campaign',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart CEO',
    content:
      'Delight Graphics transformed our brand presence. Their creativity and professionalism exceeded expectations.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    company: 'Fashion House',
    content:
      'The team delivers stunning visuals that resonate with our audience. Highly recommended for premium brands.',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    company: 'Luxury Retail',
    content:
      'Outstanding work across all platforms. They understand premium branding like no one else.',
    rating: 5,
  },
]

const stats = [
  { value: '500', label: 'Projects Completed' },
  { value: '150', label: 'Happy Clients' },
  { value: '50M', label: 'Total Reach' },
  { value: '10', label: 'Years Experience' },
]

const processSteps = [
  {
    number: 1,
    title: 'Discover',
    description: 'Understanding your business, goals and audience.',
  },
  {
    number: 2,
    title: 'Strategy',
    description: 'Defining creative direction and communication approach.',
  },
  {
    number: 3,
    title: 'Design',
    description: 'Transforming ideas into impactful visual concepts.',
  },
  {
    number: 4,
    title: 'Review',
    description: 'Refining designs based on feedback and usability.',
  },
  {
    number: 5,
    title: 'Deliver',
    description: 'Final files delivered, ready for print or digital use.',
  },
  {
    number: 6,
    title: 'Support',
    description: 'Ongoing creative assistance as your brand evolves.',
  },
]

export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Creative Excellence Meets Digital Innovation'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 blur-3xl animate-float"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-secondary-500/10 to-primary-500/10 blur-3xl animate-float"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="px-6 py-2 rounded-full glass inline-flex items-center gap-2"
            >
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-sm font-semibold text-secondary-400">
                Welcome to Premium Creativity
              </span>
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.75, repeat: Infinity }}
              className="text-secondary-400"
            >
              |
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your vision into stunning digital experiences. We craft premium creative solutions
            that captivate, engage, and convert.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary-gradient px-8 py-4 text-lg inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline px-8 py-4 text-lg"
              >
                View Portfolio
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-20 text-text-muted"
          >
            <p className="text-sm mb-4">Scroll to explore</p>
            <div className="w-6 h-10 rounded-full border-2 border-text-muted flex items-center justify-center mx-auto">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-gradient-to-b from-primary-400 to-secondary-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} value={stat.value} label={stat.label} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Creative Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Our Creative Process" subtitle="Our Process" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Our Services" subtitle="What We Do" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/20 hover:opacity-95 transition-all"
              >
                View All Services
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Featured Portfolio" subtitle="Our Best Work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioItems.slice(0, 6).map((item, index) => (
              <PortfolioCard
                key={index}
                title={item.title}
                category={item.category}
                description={item.description}
                index={index}
              />
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center"
          >
            <Link to="/portfolio">
              <motion.button
                className="btn-primary-gradient px-8 py-4 text-lg inline-flex items-center gap-2"
              >
                View All Work
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="What Clients Say" subtitle="Testimonials" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                company={testimonial.company}
                content={testimonial.content}
                rating={testimonial.rating}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold gradient-text mb-6"
          >
            Ready to Transform Your Brand?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted mb-12"
          >
            Let's create something extraordinary together
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact">
              <button className="btn-primary-gradient px-12 py-4 text-xl font-semibold">
                Start Your Project Today
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
