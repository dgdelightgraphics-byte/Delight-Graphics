import React from 'react'
import { useWebsiteData } from '../context/WebsiteDataContext'
import SectionTitle from './SectionTitle'
import TestimonialCard from './TestimonialCard'

export default function TestimonialsSection({
  title = 'What Clients Say',
  subtitle = 'Testimonials',
  className = '',
}) {
  const { data } = useWebsiteData()

  const testimonials = (data?.testimonials || [])
    .filter((testimonial) => testimonial.isActive !== false)
    .sort((a, b) => Number(a.displayOrder ?? a.order ?? 0) - Number(b.displayOrder ?? b.order ?? 0))

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id || index}
              name={testimonial.clientName || testimonial.name || 'Happy Client'}
              company={testimonial.designation || testimonial.company || 'Client'}
              content={testimonial.review || testimonial.content || ''}
              rating={Number(testimonial.rating) || 5}
              image={testimonial.clientImage || testimonial.image || ''}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
