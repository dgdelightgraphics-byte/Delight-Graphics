import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles } from 'lucide-react'

export default function PackageCard({
  title,
  subtitle,
  features,
  workflow,
  suitableFor,
  footerNote,
  ctaLabel,
  ctaHref = '/contact#contact-form',
  icon: Icon,
  accent = 'from-violet-500/20 via-cyan-500/10 to-transparent',
  highlight = false,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10, rotateX: 1, rotateY: -1 }}
      className={`relative overflow-hidden rounded-3xl border p-8 text-left shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 ${
        highlight
          ? 'border-secondary-400/60 bg-gradient-to-br from-violet-500/12 via-slate-900/90 to-cyan-500/10'
          : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-80`} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-secondary-200">
              <Sparkles className="h-3.5 w-3.5" />
              Creative Package
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-sm text-text-muted leading-6">{subtitle}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-secondary-100 shadow-lg shadow-violet-500/10">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary-200">Key Deliverables</p>
          <ul className="space-y-3 text-sm text-slate-200">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 p-1 text-slate-950">
                  <Check className="h-3 w-3" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-200">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-secondary-200">Workflow</p>
          <ul className="space-y-2">
            {workflow.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-secondary-300">0{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-secondary-200">Suitable For</p>
            <p>{suitableFor}</p>
          </div>

          <Link to={ctaHref} className="block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
                highlight
                  ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 hover:shadow-violet-500/30'
                  : 'border border-white/10 bg-white/8 hover:bg-white/12'
              }`}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>

          <p className="text-xs text-text-muted">{footerNote}</p>
        </div>
      </div>
    </motion.article>
  )
}
