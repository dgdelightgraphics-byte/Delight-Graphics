import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import PackageCard from '../components/PackageCard'
import { useWebsiteData } from '../context/WebsiteDataContext'
import {
  TrendingUp,
  Smartphone,
  Camera,
  PenTool,
  Palette,
  Code,
  Image,
  Zap,
  MessageCircle,
  FileText,
  Package,
  MapPin,
  Layout,
  BookOpen,
  MessageSquare,
  Layers,
  Clipboard,
  Edit3,
  Crown,
  Shield,
  Sparkles,
} from 'lucide-react'

// Icon mapping for service icons
const iconMap = {
  TrendingUp,
  Smartphone,
  Camera,
  PenTool,
  Palette,
  Code,
  Image,
  Zap,
  MessageCircle,
  FileText,
  Package,
  MapPin,
  Layout,
  BookOpen,
  MessageSquare,
  Layers,
  Clipboard,
  Edit3,
  Crown,
  Shield,
  Sparkles,
}

const packageTiers = [
  {
    title: 'Basic Package',
    subtitle: 'Perfect for startups and small businesses looking for essential creative branding solutions.',
    features: [
      '3 Unique Creative Concepts',
      'Professional Brand Design Support',
      'Logo Design (Typography & Iconic Styles)',
      'Brochure / Flyer Design',
      'Packaging Design',
      'Signage / Artwork Design',
      'Print Ready Final Files',
      'JPG, PNG & Vector PDF Formats',
      'Basic Brand Consultation',
      'Royalty-Free Assets Support',
      'Unlimited Revisions During Project Duration',
      'Dedicated Graphic Designer Support',
      'Fast Project Delivery',
      'Client Ownership Rights',
    ],
    workflow: ['Understanding brand requirements', 'Creative concept development', 'Design presentation', 'Revisions & refinements', 'Final file delivery'],
    suitableFor: 'Startups • Local Businesses • Small Brands • New Product Launches',
    footerNote: 'Project timelines vary depending on service requirements and project scope.',
    ctaLabel: 'Get Quote',
    ctaHref: '/contact#contact-form',
    icon: Sparkles,
    accent: 'from-violet-500/10 via-slate-900/90 to-cyan-500/10',
  },
  {
    title: 'Standard Package',
    subtitle: 'Ideal for growing brands that need premium-quality branding and marketing creatives.',
    features: [
      'Advanced Creative Branding Solutions',
      'Multiple Unique Design Concepts',
      'Logo Design with Extended Variations',
      'Stationery Design',
      'Business Card Design',
      'Letterhead Design',
      'Envelope Design',
      'Brochure & Marketing Material Design',
      'Creative Packaging Design',
      'Signage & Advertising Artwork',
      'Brand-Oriented Visual Strategy',
      'Competitor & Audience Analysis',
      'Professional Design Consultation',
      'Print Ready High-Resolution Files',
      'Vector Source Files Included',
      'Premium Layout & Presentation Design',
      'Unlimited Revisions During Project Duration',
      'Senior Designer Involvement',
      'Priority Project Handling',
      'Improved Brand Consistency',
      'Better Visual Communication',
      'Premium Creative Direction',
      'Enhanced Marketing Presence',
    ],
    workflow: ['Brand discovery & strategy', 'Concept development', 'Premium design presentation', 'Refinement & approvals', 'High-resolution final delivery'],
    suitableFor: 'Established Businesses • Growing Brands • Retail Stores • Professional Service Companies',
    footerNote: 'Timeline depends on project complexity and design requirements.',
    ctaLabel: 'Start Your Project',
    ctaHref: '/contact#contact-form',
    icon: Shield,
    accent: 'from-cyan-500/12 via-slate-900/90 to-violet-500/10',
    highlight: true,
  },
  {
    title: 'Premium Package',
    subtitle: 'Complete high-end creative branding experience tailored for premium businesses and modern brands.',
    features: [
      'Bespoke Brand Identity Development',
      'Fully Customized Creative Direction',
      'Handcrafted Premium Logo Design',
      'Brand Story & Identity Strategy',
      'Premium Stationery Suite',
      'High-End Brochure & Presentation Design',
      'Luxury Packaging Design',
      'Advanced Advertising & Signage Design',
      'Creative Visualisation & Mockups',
      '3D Brand Presentation Concepts',
      'Professional Brand Consultation',
      'Premium Creative Supervision',
      'Visual Identity Consistency Across All Designs',
      'High-Resolution Print & Digital Assets',
      'Source Files & Ownership Rights Included',
      'Unlimited Revisions During Project Duration',
      'Dedicated Senior Creative Team',
      'Priority Workflow Management',
      'Strategic Creative Planning',
      'Advanced Brand Positioning',
      'Premium Design Presentation',
      'Modern Luxury Visual Aesthetic',
      'Personalized Creative Collaboration',
    ],
    workflow: ['Strategic creative planning', 'Luxury visual direction', 'Bespoke design production', 'Senior creative supervision', 'Final premium asset delivery'],
    suitableFor: 'Premium Brands • Corporate Businesses • Luxury Products • Large-Scale Marketing Campaigns • High-End Commercial Projects',
    footerNote: 'Customized based on project scope and creative requirements.',
    ctaLabel: 'Book Consultation',
    ctaHref: '/contact#contact-form',
    icon: Crown,
    accent: 'from-amber-500/15 via-slate-900/90 to-violet-500/10',
  },
]

export default function Services() {
  const { data, isLoaded } = useWebsiteData()

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const services = data?.services || []

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
            <span className="text-sm font-semibold text-secondary-400 uppercase">Our Services</span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-8">Premium Creative Solutions</h1>

          <p className="text-2xl text-text-muted leading-relaxed">
            Comprehensive suite of services designed to elevate your brand and achieve your business goals.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Our Process" subtitle="How We Work" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Understanding your needs and goals' },
              { step: '02', title: 'Strategy', description: 'Developing a comprehensive plan' },
              { step: '03', title: 'Execution', description: 'Creating premium deliverables' },
              { step: '04', title: 'Optimization', description: 'Refining for maximum impact' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-2xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all"
              >
                <div className="text-5xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-text-muted">{item.description}</p>

                {/* Arrow */}
                {index < 3 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2"
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Creative Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Creative Agency Packages"
            subtitle="Luxury Brand Solutions"
          />

          <p className="mx-auto mb-12 max-w-3xl text-center text-text-muted">
            Select a premium package designed for your creative growth, brand storytelling, and modern visual identity.
          </p>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {packageTiers.map((tier, index) => (
              <PackageCard key={index} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold gradient-text mb-6"
          >
            Ready to Get Started?
          </motion.h2>

          <Link to="/contact">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-gradient px-12 py-4 text-xl font-semibold"
            >
              Schedule Consultation
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
