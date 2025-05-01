import React from 'react'
import Image from 'next/image'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/payload-types'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  title,
  ctaImage,
}) => {
  const hasImage = Boolean(ctaImage)
  const imageUrl = typeof ctaImage === 'object' && (ctaImage as Media)?.url

  return (
    <div className="container py-8 md:py-12">
      <div className="bg-muted/20 rounded-xl relative overflow-hidden">
        <div className={`flex flex-col ${hasImage ? 'md:flex-row' : 'items-center justify-center'} items-stretch`}>
          <div
            className={`flex flex-col ${hasImage ? 'md:w-1/2' : 'max-w-2xl'} p-8 md:p-12 justify-center z-10`}
          >
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

            <div className={`flex flex-wrap gap-4 ${hasImage ? '' : 'justify-center'}`}>
              {(links || []).map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    className={
                      i === 0
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }
                    {...link}
                  />
                )
              })}
            </div>
          </div>

          {hasImage && imageUrl && (
            <div className="hidden md:block md:w-1/2 relative">
              <div className="absolute -top-24 -bottom-24 -right-12 left-0">
                <Image
                  src={imageUrl}
                  alt={title || 'Call to action'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
