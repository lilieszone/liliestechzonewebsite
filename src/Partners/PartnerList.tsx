import React from 'react'
import { Media, Partner } from '@/payload-types' // Assuming your generated types are here
import Link from 'next/link' // Using Next.js Link for client-side navigation if applicable
import Image from 'next/image' // Using Next.js Image for optimization
import { InfiniteSlider } from '@/components/core/infinite-slider'

// Define the shape of a single partner based on your GlobalConfig
// It's good practice to have specific types for your front-end components
// You might generate these types from Payload or define them manually
// interface Partner {
//   id?: string // Optional ID from Payload array item
//   logo: Media // Logo is required and is a Media object
//   title: string // Title is required
//   link?: string | null // Link is optional
// }

// Define the props for the Component
// It expects the data fetched from the 'partners' global
interface PartnersComponentProps {
  partners: Partner | null | undefined
}

export const PartnerList = ({ partners }: PartnersComponentProps) => {
  // Handle cases where partnerList might be empty or not provided
  const partnerList = partners?.partnerList || []
  if (!partnerList.length) {
    return null // Or return a message like <p>No partners to display.</p>
  }

  return (
    <div className="w-full absolute top-[-200px] left-0 z-10">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Our Partners</h2>
        <InfiniteSlider gap={10} className="my-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center items-center">
            {partnerList.map((partner, index) => {
              // Ensure logo and logo.url exist before trying to render
              //@ts-expect-error ignore logo
              if (!partner.logo?.url) {
                console.warn(`Partner "${partner.title}" is missing a logo URL.`)
                return null // Skip rendering this partner if logo is invalid
              }

              const partnerContent = (
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-16 mb-2 rounded-full overflow-hidden">
                    <Image
                      //@ts-expect-error ignore logoImage
                      src={partner.logo.url}
                      alt={`${partner.title} Logo`}
                      layout="fill"
                      objectFit="contain" // Adjust objectFit as needed (contain, cover, etc.)
                      priority={index < 4} // Prioritize loading for first few images
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium">{partner.title}</span>
                </div>
              )

              // Render with a link if partner.link exists, otherwise just the content
              return partner.link ? (
                <Link
                  key={partner.id || index}
                  href={partner.link}
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Security best practice for target="_blank"
                  className="transition-opacity hover:opacity-80"
                >
                  {partnerContent}
                </Link>
              ) : (
                <div key={partner.id || index}>{partnerContent}</div>
              )
            })}
          </div>
        </InfiniteSlider>
      </div>
    </div>
  )
}
