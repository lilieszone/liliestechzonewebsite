import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { CallToActionImage } from './ImageClient'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  title,
  ctaImage,
  darkImage,
}) => {
  const hasImage = Boolean(ctaImage)

  return (
    <div className="container py-8 md:py-12">
      <div className="bg-muted/20 dark:bg-muted/50 rounded-xl relative overflow-visible">
        <div
          className={`flex flex-col ${hasImage ? 'md:flex-row' : 'items-center justify-center'} items-stretch`}
        >
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
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-background border border-border hover:bg-muted'
                    }
                    {...link}
                  />
                )
              })}
            </div>
          </div>

          {hasImage && (
            //@ts-expect-error - We're passing the correct types
            <CallToActionImage ctaImage={ctaImage} darkImage={darkImage} title={title} />
          )}
        </div>
      </div>
    </div>
  )
}
