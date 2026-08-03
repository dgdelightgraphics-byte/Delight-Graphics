import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function PromotionalOfferCard({ offer, index }) {
  const title = offer?.title || 'Creative Offer'
  const description = offer?.description || 'Premium offer crafted for your next big move.'
  const buttonText = offer?.buttonText || 'Learn More'
  const href = offer?.buttonUrl?.trim() || '#'
  const isExternal = /^https?:\/\//i.test(href)

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group block h-full overflow-hidden rounded-[2rem] border border-background-border/70 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-secondary-400/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {offer?.image ? (
          <img
            src={offer.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500/30 via-slate-900 to-secondary-500/30">
            <span className="text-lg font-semibold text-white">Featured Offer</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary-300 backdrop-blur-md">
            Featured Offer
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all group-hover:opacity-95">
            {buttonText}
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.a>
  )
}
