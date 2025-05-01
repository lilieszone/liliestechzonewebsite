import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import type { Media } from '@/payload-types'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

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

  const retryOperation = async <T>(operation: () => Promise<T>, description: string): Promise<T> => {
    let lastError: Error | null = null
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await operation()
      } catch (error) {
        payload.logger.warn(`${description} - Attempt ${attempt} failed`, error)
        lastError = error as Error
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt))
      }
    }
    payload.logger.error(`${description} failed after ${MAX_RETRIES} attempts`)
    throw lastError || new Error(`${description} failed`)
  }
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((globalSlug) => {
      // Determine the default empty state based on the global slug
      let emptyData: Record<string, any> = {}
      if (globalSlug === 'header' || globalSlug === 'footer') {
        emptyData = { navItems: [] }
      } else if (globalSlug === 'partners') {
        emptyData = { 
          partnerList: [
            {
              name: 'Default Partner',
              logo: null,
              link: 'https://example.com',
              description: 'A default partner for seeding purposes'
            }
          ]
        }
      }
      // Add more else if blocks for other globals if needed

      return payload.updateGlobal({
        slug: globalSlug,
        data: emptyData,
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      })
    }),
  )

  // Delete all collections except users
  // Clear non-user collections with retry mechanism
  await retryOperation(async () => {
    await Promise.all(
      collections
        .filter((collection) => collection !== 'users')
        .map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
    )
  }, 'Clearing non-user collections')

  // Delete versions for non-user collections with retry mechanism
  await retryOperation(async () => {
    await Promise.all(
      collections
        .filter((collection) => collection !== 'users')
        .filter((collection) => Boolean(payload.collections[collection].config.versions))
        .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
    )
  }, 'Deleting non-user collection versions')

  payload.logger.info(`— Seeding demo author and user...`)

  // Delete only the demo author, preserve other users
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        firstName: 'Demo Author',
        lastName: 'author',
        email: 'demo-author@example.com',
        roles: 'editor',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),

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
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [homePage, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({
        heroImage: imageHomeDoc,
        metaImage: image2Doc,
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
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
        ],
      },
    }),
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
