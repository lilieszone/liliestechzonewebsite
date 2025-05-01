import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FaBolt } from 'react-icons/fa6'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  title,
  subTagline,
  highlightText,
}) => {
  // Split title to handle the highlighted part at the end
  const titleParts = title ? title.split(highlightText || '') : ['', '']

  return (
    <section className="py-10 md:py-20 container">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-2 mb-8">
          <FaBolt className="text-green-500" />
          {subTagline && (
            <p className="text-sm uppercase font-semibold tracking-wide">{subTagline}</p>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-dark-green mb-8 leading-tight">
          {titleParts[0]}
          <span className="text-green-500">{highlightText}</span>
          {titleParts[1]}
        </h1>

        {richText && (
          <div className="mb-12 max-w-3xl">
            <RichText className="text-lg text-gray-700" data={richText} enableGutter={false} />
          </div>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <div
                  key={i}
                  className={
                    i === 0 ? 'bg-dark-green rounded-md' : 'border border-gray-300 rounded-md'
                  }
                >
                  <CMSLink
                    {...link}
                    className={
                      i === 0
                        ? 'inline-block py-3 px-6 text-white font-medium'
                        : 'inline-block py-3 px-6 text-dark-green font-medium'
                    }
                  />
                </div>
              )
            })}
          </div>
        )}

        {media && typeof media === 'object' && (
          <div className="mt-16">
            <Media
              className="w-full rounded-lg shadow-lg"
              imgClassName="w-full h-auto"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
