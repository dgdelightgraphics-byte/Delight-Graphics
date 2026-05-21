import React from 'react'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/dg_delight_graphics?igsh=MW5oNjh5ZXpqeW5j&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/share/16gB9m2o6L/?mibextid=wwXIfr', label: 'Facebook' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="glass-premium border-t border-background-border/50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold gradient-text mb-4">Delight Graphics</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Transform your brand with premium creative services. We deliver excellence in every pixel.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-text-muted hover:text-secondary-400 transition-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-text-primary">Services</h4>
            <ul className="space-y-3">
              {['Digital Marketing', 'Branding', 'Video Editing', 'Graphic Design'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-text-muted hover:text-secondary-400 transition-all">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-text-primary">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-text-muted">
                <Mail size={18} className="text-secondary-400" />
                <a href="mailto:dgdelightgraphics@gmail.com" className="hover:text-secondary-400 transition-all">
                  dgdelightgraphics@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <Phone size={18} className="text-secondary-400" />
                <a href="tel:+918277251766" className="hover:text-secondary-400 transition-all">
                  +91-8277251766
                </a>
              </li>
              <li className="flex items-start gap-3 text-text-muted">
                <MapPin size={18} className="text-secondary-400 mt-1" />
                <span>Bengaluru, Karnataka</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-background-border/50"
        >
          <div className="text-text-muted text-sm">
            Copyright 2003-2026 Delight Graphics | All Rights Reserved | Designed By | Developed By | Powered By | Brand consultant
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-secondary-500/20 transition-all"
              >
                <social.icon size={20} className="text-text-primary" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
