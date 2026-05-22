import React from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
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
} from 'lucide-react'

const allServices = [
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Comprehensive digital strategies including SEO, SEM, content marketing, and performance analytics to drive growth.',
    fullDescription:
      'We develop data-driven marketing strategies that increase brand visibility and generate qualified leads.',
    features: ['SEO Optimization', 'SEM Campaigns', 'Content Strategy', 'Analytics'],
  },
  {
    icon: MessageCircle,
    title: 'Content Marketing',
    description:
      'Strategic content development and distribution to attract, engage, and retain your ideal audience.',
    fullDescription:
      'From blog articles to newsletters and social storytelling, we build content systems that generate trust and convert customers.',
    features: ['Content Strategy', 'Editorial Planning', 'SEO Writing', 'Audience Growth'],
  },
  {
    icon: Smartphone,
    title: 'Social Media Management',
    description:
      'Engaging content creation and community management across all major social platforms.',
    fullDescription:
      'Build a thriving community around your brand with our strategic social media expertise.',
    features: ['Content Calendar', 'Community Management', 'Engagement Strategy', 'Analytics'],
  },
  {
    icon: Camera,
    title: 'Video Editing',
    description:
      'Professional video production and editing services for promotional and corporate videos.',
    fullDescription:
      'Transform raw footage into compelling visual stories that captivate your audience.',
    features: ['Color Grading', 'Motion Graphics', 'Sound Design', 'Video Effects'],
  },
  {
    icon: PenTool,
    title: 'Reel Creation',
    description:
      'Viral-ready short-form content optimized for Instagram, TikTok, and YouTube Shorts.',
    fullDescription:
      'Create trending reels that maximize engagement and reach with our creative expertise.',
    features: ['Trend Research', 'Script Writing', 'Video Editing', 'Optimization'],
  },
  {
    icon: Palette,
    title: 'Branding',
    description:
      'Complete brand identity development including logo, guidelines, and brand strategy.',
    fullDescription:
      'Build a powerful brand that resonates with your target audience and stands out.',
    features: ['Logo Design', 'Brand Guidelines', 'Strategy', 'Visual Identity'],
  },
  {
    icon: Code,
    title: 'Web Design',
    description:
      'Beautiful, responsive website design that converts visitors into customers.',
    fullDescription:
      'Premium web experiences built for performance, conversion, and user satisfaction.',
    features: ['Responsive Design', 'UX/UI', 'Performance', 'SEO Ready'],
  },
  {
    icon: Image,
    title: 'Graphic Design',
    description:
      'Custom graphic design for all your marketing and brand communication needs.',
    fullDescription:
      'Eye-catching designs that communicate your brand message effectively.',
    features: ['Print Design', 'Digital Design', 'Illustrations', 'Packaging'],
  },
  {
    icon: Zap,
    title: 'Product Photography',
    description:
      'Professional product photography for e-commerce and marketing materials.',
    fullDescription:
      'High-quality images that showcase your products in the best possible light.',
    features: ['Studio Setup', 'Editing', 'Lighting', 'Post-Production'],
  },
  {
    icon: Camera,
    title: 'Ad Shoot Services',
    description:
      'Full production services for advertising campaigns and promotional content.',
    fullDescription:
      'Professional ad production that tells your brand story and drives conversions.',
    features: ['Pre-Production', 'Filming', 'Post-Production', 'Color Grading'],
  },
  {
    icon: PenTool,
    title: 'Logo Design',
    description:
      'Custom logo creation that defines your brand identity with personality and clarity.',
    fullDescription:
      'We design unforgettable logos that tell your brand story and can be used consistently across every touchpoint.',
    features: ['Brand Symbol', 'Typography', 'Color Palette', 'Usage Guidelines'],
  },
  {
    icon: FileText,
    title: 'Brochure Design',
    description:
      'Eye-catching brochure layouts for print and digital distribution.',
    fullDescription:
      'From corporate brochures to product catalogs, we create polished designs that communicate your message clearly.',
    features: ['Layout Design', 'Print Ready', 'Typography', 'Brand Consistency'],
  },
  {
    icon: Package,
    title: 'Packaging Design',
    description:
      'Creative packaging concepts that elevate products on the shelf and online.',
    fullDescription:
      'We design packaging that reflects your brand, protects your product, and converts shoppers into buyers.',
    features: ['Structural Concepts', 'Visual Branding', 'Print Specifications', 'Shelf Impact'],
  },
  {
    icon: MapPin,
    title: 'Signage Design',
    description:
      'Functional and branded signage solutions for retail, events, and storefronts.',
    fullDescription:
      'We create signs that guide customers, reinforce your identity, and make your space feel cohesive.',
    features: ['Wayfinding', 'Outdoor Signage', 'Indoor Signage', 'Brand Visibility'],
  },
  {
    icon: Layout,
    title: 'Exhibition Stall Design',
    description:
      'Engaging exhibition stall layouts designed to attract and retain visitors.',
    fullDescription:
      'Our booth designs combine visual impact with audience flow to deliver strong event performance.',
    features: ['Concept Design', '3D Mockups', 'Brand Display', 'Visitor Experience'],
  },
  {
    icon: Layout,
    title: 'Poster Design',
    description:
      'Bold poster designs for events, campaigns, and promotions.',
    fullDescription:
      'We craft posters that capture attention and communicate your message instantly with strong visuals.',
    features: ['Hierarchy', 'Typography', 'Illustration', 'Print Optimization'],
  },
  {
    icon: BookOpen,
    title: 'Magazine Design',
    description:
      'Editorial layout design for magazines, catalogs, and publications.',
    fullDescription:
      'From cover to content pages, we design cohesive editorial experiences that keep readers engaged.',
    features: ['Layout Systems', 'Typography', 'Image Styling', 'Print Preparation'],
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Invitation Design',
    description:
      'Stylish WhatsApp invitation graphics for launches, events, and special announcements.',
    fullDescription:
      'Create visually appealing invite cards for direct messaging that deliver your message with clarity and charm.',
    features: ['Mobile-First Design', 'Custom Messaging', 'Shareable Graphics', 'Brand Styling'],
  },
  {
    icon: Layers,
    title: 'Social Media Graphics Design',
    description:
      'Branded social media visuals for posts, stories, and campaigns.',
    fullDescription:
      'We design scroll-stopping graphics that elevate your social presence and support your content strategy.',
    features: ['Post Templates', 'Story Graphics', 'Campaign Assets', 'Platform Optimization'],
  },
  {
    icon: Image,
    title: 'Web & Social Banner Design',
    description:
      'Banner graphics that look great across websites and social profiles.',
    fullDescription:
      'Our banner designs are tailored for web and social channels, ensuring consistent impact across platforms.',
    features: ['Header Banners', 'Ad Banners', 'Social Covers', 'Responsive Layouts'],
  },
  {
    icon: Clipboard,
    title: 'Brand Kit Design',
    description:
      'Comprehensive brand kit creation for consistent visual identity across touchpoints.',
    fullDescription:
      'We package your logo, colors, typography, and usage rules into a cohesive brand kit for easy adoption.',
    features: ['Logo System', 'Color Palette', 'Typography Guide', 'Asset Library'],
  },
  {
    icon: Edit3,
    title: 'Blog',
    description:
      'Blog design and content presentation that supports thought leadership and SEO.',
    fullDescription:
      'We craft blog-focused visuals and layouts that make your content easy to read and share.',
    features: ['Post Templates', 'Featured Images', 'Content Layout', 'Readable Design'],
  },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$999',
    period: 'per month',
    features: [
      'Single service focus',
      'Monthly deliverables',
      'Email support',
      'Basic analytics',
      ' 2 rounds of revision',
    ],
  },
  {
    name: 'Professional',
    price: '$2,499',
    period: 'per month',
    features: [
      'Multiple services',
      'Weekly deliverables',
      'Priority support',
      'Advanced analytics',
      'Unlimited revisions',
      'Strategy consultation',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    features: [
      'All services included',
      'Daily collaboration',
      '24/7 dedicated support',
      'Custom analytics',
      'Unlimited everything',
      'Strategic partnership',
    ],
  },
]

export default function Services() {
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
            {allServices.map((service, index) => (
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

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Simple Pricing" subtitle="Flexible Plans" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl border transition-all ${
                  tier.highlighted
                    ? 'glass-premium border-secondary-400/50 ring-2 ring-secondary-400/50'
                    : 'glass-premium border-background-border hover:border-background-border/80'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold gradient-text">{tier.price}</span>
                  <span className="text-text-muted ml-2">{tier.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    tier.highlighted
                      ? 'gradient-btn text-white'
                      : 'glass hover:bg-white/20 border border-white/20'
                  }`}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
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
        </div>
      </section>
    </div>
  )
}
