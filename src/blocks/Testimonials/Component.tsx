'use client'
import React from 'react'
import { Media as MediaType } from '@/payload-types' // Use Payload's generated Media type
import Image from 'next/image'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FaQuoteRight } from 'react-icons/fa' // Quote icon

// Type definitions based on config.ts
type Testimonial = {
  id?: string | null
  companyLogo?: MediaType | string | null // Can be object or just ID string
  testimonialText: string
  authorImage?: MediaType | string | null
  authorName: string
  authorTitle: string
  highlightCard?: boolean | null
}

type TestimonialsBlockProps = {
  blockType: 'testimonials'
  eyebrow?: string | null
  heading?: string | null
  testimonials: Testimonial[]
  backgroundColor?: 'transparent' | 'white' | 'gray-50' | 'blue-50' | null
}

// Helper to get URL from Media object or ID (you might have a more robust helper)
const getMediaUrl = (media: MediaType | string | null | undefined): string | null => {
  if (!media) return null
  if (typeof media === 'string') return null // Need population or a fetch hook for IDs
  return media.url ?? null
}
const getMediaAlt = (media: MediaType | string | null | undefined, fallback: string): string => {
  if (!media || typeof media === 'string') return fallback
  return media.alt ?? fallback
}

export const TestimonialsBlockComponent: React.FC<TestimonialsBlockProps> = ({
  eyebrow,
  heading,
  testimonials,
  backgroundColor = 'transparent',
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null // Don't render anything if no testimonials are provided
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const bgClass = backgroundColor !== 'transparent' ? `bg-${backgroundColor}` : ''

  return (
    <section className={clsx('py-16 md:py-24', bgClass)}>
      <div className="container mx-auto px-4">
        {/* Optional Section Heading */}
        {(eyebrow || heading) && (
          <div className="mb-12 text-center">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                {eyebrow}
              </p>
            )}
            {heading && <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>}
          </div>
        )}

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is visible
        >
          {testimonials.map((testimonial) => {
            const companyLogoUrl = getMediaUrl(testimonial.companyLogo)
            const companyLogoAlt = getMediaAlt(
              testimonial.companyLogo,
              `${testimonial.authorName}'s company`,
            )
            const authorImageUrl = getMediaUrl(testimonial.authorImage)
            const authorImageAlt = getMediaAlt(testimonial.authorImage, testimonial.authorName)

            return (
              <motion.div
                key={testimonial.id}
                className={clsx(
                  'flex h-full flex-col rounded-lg p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl md:p-8',
                  testimonial.highlightCard
                    ? 'border-2 border-purple-400'
                    : 'border border-gray-100',
                )}
                variants={itemVariants}
              >
                {/* Top Section: Logo and Quote Icon */}
                <div className="mb-4 flex min-h-[40px] items-start justify-between">
                  {companyLogoUrl ? (
                    <div className="relative h-8 w-auto max-w-[120px]">
                      <Image
                        src={companyLogoUrl}
                        alt={companyLogoAlt}
                        layout="fill"
                        objectFit="contain"
                        className="object-left"
                      />
                    </div>
                  ) : (
                    <div /> // Empty div to maintain layout if no logo
                  )}
                  <FaQuoteRight className="h-6 w-6 flex-shrink-0 " />
                </div>

                {/* Testimonial Text */}
                <p className="mb-6 flex-grow text-base  md:text-lg">
                  {testimonial.testimonialText}
                </p>

                {/* Author Section */}
                <div className="mt-auto flex items-center border-t border-gray-100 pt-4">
                  {authorImageUrl && (
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={authorImageUrl}
                        alt={authorImageAlt}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className={clsx(authorImageUrl ? 'ml-4' : '')}>
                    <p className="font-semibold">{testimonial.authorName}</p>
                    <p className="text-sm">{testimonial.authorTitle}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
