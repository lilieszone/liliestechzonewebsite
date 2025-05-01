'use client'
import { Media } from '@/payload-types'
import { themeLocalStorageKey } from '@/providers/Theme/shared'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logoImage?: Media | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logoImage } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const [theme, setValue] = useState('')

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="">
      <div className="max-w-[60px] rounded-full">
        <img
          alt="ClearResultConsul Logo"
          width={100}
          height={60}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx('w-full h-[60px] rounded-full', className)}
          src={
            logoImage?.url || theme === 'dark' ? '/images/dark-logo.jpg' : '/images/light-logo.jpg'
          }
        />
      </div>
    </div>
  )
}
