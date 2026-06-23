import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook, ShieldCheck, Clock, Sparkles, Send } from 'lucide-react'
import { useWebsiteData } from '../context/WebsiteDataContext'

export default function Contact() {
  const { data, isLoaded } = useWebsiteData()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', type: '' })

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const contact = data?.contact || {}
  const socialMedia = data?.socialMedia || {}

  // Default business hours
  const businessHours = contact.businessHours || [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setToast({ message: '', type: '' })

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxG0pxtSVMJnY-_ybenUt0CjQNRTNQxcqytqAKgU8NHufoWjrWnN5qMrsHlQRpxI0w/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response || (response.type !== 'opaque' && !response.ok)) {
        throw new Error('Failed to submit form')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
      setToast({ message: 'Message Sent Successfully', type: 'success' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setToast({ message: 'Failed to send message. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
      setTimeout(() => setToast({ message: '', type: '' }), 5000)
    }
  }

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
            <span className="text-sm font-semibold text-secondary-400 uppercase">Get in Touch</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold gradient-text mb-8">
            Let's Start Something Amazing
          </motion.h1>

          <motion.p variants={itemVariants} className="text-2xl text-text-muted leading-relaxed">
            Have a project in mind? We'd love to hear about it. Reach out and let's discuss how we can help elevate your brand.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-12">Get In Touch</h2>

              {/* Email */}
              <motion.a
                href={`mailto:${contact.email || 'contact@delightgraphics.com'}`}
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 p-6 rounded-xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all mb-6 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-secondary-500/50"
                >
                  <Mail size={24} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-text-muted group-hover:text-white transition-colors">{contact.email}</p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                href={`tel:${contact.phone || '+1234567890'}`}
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 p-6 rounded-xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all mb-6 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500 to-primary-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-secondary-500/50"
                >
                  <Phone size={24} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-text-muted group-hover:text-white transition-colors">{contact.phone}</p>
                </div>
              </motion.a>

              {/* Address */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 p-6 rounded-xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all mb-6 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-secondary-500/50"
                >
                  <MapPin size={24} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-text-muted group-hover:text-white transition-colors">{contact.address}</p>
                </div>
              </motion.div>
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-xl glass-premium border border-background-border"
            >
              <h3 className="text-lg font-semibold mb-6">Business Hours</h3>
              <div className="space-y-4">
                {businessHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-text-muted">{item.day}</span>
                    <span className="font-semibold text-secondary-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/dg_delight_graphics?igsh=MW5oNjh5ZXpqeW5j&utm_source=qr', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/share/16gB9m2o6L/?mibextid=wwXIfr', label: 'Facebook' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-lg glass-premium hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-secondary-500/20 transition-all"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-xl glass-premium border border-background-border"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary-400/20 text-2xl font-bold text-white border border-secondary-400">
                DG
              </div>
              <h2 className="text-3xl font-bold text-white">Delight Graphics</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-background-border focus:border-secondary-400/50 focus:ring-2 focus:ring-secondary-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-background-border focus:border-secondary-400/50 focus:ring-2 focus:ring-secondary-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <motion.input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-background-border focus:border-secondary-400/50 focus:ring-2 focus:ring-secondary-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="+91-8277251766"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Company/Brand</label>
                <motion.input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-background-border focus:border-secondary-400/50 focus:ring-2 focus:ring-secondary-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="Your Company"
                />
              </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-background-border focus:border-secondary-400/50 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="Project inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-background-border focus:border-secondary-400/50 focus:outline-none transition-all text-white placeholder-gray-500 resize-none h-32"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                disabled={loading}
                className={`w-full btn-primary-gradient py-3 text-lg font-semibold flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : submitted ? 'Message Sent! ✓' : 'Send Message'}
                {!loading && !submitted && <Send size={20} />}
              </motion.button>
            </form>
            {toast.message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`mt-6 rounded-3xl px-6 py-4 text-sm font-semibold ${toast.type === 'success' ? 'bg-emerald-500/95 text-white' : 'bg-red-500/95 text-white'} shadow-2xl shadow-black/10`}
              >
                {toast.message}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Quick Response via WhatsApp
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted mb-12"
          >
            Get instant replies to your inquiries. Chat with us on WhatsApp for quick consultation.
          </motion.p>

          <motion.a
            href="https://wa.me/918277251766"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 px-12 py-4 text-xl font-semibold rounded-lg transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.87 1.246-2.945 3.066-2.945 5.824 0 3.806 3.1 6.931 6.906 6.931a6.88 6.88 0 003.897-1.2l.19-.12 3.61.738.797-2.592-.052-.313c.915-1.591 1.418-3.316 1.418-5.051 0-3.815-3.1-6.931-6.906-6.931zm0-1.6C12.363 2.5 19 8.823 19 17.283c0 2.096-.547 4.142-1.588 5.945L19.5 24l-5.684-1.14C11.419 23.41 9.25 24 6.906 24 3.08 24 0 20.906 0 17.283 0 13.659 3.08 10.565 6.906 10.565c2.344 0 4.513.59 6.427 1.627V9.783z"/>
            </svg>
            Chat on WhatsApp
          </motion.a>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Visit Our Studio
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden h-96 border border-background-border"
          >
            <iframe
              src="https://www.google.com/maps?q=Bengaluru%2C%20Karnataka&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                question: 'What is your typical project timeline?',
                answer: 'Most projects take 2-6 weeks depending on scope and complexity. We provide detailed timelines during consultation.',
              },
              {
                question: 'Do you offer customized creative packages?',
                answer: 'Yes! We tailor each project to your brand goals, scope, and creative direction. Contact us to discuss the best fit.',
              },
              {
                question: 'How do we get started?',
                answer: 'Simply reach out via email or WhatsApp. We\'ll schedule a consultation to discuss your project and needs.',
              },
              {
                question: 'Do you provide unlimited revisions?',
                answer: 'Our premium packages include revision support throughout the project timeline, with scope tailored to your creative requirements.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl glass-premium border border-background-border hover:border-secondary-400/50 transition-all"
              >
                <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                <p className="text-text-muted">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
