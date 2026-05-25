import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useWebsiteData } from '../context/WebsiteDataContext'
import { Users, Target, Award, Lightbulb } from 'lucide-react'

const coreValues = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push creative boundaries to deliver cutting-edge solutions',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Every project is crafted with meticulous attention to detail',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with clients to bring their vision to life',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Premium standards in every aspect of our work',
  },
]

const timeline = [
  {
    year: '2014',
    title: 'Founded',
    description: 'Started with a vision to revolutionize creative digital services',
  },
  {
    year: '2016',
    title: 'First 100 Clients',
    description: 'Expanded team and opened multiple creative studios',
  },
  {
    year: '2019',
    title: 'Industry Recognition',
    description: 'Won 15+ awards for design and marketing excellence',
  },
  {
    year: '2024',
    title: 'Global Leaders',
    description: 'Serving 500+ brands across 30+ countries',
  },
]

const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'Creative Director',
    specialty: 'Brand Strategy & Design',
  },
  {
    name: 'Jordan Chen',
    role: 'Video Producer',
    specialty: 'Content Creation & Editing',
  },
  {
    name: 'Priya Sharma',
    role: 'Digital Strategist',
    specialty: 'Marketing & SEO',
  },
  {
    name: 'Marcus Davis',
    role: 'UI/UX Designer',
    specialty: 'Web & App Design',
  },
]

export default function About() {
  const { data, isLoaded } = useWebsiteData()

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const about = data?.about || {}

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
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl text-center"
        >
          <motion.div variants={itemVariants} className="inline-block px-6 py-2 rounded-full glass mb-8">
            <span className="text-sm font-semibold text-secondary-400 uppercase">About Us</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold gradient-text mb-8">
            Crafting Excellence Since 2014
          </motion.h1>

          <motion.p variants={itemVariants} className="text-2xl text-text-muted leading-relaxed">
            We are a team of creative visionaries dedicated to transforming brands through premium digital
            experiences. Our mission is to deliver exceptional work that exceeds expectations and drives
            real business results.
          </motion.p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Our Core Values" subtitle="What Drives Us" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl glass-premium border border-background-border hover:border-primary-500/50 transition-all text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6 mx-auto"
                >
                  <value.icon size={32} className="text-white" />
                </motion.div>

                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Our Journey" subtitle="Timeline" />

          <div className="space-y-12">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Content */}
                <div className="flex-1 p-8 rounded-2xl glass-premium border border-background-border">
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-secondary-400 text-sm font-semibold mb-4">
                    {event.year}
                  </span>
                  <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                  <p className="text-text-muted">{event.description}</p>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex-shrink-0 md:mx-4"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Why Choose Delight Graphics?" subtitle="Our Advantages" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Award-Winning Team',
                description:
                  'Our team has won 50+ international awards for creative excellence and innovation.',
              },
              {
                title: 'Proven Track Record',
                description:
                  'We have successfully completed over 500 projects with 98% client satisfaction rate.',
              },
              {
                title: 'Latest Technology',
                description:
                  'We use cutting-edge tools and platforms to deliver premium digital experiences.',
              },
              {
                title: 'Full-Service Solutions',
                description:
                  'From strategy to execution, we handle all aspects of your creative needs.',
              },
              {
                title: 'Premium Quality',
                description:
                  'Every project undergoes rigorous quality checks to ensure excellence.',
              },
              {
                title: '24/7 Support',
                description:
                  'Our dedicated team is always available to support your brand needs.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-8 rounded-2xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all"
              >
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-xl font-bold"
                  >
                    ✓
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-text-muted">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Our Team" subtitle="Meet the Creatives" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden"
              >
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-64 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-5xl font-bold"
                >
                  {member.name.charAt(0)}
                </motion.div>

                {/* Info */}
                <div className="p-6 glass-premium border-t border-background-border">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-secondary-400 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-text-muted text-sm">{member.specialty}</p>
                </div>
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
            Let's Create Magic Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted mb-12"
          >
            Join hundreds of brands that have transformed with our creative services
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
              Get in Touch
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
