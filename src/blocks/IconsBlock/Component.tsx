'use client'
import React from 'react'
import { Block } from 'payload'
import * as FaIcons from 'react-icons/fa'
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md'
import * as FiIcons from 'react-icons/fi'
import { motion } from 'framer-motion'

// Map the icon libraries to their respective imports
const iconLibraries = {
  fa: FaIcons,
  hi: HiIcons,
  md: MdIcons,
  fi: FiIcons,
}

type FeatureType = {
  iconName: string
  iconColor: string
  iconLibrary: 'fa' | 'hi' | 'md' | 'fi'
  title: string
  description: string
}

type IconsBlockType = {
  heading?: string
  features: FeatureType[]
  backgroundColor: string
}

export const IconsBlock: React.FC<IconsBlockType> = (block) => {
  const { heading, features, backgroundColor } = block

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className={`py-16`}>
      <div className="container mx-auto px-4">
        {heading && <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => {
            // Dynamically get the icon from the right library
            const IconLibrary = iconLibraries[feature.iconLibrary]
            // @ts-ignore - We're dynamically accessing the icon by name
            const IconComponent = IconLibrary[feature.iconName]

            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 border  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {IconComponent ? (
                    <IconComponent
                      size={32}
                      color={feature.iconColor}
                      className="transform hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-red-500">Icon not found</div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
