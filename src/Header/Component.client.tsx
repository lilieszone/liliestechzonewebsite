'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Menu as MenuIcon, Search as SearchIcon, X as CloseIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { MobileNav } from './MobileNav'
import { themeLocalStorageKey } from '@/providers/Theme/shared'

interface HeaderClientProps {
  data: HeaderType
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 flex justify-between items-center py-4 px-4 sm:px-8 lg:px-12 bg-background border-b border-border dark:border-muted-foreground/30"
    >
      <div className="flex items-center">
        <Link className="flex items-center" href="/">
          <Logo
            loading="eager"
            priority="high"
            className="dark:invert-0 h-[40px] w-auto"
            //@ts-expect-error logoImage is defined
            logoImage={data?.logoImage}
          />
          <h1 className="ml-2 font-semibold text-lg hidden sm:block">{data?.siteTitle}</h1>
        </Link>
      </div>

      <div className="hidden lg:flex flex-grow justify-center">
        <HeaderNav data={data} />
      </div>

      <div className="hidden lg:flex gap-2 items-center">
        <Link href="/search">
          <Button variant="ghost" size="icon" aria-label="Search">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Get Started
          </Button>
        </Link>
      </div>

      <button
        className="lg:hidden text-foreground hover:text-primary focus:outline-none p-2 -mr-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      <MobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navItems={data.navItems}
        headerRef={headerRef}
      />
    </header>
  )
}
