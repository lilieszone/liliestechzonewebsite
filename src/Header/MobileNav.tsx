'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Search as SearchIcon } from 'lucide-react'
import RichText from '@/components/RichText'

// Props for the new component
interface MobileNavProps {
  navItems: HeaderType['navItems']
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  headerRef: React.RefObject<HTMLElement | null>
}

export const MobileNav: React.FC<MobileNavProps> = ({ navItems, isOpen, setIsOpen, headerRef }) => {
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen, headerRef])

  const toggleMobileDropdown = (index: number) => {
    setOpenMobileDropdown(openMobileDropdown === index ? null : index)
  }

  // Reset dropdown state when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenMobileDropdown(null)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className="absolute top-full left-0 right-0 h-[calc(100vh-var(--header-height,60px))] bg-background shadow-lg z-40 overflow-y-auto lg:hidden border-t border-border dark:border-muted-foreground/30"
    >
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems?.map((item, index) => {
            const { navLink } = item
            if (!navLink?.link) return null

            const hasDropdown = navLink.hasDropdown ?? false
            const isDropdownOpen = openMobileDropdown === index
            const ddContent = navLink.ddContent
            const layout = ddContent?.layout || 'single'

            return (
              <li key={item.id || index} onClick={() => !hasDropdown && setIsOpen(false)}>
                <div className="flex justify-between items-center">
                  {hasDropdown ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMobileDropdown(index)
                      }}
                      className="flex justify-between text-muted-foreground hover:text-primary"
                      aria-expanded={isDropdownOpen}
                    >
                      {item.navLink.link?.label}
                      <ChevronDown
                        className={clsx(
                          'h-5 w-5 pl-2 transition-transform duration-200',
                          isDropdownOpen ? 'rotate-180' : '',
                        )}
                      />
                    </button>
                  ) : (
                    <div className="flex justify-between items-center">
                      <CMSLink
                        {...navLink.link}
                        className="block py-2 text-foreground hover:text-primary flex-grow"
                      />
                      {hasDropdown && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleMobileDropdown(index)
                          }}
                          className="p-2 text-muted-foreground hover:text-primary"
                          aria-expanded={isDropdownOpen}
                        >
                          <ChevronDown
                            className={clsx(
                              'h-5 w-5 transition-transform duration-200',
                              isDropdownOpen ? 'rotate-180' : '',
                            )}
                          />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Enhanced Mobile Dropdown Content */}
                {hasDropdown && isDropdownOpen && ddContent && (
                  <div className="pl-4 mt-2 mb-3 space-y-4 border-l border-border dark:border-muted-foreground/30">
                    {/* Dropdown Header */}
                    {ddContent.header && (
                      <div className="mb-2 text-sm text-muted-foreground">
                        <RichText data={ddContent.header} />
                      </div>
                    )}

                    {/* Dropdown Links based on layout */}
                    {layout === 'sections' && ddContent.stns ? (
                      // Sections layout
                      <div className="space-y-4">
                        {ddContent.stns.map((section, sectionIndex) => (
                          <div key={section.id || sectionIndex} className="space-y-2">
                            {section.title && (
                              <h4 className="font-medium text-sm text-foreground">
                                {section.title}
                              </h4>
                            )}
                            <ul className="space-y-1">
                              {section.links?.map((linkItem, linkIndex) => (
                                <li key={linkItem.id || linkIndex} onClick={() => setIsOpen(false)}>
                                  <CMSLink
                                    {...linkItem.link}
                                    className="block py-1.5 text-muted-foreground hover:text-primary text-sm"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Single or Two Columns layout (stacked on mobile)
                      <ul className="space-y-1">
                        {ddContent.links?.map((linkItem, linkIndex) => (
                          <li key={linkItem.id || linkIndex} onClick={() => setIsOpen(false)}>
                            <CMSLink
                              {...linkItem.link}
                              className="block py-1.5 text-muted-foreground hover:text-primary text-sm"
                            />
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Featured Content */}
                    {ddContent.ftCnt && (
                      <div className="mt-4 pt-3 border-t border-border dark:border-muted-foreground/20">
                        {ddContent.ftCnt.image && (
                          <div className="relative w-full aspect-video rounded-md overflow-hidden mb-3">
                            <Image
                              src={
                                typeof ddContent.ftCnt.image === 'object'
                                  ? ddContent.ftCnt.image.url || ''
                                  : ''
                              }
                              alt={
                                typeof ddContent.ftCnt.image === 'object'
                                  ? ddContent.ftCnt.image.alt || 'Featured content'
                                  : 'Featured content'
                              }
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        {ddContent.ftCnt.title && (
                          <h4 className="font-medium text-foreground mb-1">
                            {ddContent.ftCnt.title}
                          </h4>
                        )}
                        {ddContent.ftCnt.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {ddContent.ftCnt.description}
                          </p>
                        )}
                        {ddContent.ftCnt.link && (
                          <CMSLink
                            {...ddContent.ftCnt.link}
                            className="text-sm text-primary hover:text-primary/80 font-medium"
                          />
                        )}
                      </div>
                    )}

                    {/* Dropdown Footer */}
                    {ddContent.footer && (
                      <div className="mt-3 pt-3 border-t border-border dark:border-muted-foreground/20 text-sm text-muted-foreground">
                        <RichText data={ddContent.footer} />
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile Actions */}
      <div className="p-4 border-t border-border dark:border-muted-foreground/30 flex flex-col gap-2">
        <Link href="/search" onClick={() => setIsOpen(false)}>
          <Button variant="ghost" className="w-full justify-start">
            <SearchIcon className="w-4 h-4 mr-2" />
            <span>Search</span>
          </Button>
        </Link>
        <Link href="/auth/login" onClick={() => setIsOpen(false)}>
          <Button variant="outline" className="w-full">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
