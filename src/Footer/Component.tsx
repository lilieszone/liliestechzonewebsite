import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Header } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import SocialProviders from './SocialProviders'

export async function Footer() {
  //@ts-expect-error - footer is not defined
  const footer: Footer = await getCachedGlobal('footer', 1)()
  //@ts-expect-error - headerData is not defined
  const headerData: Header = await getCachedGlobal('header', 1)()
  const navItems = footer?.navItems || []
  const providers = footer?.providers || [] // Get providers

  return (
    <footer className="border-t border-border">
      <div className="px-2 lg:px-12 py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
          <h1 className="ml-2 font-pacifico text-lg text-primary-foreground">
            {headerData?.siteTitle}
          </h1>
        </Link>
        {/* <h3 className="text-white dark:text-black">ClearResult Consult</h3> */}

        <div>
          <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
            <ThemeSelector />
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="" key={i} {...link} />
              })}
            </nav>
          </div>
          <nav className="flex flex-row gap-4">
            {providers.map(({ title, link }, i) => (
              //@ts-expect-error - link is always going to be defined since it is required
              <SocialProviders key={i} title={title} link={link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
