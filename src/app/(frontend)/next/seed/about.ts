import type { Page } from '@/payload-types'

// TODO: Replace with actual image IDs from CMS
const placeholderImageIDs = [
  '668eb843b01c1c4953b18a16', // Placeholder ID 1
  '668eb850b01c1c4953b18a18', // Placeholder ID 2
  '668eb860b01c1c4953b18a1a', // Placeholder ID 3
]

// Function to get a random image ID
const getRandomImageId = (): string => {
  const randomIndex = Math.floor(Math.random() * placeholderImageIDs.length)
  return placeholderImageIDs[randomIndex]
}

export const seedAbout = async (): Promise<Page | null> => {
  try {
    const aboutPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us / Our Approach',
        slug: 'about',
        layout: [
          {
            blockType: 'hero',
            hero: {
              type: 'default',
              richText: [
                {
                  children: [
                    {
                      text: 'Experts in Modern Web Application Development',
                    },
                  ],
                  type: 'h1',
                },
                {
                  children: [
                    {
                      text: 'Learn about our vision, mission, and the development philosophy that drives our success.',
                    },
                  ],
                  type: 'p',
                },
              ],
              media: getRandomImageId(), // Assign random image ID
            },
          },
          {
            blockType: 'content',
            contentFields: {
              layout: 'oneColumn',
              columns: [
                {
                  size: 'full',
                  richText: [
                    { children: [{ text: 'Our Vision' }], type: 'h2' },
                    {
                      children: [
                        {
                          text: 'To create a platform that enables efficient building and delivery of complex, customized web applications for clients while showcasing expertise through integrated YouTube content.',
                        },
                      ],
                      type: 'blockquote',
                    },
                    { children: [{ text: 'Our Mission' }], type: 'h2' },
                    {
                      children: [
                        {
                          text: 'We streamline the development process for sophisticated web applications using Payload CMS 3.0, delivering exceptional value and fostering transparent partnerships with our clients. We aim to demonstrate technical excellence and share our knowledge through practical examples and educational content.',
                        },
                      ],
                    },
                    { children: [{ text: 'Development Philosophy' }], type: 'h2' },
                    { children: [{ text: 'Code Quality That Speaks for Itself' }], type: 'h3' },
                    {
                      children: [
                        {
                          text: 'We follow a set of core development principles that guide every project:',
                        },
                      ],
                    },
                    {
                      children: [
                        { children: [{ text: 'Type Safety First' }], type: 'li' },
                        { children: [{ text: 'Component-Driven Design' }], type: 'li' },
                        { children: [{ text: 'Performance by Design' }], type: 'li' },
                        { children: [{ text: 'Accessibility as Standard' }], type: 'li' },
                        { children: [{ text: 'Continuous Testing' }], type: 'li' },
                      ],
                      type: 'ul',
                    },
                  ],
                  links: [],
                },
              ],
            },
          },
          {
            blockType: 'content',
            contentFields: {
              layout: 'oneColumn',
              columns: [
                {
                  size: 'full',
                  richText: [
                    { children: [{ text: 'Why We Specialize in Payload CMS 3.0' }], type: 'h2' },
                    { children: [{ text: 'The Power of Headless Flexibility' }], type: 'h3' },
                    {
                      children: [
                        {
                          text: 'Payload CMS 3.0 is central to our approach. Its developer-centric design, TypeScript foundation, and highly extensible nature allow us to build truly custom backends and administrative interfaces efficiently. This means faster development, easier content management for you, and robust, scalable applications perfectly tailored to your needs.',
                        },
                      ],
                    },
                    {
                      children: [{ text: 'Our Approach: Collaboration & Transparency' }],
                      type: 'h2',
                    },
                    {
                      children: [
                        {
                          text: "We believe the best results come from partnership. Our integrated Client Portal provides a central hub for communication, feedback, and real-time project tracking, ensuring you're always informed. We complement this transparent workflow with educational content, including YouTube tutorials integrated directly into documentation, offering insights into our development practices and the technologies we use.",
                        },
                      ],
                    },
                  ],
                  links: [],
                },
              ],
            },
          },
          {
            blockType: 'content',
            contentFields: {
              layout: 'oneColumn',
              columns: [
                {
                  size: 'full',
                  richText: [
                    { children: [{ text: 'AI-Assisted Development Process' }], type: 'h2' },
                    {
                      children: [{ text: 'Accelerating Development with Intelligent Tools' }],
                      type: 'h3',
                    },
                    {
                      children: [
                        {
                          text: 'We leverage cutting-edge AI to enhance our development process at multiple levels:',
                        },
                      ],
                    },
                    {
                      children: [
                        { children: [{ text: 'Requirements Analysis' }], type: 'li' },
                        { children: [{ text: 'Architecture Planning' }], type: 'li' },
                        { children: [{ text: 'Code Generation' }], type: 'li' },
                        { children: [{ text: 'Quality Assurance' }], type: 'li' },
                        { children: [{ text: 'Performance Optimization' }], type: 'li' },
                      ],
                      type: 'ul',
                    },
                  ],
                  links: [],
                },
              ],
            },
          },
          {
            blockType: 'content',
            contentFields: {
              layout: 'oneColumn',
              columns: [
                {
                  size: 'full',
                  richText: [
                    { children: [{ text: 'Deployment Pipeline Excellence' }], type: 'h2' },
                    { children: [{ text: 'From Code to Production with Confidence' }], type: 'h3' },
                    {
                      children: [
                        {
                          text: 'Our deployment process is built for reliability and efficiency:',
                        },
                      ],
                    },
                    {
                      children: [
                        { children: [{ text: 'Continuous Integration' }], type: 'li' },
                        { children: [{ text: 'Infrastructure as Code' }], type: 'li' },
                        { children: [{ text: 'Containerization' }], type: 'li' },
                        { children: [{ text: 'Automated Rollbacks' }], type: 'li' },
                        { children: [{ text: 'Performance Monitoring' }], type: 'li' },
                      ],
                      type: 'ul',
                    },
                  ],
                  links: [],
                },
              ],
            },
          },
          {
            blockType: 'content',
            contentFields: {
              layout: 'oneColumn',
              columns: [
                {
                  size: 'full',
                  richText: [
                    { children: [{ text: 'Community Building & Knowledge Sharing' }], type: 'h2' },
                    { children: [{ text: 'Building More Than Applications' }], type: 'h3' },
                    {
                      children: [
                        {
                          text: "We're committed to growing the developer community through:",
                        },
                      ],
                    },
                    {
                      children: [
                        { children: [{ text: 'Open Source Contributions' }], type: 'li' },
                        { children: [{ text: 'YouTube Educational Content' }], type: 'li' },
                        { children: [{ text: 'Discussion Forums' }], type: 'li' },
                        { children: [{ text: 'Knowledge Base' }], type: 'li' },
                        { children: [{ text: 'Mentorship Programs' }], type: 'li' },
                      ],
                      type: 'ul',
                    },
                  ],
                  links: [],
                },
              ],
            },
          },
          {
            blockType: 'cta',
            ctaFields: {
              richText: [
                {
                  children: [{ text: 'Partner with Experienced Developers' }],
                  type: 'h2',
                },
              ],
              links: [
                {
                  link: {
                    type: 'custom',
                    url: '/contact',
                    label: 'Contact Us Today',
                    appearance: 'primary',
                  },
                },
              ],
            },
          },
        ],
        _status: 'published',
      },
    })

    console.log(`✅ Seeded About page: ${aboutPage.id}`)
    return aboutPage
  } catch (error: unknown) {
    console.error(`Error seeding About page: ${error}`)
    return null
  }
}
