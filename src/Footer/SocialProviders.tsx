import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Header } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
// Import the specific icons you need from react-icons
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa'

// Create a separate component for rendering provider links
const SocialProviders: React.FC<{ title: string; link: { url: string } }> = ({ title, link }) => {
  let icon

  switch (
    title.toLowerCase() // Normalize for case-insensitive matching
  ) {
    case 'facebook':
      icon = <FaFacebookF className="w-5 h-5" />
      break
    case 'twitter':
      icon = <FaTwitter className="w-5 h-5" />
      break
    case 'instagram':
      icon = <FaInstagram className="w-5 h-5 mr-2" />
      break
    case 'linkedin':
      icon = <FaLinkedinIn className="w-5 h-5" /> // Note the "In" suffix
      break
    case 'github':
      icon = <FaGithub className="w-5 h-5" />
      break
    case 'youtube':
      icon = <FaYoutube className="w-5 h-5" />
      break
    case 'whatsapp':
      icon = <FaWhatsapp className="w-5 h-5" />
      break
    default:
      icon = null // Or a default icon if you prefer
  }

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center bg-white p-4 rounded-full dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    >
      {icon}
      {icon ? null : title} {/* Only show title if there's no icon */}
    </Link>
  )
}

export default SocialProviders
