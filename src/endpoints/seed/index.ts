import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import type { Media } from '@/payload-types'
import * as fs from 'fs'
import * as path from 'path'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { about as aboutPageData } from './about-page'
import { services as servicesPageData } from './services-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { imageCallToAction } from './image-calltoaction'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { post4 } from './post-4'
import { post5 } from './post-5'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'users',
]
const globals: GlobalSlug[] = ['header', 'footer', 'partners']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  const MAX_RETRIES = 3
  const RETRY_DELAY = 1000 // 1 second

  const retryOperation = async <T>(
    operation: () => Promise<T>,
    description: string,
  ): Promise<T> => {
    let lastError: Error | null = null
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await operation()
      } catch (error) {
        payload.logger.warn(`${description} - Attempt ${attempt} failed`, error)
        lastError = error as Error
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * attempt))
      }
    }
    payload.logger.error(`${description} failed after ${MAX_RETRIES} attempts`)
    throw lastError || new Error(`${description} failed`)
  }
  payload.logger.info('Seeding database...')

  // Clear collections and globals with appropriate default values for required fields
  payload.logger.info(`— Clearing collections and globals...`)

  // Define default values for globals
  const globalDefaults: Record<GlobalSlug, Record<string, any>> = {
    header: {
      navItems: [],
    },
    footer: {
      navItems: [],
    },
    partners: {
      partnerList: [
        {
          title: 'Default Partner',
          link: '#',
        },
      ],
    },
  }

  // Update globals with defaults instead of trying to clear them
  await Promise.all(
    globals.map((globalSlug) => {
      return payload.updateGlobal({
        slug: globalSlug,
        data: globalDefaults[globalSlug as keyof typeof globalDefaults] || {},
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      })
    }),
  )

  // Use a more targeted approach for collections - delete documents one by one
  for (const collection of collections) {
    if (collection === 'users') {
      // Handle users collection specially - only remove demo users and preserve others
      payload.logger.info(`— Preserving existing admin users...`)

      await payload
        .delete({
          collection: 'users',
          depth: 0,
          where: {
            email: {
              equals: 'demo-author@example.com',
            },
          },
        })
        .catch((err) => {
          payload.logger.warn(`Failed to delete demo author, might not exist yet: ${err.message}`)
        })

      continue
    }

    payload.logger.info(`— Clearing collection: ${collection}...`)

    try {
      // First find all documents in the collection
      const docs = await payload.find({
        collection,
        limit: 1000,
        depth: 0,
      })

      // Then delete them one by one to avoid cascading issues
      if (docs.docs.length > 0) {
        for (const doc of docs.docs) {
          await payload
            .delete({
              collection,
              id: doc.id,
              depth: 0,
              context: {
                disableRevalidate: true,
              },
            })
            .catch((err) => {
              payload.logger.warn(
                `Failed to delete ${collection} document ${doc.id}: ${err.message}`,
              )
            })
        }
      }

      // Also delete versions if they exist
      if (payload.collections[collection].config.versions) {
        await payload.db
          .deleteVersions({
            collection,
            req,
            where: {},
          })
          .catch((err) => {
            payload.logger.warn(`Failed to delete versions for ${collection}: ${err.message}`)
          })
      }
    } catch (error) {
      payload.logger.warn(`Error clearing collection ${collection}:`, error)
    }
  }

  payload.logger.info(`— Seeding demo author and user...`)

  // Create the demo author
  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      firstName: 'Demo Author',
      lastName: 'author',
      email: 'demo-author@example.com',
      roles: 'editor',
      password: 'password',
    },
  })

  payload.logger.info(`— Seeding media...`)

  // Function to read local files as File objects
  const readLocalFile = (filePath: string): File => {
    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
    const mimeType = `image/${path.extname(filePath).substring(1)}`

    return {
      name: fileName,
      data: fileBuffer,
      mimetype: mimeType,
      size: fileBuffer.length,
    }
  }

  // Paths to the local CallToAction images
  const callToActionLightPath = path.resolve(process.cwd(), 'public/images/CallToAction-light.png')
  const callToActionDarkPath = path.resolve(process.cwd(), 'public/images/CallToAction-dark.png')

  // Fetch image buffers with retry
  const fetchImageWithRetry = async (url: string): Promise<File> => {
    return retryOperation(async () => fetchFileByURL(url), `Fetching image from ${url}`)
  }

  const [
    image1Buffer,
    image2Buffer,
    image3Buffer,
    hero1Buffer,
    callToActionLightBuffer,
    callToActionDarkBuffer,
  ] = await Promise.all([
    fetchImageWithRetry(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchImageWithRetry(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchImageWithRetry(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchImageWithRetry(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
    // Read local CallToAction images from public directory
    readLocalFile(callToActionLightPath),
    readLocalFile(callToActionDarkPath),
  ])

  // Create media and categories with retry
  const [
    image1Doc,
    image2Doc,
    image3Doc,
    imageHomeDoc,
    technologyCategory,
    newsCategory,
    financeCategory,
    designCategory,
    softwareCategory,
    engineeringCategory,
  ] = await Promise.all([
    retryOperation(
      () =>
        payload.create({
          collection: 'media',
          data: image1,
          file: image1Buffer,
        }),
      'Creating image1',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'media',
          data: image2,
          file: image2Buffer,
        }),
      'Creating image2',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'media',
          data: image2,
          file: image3Buffer,
        }),
      'Creating image3',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'media',
          data: imageHero1,
          file: hero1Buffer,
        }),
      'Creating hero image',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'categories',
          data: {
            title: 'Technology',
            breadcrumbs: [
              {
                label: 'Technology',
                url: '/technology',
              },
            ],
          },
        }),
      'Creating Technology category',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'categories',
          data: {
            title: 'News',
            breadcrumbs: [
              {
                label: 'News',
                url: '/news',
              },
            ],
          },
        }),
      'Creating News category',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'categories',
          data: {
            title: 'Finance',
            breadcrumbs: [
              {
                label: 'Finance',
                url: '/finance',
              },
            ],
          },
        }),
      'Creating Finance category',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'categories',
          data: {
            title: 'Design',
            breadcrumbs: [
              {
                label: 'Design',
                url: '/design',
              },
            ],
          },
        }),
      'Creating Design category',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'categories',
          data: {
            title: 'Software',
            breadcrumbs: [
              {
                label: 'Software',
                url: '/software',
              },
            ],
          },
        }),
      'Creating Software category',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'categories',
          data: {
            title: 'Engineering',
            breadcrumbs: [
              {
                label: 'Engineering',
                url: '/engineering',
              },
            ],
          },
        }),
      'Creating Engineering category',
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Loop through all the collections
  const postsDocs = await Promise.all([
    retryOperation(
      () =>
        payload.create({
          collection: 'posts',
          data: post1({
            heroImage: image1Doc,
            blockImage: image2Doc,
            author: demoAuthor,
          }),
        }),
      'Creating post 1',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'posts',
          data: post2({
            heroImage: image2Doc,
            blockImage: image1Doc,
            author: demoAuthor,
          }),
        }),
      'Creating post 2',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'posts',
          data: post3({
            heroImage: image2Doc,
            blockImage: image1Doc,
            author: demoAuthor,
          }),
        }),
      'Creating post 3',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'posts',
          data: post4({
            heroImage: image1Doc,
            blockImage: image2Doc,
            author: demoAuthor,
          }),
        }),
      'Creating post 4',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'posts',
          data: post5({
            heroImage: image2Doc,
            blockImage: image1Doc,
            author: demoAuthor,
          }),
        }),
      'Creating post 5',
    ),
  ])

  // Update related posts for each blog post
  await Promise.all(
    postsDocs.map((post, i) => {
      const relatedPosts = postsDocs
        .filter((_, j) => j !== i) // exclude the current post
        .slice(0, 2) // get up to 2 related posts
        .map((related) => related.id)

      return payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          relatedPosts,
        },
      })
    }),
  )

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await retryOperation(
    () =>
      payload.create({
        collection: 'forms',
        depth: 0,
        data: contactFormData,
      }),
    'Creating contact form',
  )

  payload.logger.info(`— Seeding pages...`)

  const [homePage, contactPage, aboutPage, servicesPage] = await Promise.all([
    retryOperation(
      () =>
        payload.create({
          collection: 'pages',
          depth: 0,
          data: home({
            heroImage: imageHomeDoc,
            metaImage: image2Doc,
          }),
        }),
      'Creating home page',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'pages',
          depth: 0,
          data: contactPageData({ contactForm: contactForm }),
        }),
      'Creating contact page',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'pages',
          depth: 0,
          data: aboutPageData({
            metaImage: image2Doc,
          }),
        }),
      'Creating about page',
    ),
    retryOperation(
      () =>
        payload.create({
          collection: 'pages',
          depth: 0,
          data: servicesPageData({
            metaImage: image2Doc,
          }),
        }),
      'Creating services page',
    ),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    retryOperation(
      () =>
        payload.updateGlobal({
          slug: 'header',
          data: {
            navItems: [
              {
                navLink: {
                  link: {
                    type: 'custom',
                    label: 'Posts',
                    url: '/posts',
                  },
                  hasDropdown: false,
                },
              },
              {
                navLink: {
                  link: {
                    type: 'custom',
                    label: 'Product',
                    url: '/product',
                  },
                  hasDropdown: true,
                  ddContent: {
                    header: {
                      root: {
                        type: 'root',
                        indent: 0,
                        direction: null,
                        format: '',
                        version: 1,
                        children: [
                          {
                            type: 'heading',
                            tag: 'h4',
                            direction: null,
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [
                              {
                                mode: 'normal',
                                text: 'Explore Payload Features',
                                type: 'text',
                                version: 1,
                                style: '',
                                detail: 0,
                                format: 0,
                              },
                            ],
                          },
                        ],
                      },
                    },
                    links: [
                      { link: { type: 'custom', label: 'Core Features', url: '/features/core' } },
                      { link: { type: 'custom', label: 'Plugins', url: '/features/plugins' } },
                      { link: { type: 'custom', label: 'Cloud', url: '/features/cloud' } },
                    ],
                    footer: {
                      root: {
                        type: 'root',
                        indent: 0,
                        direction: null,
                        format: '',
                        version: 1,
                        children: [
                          {
                            type: 'paragraph',
                            direction: null,
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [
                              {
                                mode: 'normal',
                                text: 'Need help? ',
                                type: 'text',
                                version: 1,
                                style: '',
                                detail: 0,
                                format: 1,
                              },
                              {
                                mode: 'normal',
                                text: 'Visit our support center.',
                                type: 'text',
                                version: 1,
                                style: '',
                                detail: 0,
                                format: 0,
                              },
                            ],
                          },
                        ],
                      },
                    },
                    ftCnt: {
                      title: 'Payload 3.0 Live!',
                      description:
                        'Discover the latest enhancements and features in our newest version.',
                      image: image1Doc.id,
                      link: {
                        type: 'custom',
                        label: 'Learn More',
                        url: '/payload-3',
                      },
                    },
                  },
                },
              },
              {
                navLink: {
                  link: {
                    type: 'reference',
                    label: 'Contact',
                    reference: {
                      relationTo: 'pages',
                      value: contactPage.id,
                    },
                  },
                  hasDropdown: false,
                },
              },
              {
                navLink: {
                  link: {
                    type: 'reference',
                    label: 'About',
                    reference: {
                      relationTo: 'pages',
                      value: aboutPage.id,
                    },
                  },
                  hasDropdown: false,
                },
              },

              {
                navLink: {
                  link: {
                    type: 'reference',
                    label: 'Services',
                    reference: {
                      relationTo: 'pages',
                      value: servicesPage.id,
                    },
                  },
                  hasDropdown: false,
                },
              },
            ],
          },
        }),
      'Updating header global',
    ),
    retryOperation(
      () =>
        payload.updateGlobal({
          slug: 'footer',
          data: {
            navItems: [
              {
                link: {
                  type: 'custom',
                  label: 'Admin',
                  url: '/admin',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Source Code',
                  newTab: true,
                  url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Payload',
                  newTab: true,
                  url: 'https://payloadcms.com/',
                },
              },
            ],
          },
        }),
      'Updating footer global',
    ),
    retryOperation(
      () =>
        payload.updateGlobal({
          slug: 'partners',
          data: {
            partnerList: [
              {
                logo: image1Doc.id,
                title: 'Placeholder Partner',
                link: '#',
              },
              {
                logo: image1Doc.id,
                title: 'Placeholder Partner 3',
                link: '#',
              },
              {
                logo: image1Doc.id,
                title: 'Placeholder Partner 2',
                link: '#',
              },
            ],
          },
        }),
      'Updating partners global',
    ),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
