'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown !== null &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
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
        className="absolute left-0 top-full z-50 mt-2 w-[600px] rounded-md border border-muted bg-background p-6 shadow-lg dark:border-muted-foreground/30"
      >
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
    )
  }

  return (
    <nav className="hidden lg:flex gap-4 items-center">
      {navItems.map((item, i) => {
        const { navLink } = item
        if (!navLink?.link) return null

        const hasDropdown = navLink.hasDropdown
        const isOpen = openDropdown === i

        return (
          <div key={i} className="relative">
            <div className="flex items-center">
              <CMSLink
                {...navLink.link}
                className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              />

              {hasDropdown && (
                <button
                  onClick={() => handleDropdownToggle(i)}
                  className="ml-1 p-1 rounded-md text-foreground/60 hover:text-foreground/80 hover:bg-muted"
                  aria-expanded={isOpen}
                  aria-label={`Toggle ${navLink.link.label} dropdown`}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>

            {hasDropdown && isOpen && renderDropdownContent(navLink)}
          </div>
        )
      })}
    </nav>
  )
}
