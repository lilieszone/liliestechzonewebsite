'use client'
import { Media } from '@/payload-types'
import { themeLocalStorageKey } from '@/providers/Theme/shared'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const Icon = () => {
  const [theme, setValue] = useState('')

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])
  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="rounded-full">
      <div className="max-w-[40px] rounded-full">
        <Image
          alt="Lilies Tech Zone Icon"
          width={30}
          height={15}
          decoding="async"
          className={clsx('w-full h-[30px] rounded-full')}
          src={theme === 'dark' ? '/images/dark-logo.jpg' : '/images/light-logo.jpg'}
        />
      </div>
    </div>
  )
}
