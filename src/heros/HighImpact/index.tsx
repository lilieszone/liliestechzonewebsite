'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative min-h-[90vh] overflow-hidden ">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-12 top-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 mix-blend-overlay blur-3xl"></div>
        <div className="absolute -left-12 bottom-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 mix-blend-overlay blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[90vh] grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Image section with parallax effect */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 lg:order-2"
          >
            {media && typeof media === 'object' && (
              <div className="relative overflow-hidden transform -skew-x-6 shadow-2xl rounded-lg">
                <Image
                  //@ts-expect-error not sute
                  src={media?.url}
                  //@ts-expect-error not sure what is wrong
                  alt={media?.alt}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
              </div>
            )}
          </motion.div>

          {/* Text content */}
          <div className="relative z-20 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
              </h1>

              {Array.isArray(links) && links.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="flex flex-wrap gap-4 mt-8"
                >
                  {links.map(({ link }, i) => (
                    <li
                      key={i}
                      className="transform hover:-translate-y-1 transition-transform duration-300"
                    >
                      <CMSLink {...link} className="inline-block" />
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="max-w-[36.5rem] md:text-center">
       
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div> */}
      {/* <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div> */}
    </div>
  )
}
