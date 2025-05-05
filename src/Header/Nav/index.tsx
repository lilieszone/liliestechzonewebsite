'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import clsx from 'clsx'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathname = usePathname()
  const toggleButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const handleDropdownToggle = (event: React.MouseEvent, index: number) => {
    event.stopPropagation()
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Check if a dropdown is open
      if (openDropdown !== null) {
        // Check if the click is outside the dropdown content
        const isOutsideContent =
          !dropdownRefs.current[openDropdown] ||
          !dropdownRefs.current[openDropdown]?.contains(target)

        // Check if the click is outside the corresponding toggle button
        const isOutsideButton =
          !toggleButtonRefs.current[openDropdown] ||
          !toggleButtonRefs.current[openDropdown]?.contains(target)

        // If the click is outside both the content AND the button, close the dropdown
        if (isOutsideContent && isOutsideButton) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  const renderDropdownContent = (item: NonNullable<HeaderType['navItems']>[number]['navLink']) => {
    const { header, links, footer, ftCnt } = item?.ddContent || {}

    return (
      <div
        ref={(el) => {
          if (openDropdown !== null) dropdownRefs.current[openDropdown] = el
        }}
        className="absolute left-0 top-full z-50 w-full rounded-md"
      >
        <div className="p-6 mx-4 border border-muted bg-background shadow-lg dark:border-muted-foreground/30">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {header?.root?.children && header.root.children.length > 0 && (
                <div className="pb-4 border-b border-border dark:border-muted-foreground/30">
                  <RichText data={header} enableGutter={false} />
                </div>
              )}

              {links && links.length > 0 && (
                <ul className="space-y-2">
                  {links.map((linkItem, idx) => (
                    <li key={idx}>
                      <CMSLink {...linkItem.link} className="hover:text-primary" />
                    </li>
                  ))}
                </ul>
              )}

              {footer?.root?.children && footer.root.children.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border dark:border-muted-foreground/30">
                  <RichText data={footer} enableGutter={false} />
                </div>
              )}
            </div>

            {ftCnt && (
              <div className="col-span-1 space-y-4 rounded-md bg-muted/50 p-4 dark:bg-muted/20">
                {ftCnt.image && typeof ftCnt.image === 'object' && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <Media resource={ftCnt.image} fill className="object-cover" />
                  </div>
                )}
                <h4 className="font-semibold text-foreground">{ftCnt.title}</h4>
                <p className="text-sm text-muted-foreground">{ftCnt.description}</p>
                {ftCnt.link?.url && (
                  <div className="mt-4">
                    <CMSLink {...ftCnt.link} appearance="default" className="text-sm" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav className="hidden lg:flex gap-6 items-center">
      {navItems.map((item, i) => {
        const { navLink } = item
        if (!navLink?.link) return null

        const hasDropdown = navLink.hasDropdown
        const isOpen = openDropdown === i

        const isActive =
          //@ts-expect-error fix later
          pathname === navLink.link.url || pathname.includes(navLink.link?.reference?.value?.slug)

        // Underline class for active state only (no hover effect)
        const underlineClass =
          'relative py-2 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-300'
        const activeClass = isActive ? 'before:scale-x-100 before:bg-primary' : ''

        return (
          <div key={i} className="">
            <div className="flex items-center">
              {!hasDropdown ? (
                <CMSLink
                  {...navLink.link}
                  className={clsx(
                    'text-sm font-medium text-foreground/70 transition-colors hover:text-foreground', // Removed hover underline
                    underlineClass,
                    activeClass,
                  )}
                />
              ) : (
                <div className="">
                  <button
                    //@ts-expect-error fix later
                    ref={(el) => (toggleButtonRefs.current[i] = el)}
                    onClick={(e) => handleDropdownToggle(e, i)}
                    className={clsx(
                      'flex items-center text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus:outline-none', // Removed hover underline
                      underlineClass,
                      isOpen && activeClass, // Keep active style for open dropdown
                    )}
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${navLink.link.label} dropdown`}
                  >
                    <span>{navLink.link.label}</span>
                    <ChevronDown
                      className={clsx(
                        'ml-1 h-4 w-4 transition-transform duration-200',
                        isOpen ? 'rotate-180' : '',
                      )}
                    />
                  </button>
                </div>
              )}
            </div>

            {hasDropdown && isOpen && renderDropdownContent(navLink)}
          </div>
        )
      })}
    </nav>
  )
}
