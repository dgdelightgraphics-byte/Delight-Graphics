import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import PromotionalOfferCard from '../components/PromotionalOfferCard'
import { useWebsiteData } from '../context/WebsiteDataContext'
import { MessageCircle, FileText, Package, MapPin, Layout, BookOpen, MessageSquare, Layers, Clipboard, Edit3 } from 'lucide-react'

export default function Services() {
  const { data, isLoaded } = useWebsiteData()

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const services = (data?.services || [])
    .filter((service) => service.active !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
  const promotionalOffers = (data?.promotionalOffers || [])
    .filter((offer) => offer.active !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))

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
                key={service.id || index}
                name={service.name || service.title || 'Premium Service'}
                description={service.description}
                image={service.image}
                url={service.url || service.destinationUrl}
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

      {/* Promotional Offers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Creative Offers" subtitle="Featured Promotions" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {promotionalOffers.map((offer, index) => (
              <PromotionalOfferCard key={offer.id || index} offer={offer} index={index} />
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
