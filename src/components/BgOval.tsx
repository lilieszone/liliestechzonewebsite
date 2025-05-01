import React from 'react'
import { motion } from 'framer-motion'

interface BackgroundPatternProps {
  className?: string
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.ellipse
          initial={{ y: 0 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          cx="1000"
          cy="600"
          rx="400"
          ry="300"
          className="fill-gray-100 dark:fill-gray-800"
          style={{ opacity: 0.5 }}
        />

        <motion.ellipse
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          cx="200"
          cy="150"
          rx="300"
          ry="200"
          className="fill-gray-100 dark:fill-gray-800"
          style={{ opacity: 0.3 }}
        />

        <motion.ellipse
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          cx="600"
          cy="750"
          rx="350"
          ry="250"
          className="fill-gray-100 dark:fill-gray-800"
          style={{ opacity: 0.4 }}
        />
      </motion.svg>
    </div>
  )
}

export default BackgroundPattern
