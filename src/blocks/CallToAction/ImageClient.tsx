'use client'

import React from 'react'
import Image from 'next/image'

import type { Media } from '@/payload-types'
import { useTheme } from '@/providers/Theme'

interface CallToActionImageProps {
  ctaImage: Media | string | null | undefined
  darkImage: Media | string | null | undefined
  title: string | null | undefined
}

export const CallToActionImage: React.FC<CallToActionImageProps> = ({
  ctaImage,
  darkImage,
  title,
}) => {
  const { theme } = useTheme()
  const hasImage = Boolean(ctaImage)
  const hasDarkImage = Boolean(darkImage)

  const lightImageUrl = typeof ctaImage === 'object' && ctaImage?.url
  const darkImageUrl = typeof darkImage === 'object' && darkImage?.url

  const imageUrl = theme === 'dark' && hasDarkImage ? darkImageUrl : lightImageUrl
  if (!hasImage || !imageUrl) {
    return null // Don't render anything if there's no image
  }

  return (
    <div className="hidden md:block md:w-1/2 relative">
      <div className="">
        <Image
          src={imageUrl}
          alt={title || 'Call to action'}
          width={600}
          height={700}
          className=" object-cover hover:scale-110 transition-transform duration-300"
          priority
        />
      </div>
    </div>
  )
}
