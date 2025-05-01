'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { FaqBlockProps, questionsInt } from './Component'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react'
import BackgroundPattern from '@/components/BgOval'

const FaqComponent: React.FC<FaqBlockProps> = ({ question, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div
      ref={containerRef}
      className="rounded-xl bg-background relative bottom-[-20px] w-full sm:flex flex-col md:flex-row px-2 md:px-8 py-12"
    >
      <BackgroundPattern />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:max-w-[300px] mb-8 md:mb-0 w-[300px]"
      >
        <motion.h2 className="text-4xl font-bold">{title}</motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 flex-1 md:ml-8"
      >
        {question.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-b border-gray-200"
          >
            <motion.button
              className="w-full flex justify-between items-center py-4 text-left hover:text-blue-600 transition-colors"
              onClick={() => toggleQuestion(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="text-lg font-medium">{item.Question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-4">
                    {/* @ts-expect-error not sure why RichText are thrwing errors*/}
                    <RichText className="text-lg" data={item.answer} />
                    {item.links?.map((link, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="mt-4"
                      >
                        <CMSLink {...link.link}>{link.link.label}</CMSLink>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default FaqComponent
