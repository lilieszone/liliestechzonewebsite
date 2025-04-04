import { Media } from '@/payload-types'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logoImage?: Media | null
  theme?: 'dark' | 'light'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    logoImage,
    theme,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="">
      <div className="max-w-[60px]">
        <img
          alt="ClearResultConsul Logo"
          width={100}
          height={60}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx('w-full h-[60px]', className)}
          src={
            logoImage?.url || theme === 'dark' ? '/images/dark-logo.jpg' : '/images/light-logo.jpg'
          }
        />
      </div>
    </div>
  )
}
