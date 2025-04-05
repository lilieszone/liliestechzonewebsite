'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { BoltIcon, BookMarkedIcon, CheckIcon } from 'lucide-react'

// Type definitions for the pricing block
type Feature = {
  id?: string
  text: string
  included: boolean
}

type Plan = {
  id?: string
  type: string
  tagline: string
  monthlyPrice?: number | null
  yearlyPrice?: number | null
  priceSuffix?: string
  description?: string
  customPriceLabel?: string
  isCustomPricing?: boolean
  isPopular?: boolean
  features: Feature[]
}

type PricingBlockProps = {
  blockType: 'pricing'
  eyebrow?: string
  heading?: string
  highlightedText?: string
  subtitle?: string
  monthlyLabel?: string
  yearlyLabel?: string
  popularLabel?: string
  buttonText?: string
  plans: Plan[]
  backgroundColor?: 'transparent' | 'white' | 'gray-50' | 'blue-50'
}

export const PricingBlockComponent: React.FC<PricingBlockProps> = ({
  eyebrow = 'PRICING',
  heading = 'Explore Our Pricing',
  highlightedText = 'Pricing',
  subtitle = "Easily tweak layouts, update content, and personalize your site with Framer's intuitive editor—no coding needed.",
  monthlyLabel = 'Monthly',
  yearlyLabel = 'Yearly',
  popularLabel = 'MOST POPULAR',
  buttonText = 'Start Today',
  plans = [],
  backgroundColor = 'white',
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  // Handle empty plans
  if (!plans || plans.length === 0) {
    return null
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const toggleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const bgClass = backgroundColor !== 'transparent' ? `bg-${backgroundColor}` : ''

  const renderHeading = () => {
    if (!heading) return null

    // Split the heading to highlight the specified part
    const parts = heading.split(highlightedText || 'Pricing')

    return (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {parts[0]}
        <span className="text-emerald-500">{highlightedText || 'Pricing'}</span>
        {parts.length > 1 ? parts[1] : ''}
      </h2>
    )
  }

  return (
    <section className={clsx('py-16 md:py-24')}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {eyebrow && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-500 ring-1 ring-inset ring-emerald-600/20 mb-2">
              <BoltIcon className="h-4 w-4 mr-1 text-emerald-500" /> {eyebrow}
            </span>
          )}
          {renderHeading()}
          {subtitle && (
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Toggle Section */}
        <motion.div
          className="flex justify-center mb-10"
          variants={toggleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative rounded-full p-1 flex">
            <span
              className="absolute inset-0 m-1 rounded-full bg-emerald-600 transition-transform duration-300 ease-in-out"
              style={{
                width: 'calc(50% - 0.25rem)',
                transform: billingCycle === 'monthly' ? 'translateX(0%)' : 'translateX(100%)',
              }}
              aria-hidden="true"
            />
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative z-10 rounded-full py-1 px-4 sm:px-6 text-sm font-semibold transition-colors duration-300 ease-in-out ${
                billingCycle === 'monthly' ? 'text-white' : 'text-gray-700'
              }`}
            >
              {monthlyLabel}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative z-10 rounded-full py-1 px-4 sm:px-6 text-sm font-semibold transition-colors duration-300 ease-in-out ${
                billingCycle === 'yearly' ? 'text-white' : 'text-gray-700'
              }`}
            >
              {yearlyLabel}
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards Section */}
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan) => {
            const isPopular = plan.isPopular
            const isCustomPricing = plan.isCustomPricing
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
            const displayPrice = isCustomPricing ? plan.customPriceLabel : `$${price}`
            const priceSuffix = isCustomPricing
              ? ''
              : billingCycle === 'yearly'
                ? ' / yr'
                : plan.priceSuffix || '/ mo'

            // Dynamic classes based on popularity
            const cardBg = isPopular ? 'bg-emerald-900' : 'bg-white'
            const cardBorder = isPopular ? 'border-2 border-emerald-500' : 'border border-gray-200'
            const cardTextColor = isPopular ? 'text-white' : 'text-gray-900'
            const subtextColor = isPopular ? 'text-gray-300' : 'text-gray-600'

            // Button styles
            const buttonBg = isPopular ? 'bg-emerald-600' : 'bg-white'
            const buttonBorder = isPopular
              ? 'border border-emerald-600'
              : 'border border-emerald-500'
            const buttonTextColor = isPopular ? 'text-white' : 'text-emerald-600'

            // Feature icon colors
            const includedIconColor = isPopular ? 'text-green-400' : 'text-green-500'
            const excludedIconColor = isPopular ? 'text-red-400' : 'text-red-500'

            return (
              <motion.div
                key={plan.id || plan.type}
                className={clsx(
                  'rounded-3xl p-8 relative flex flex-col',
                  cardBg,
                  cardBorder,
                  cardTextColor,
                  isPopular ? 'transform lg:scale-105 z-10' : '',
                )}
                variants={itemVariants}
                whileHover={{ scale: isPopular ? 1.02 : 1.05, transition: { duration: 0.3 } }}
              >
                {isPopular && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 transform">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-1 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-600/20">
                      🔥 {popularLabel}
                    </span>
                  </div>
                )}

                <div className="flex-grow">
                  {/* Plan Header */}
                  <div
                    className={`flex items-center gap-x-2 mb-1 ${isPopular ? 'text-white' : 'text-emerald-500'}`}
                  >
                    <BoltIcon className="h-5 w-5" aria-hidden="true" />
                    <h3 className="text-lg font-semibold leading-6">{plan.type}</h3>
                  </div>
                  <p className={`mt-1 text-sm leading-6 ${subtextColor}`}>{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight">{displayPrice}</span>
                    {!isCustomPricing && (
                      <span
                        className={`text-sm font-semibold leading-6 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}
                      >
                        {priceSuffix}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-3 text-sm leading-6 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                    {plan.features.map((feature) => (
                      <li key={feature.id || feature.text} className="flex gap-x-3 items-center">
                        {feature.included ? (
                          <CheckIcon className={`h-5 w-5 flex-none ${includedIconColor}`} />
                        ) : (
                          <BookMarkedIcon className={`h-5 w-5 flex-none ${excludedIconColor}`} />
                        )}
                        <span className={cardTextColor}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="mt-auto pt-8">
                  <motion.a
                    href="#"
                    className={clsx(
                      'block w-full rounded-md py-2.5 px-3.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600',
                      buttonBg,
                      buttonBorder,
                      buttonTextColor,
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {buttonText}
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default PricingBlockComponent
