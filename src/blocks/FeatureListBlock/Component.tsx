'use client'
import React from 'react'
import { FaCheckCircle, FaBolt, FaCheck } from 'react-icons/fa'
import { CMSLink } from '@/components/Link'
import { Media as MediaType, Page } from '@/payload-types'
import Image from 'next/image'
import clsx from 'clsx'
import { motion } from 'framer-motion'

// Types matching your existing config structure
type FeatureType = {
  featureText: string
  id?: string | null
}

type ImageSectionType = {
  image?: MediaType | null
  imagePosition?: 'left' | 'right' | null
}

type FeatureListBlockProps = {
  imageCfg?: ImageSectionType | null
  status?: {
    showStatusIcon?: boolean | null
    text?: string | null
  } | null
  title?: string | null
  titleHighlightText?: string | null
  features?: FeatureType[] | null
  links?: string[] | null
}

// Helper function for rendering title with highlighted text
const renderTitle = (title?: string | null, highlight?: string | null) => {
  if (!title) return null
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>
  }
  const parts = title.split(highlight)
  return (
    <>
      {parts[0]}
      <span className="text-emerald-500">{highlight}</span>
      {parts[1]}
    </>
  )
}

export const FeatureListBlockComponent: React.FC<FeatureListBlockProps> = ({
  imageCfg,
  status,
  title,
  titleHighlightText,
  features,
  links,
}) => {
  const { image, imagePosition = 'left' } = imageCfg || {}

  const hasStatusText = status?.text && status.text.trim() !== ''
  const imageUrl = typeof image === 'object' && image !== null ? image.url : null
  const imageAlt = typeof image === 'object' && image !== null ? image.alt : 'Feature image'
  console.log(features, 'features', hasStatusText, 'hasStatusText')

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="overflow-hidden py-12 md:py-16">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Image Column */}
          {imageUrl && (
            <motion.div
              className={clsx(
                'relative',
                imagePosition === 'right' ? 'md:order-last' : 'md:order-first',
              )}
              variants={imageVariants}
            >
              <div className="relative h-full overflow-hidden rounded-lg border border-gray-200/50 shadow-xl">
                {/* Main image */}
                <Image
                  src={imageUrl}
                  alt={imageAlt || title || 'Feature Block Image'}
                  width={600}
                  height={700}
                  className="h-full w-full object-cover"
                  priority
                />

                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white">
                  <div className="flex h-full flex-col justify-end">
                    {/* Stats Text */}
                    <div className="mb-2 flex items-baseline justify-between">
                      <div>
                        <div className="text-xs font-medium uppercase opacity-80">Followers</div>
                        <div className="text-xl font-bold">15.2K</div>
                      </div>
                      <div className="rounded-full bg-emerald-500/30 px-2 py-0.5 text-sm font-medium text-emerald-300">
                        +22%
                      </div>
                    </div>

                    {/* Graph */}
                    <div className="h-12 w-full">
                      <motion.div
                        className="h-8 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      >
                        <svg className="h-full w-full" viewBox="0 0 100 20">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,15 Q10,5 20,10 T40,5 T60,15 T80,5 T100,10"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1"
                          />
                          <path
                            d="M0,15 Q10,5 20,10 T40,5 T60,15 T80,5 T100,10 V20 H0 Z"
                            fill="url(#chartGradient)"
                            opacity="0.5"
                          />
                          <circle cx="50" cy="10" r="1.5" fill="#10B981" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content Column */}
          <motion.div className={clsx(imageUrl ? '' : 'md:col-span-2')} variants={itemVariants}>
            <div className="max-w-xl">
              {/* Status Line */}
              {hasStatusText && (
                <motion.div
                  className="mb-4 flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-600"
                  variants={itemVariants}
                >
                  {status.showStatusIcon !== false && <FaBolt className="mr-2 h-4 w-4" />}
                  <span>{status?.text}</span>
                </motion.div>
              )}

              {/* Title */}
              <motion.h2
                className="mb-6 text-4xl font-bold leading-tight  md:text-5xl"
                variants={itemVariants}
              >
                {renderTitle(title, titleHighlightText)}
              </motion.h2>

              {/* Features List */}
              {features && features.length > 0 && (
                <motion.ul className="mb-8 space-y-4" variants={containerVariants}>
                  {features.map((feature, index) => (
                    <motion.li
                      key={feature.id || index}
                      className="flex items-start"
                      variants={itemVariants}
                      custom={index}
                    >
                      <div className="mr-3 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-emerald-500">
                        <FaCheck className="h-3 w-3" />
                      </div>
                      <span className="">{feature.featureText}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {/* Links/Buttons */}
              {links && links.length > 0 && (
                <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                  {links.map(({ link }, index) => (
                    <CMSLink key={index} {...link} />
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
