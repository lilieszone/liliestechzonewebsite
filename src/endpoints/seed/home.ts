import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

// Helper function to format rich text (basic example)
const formatRichText = (text: string, type: 'h1' | 'h2' | 'h3' | 'p' | 'li' = 'p') => {
  const tagMap = {
    h1: 'heading',
    h2: 'heading',
    h3: 'heading',
    p: 'paragraph',
    li: 'listitem',
  }

  const element = {
    type: tagMap[type],
    tag: type === 'p' || type === 'li' ? undefined : type,
    children: [{ type: 'text', text }],
    direction: 'ltr' as const,
    format: '' as '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify',
    indent: 0,
    version: 1,
  }

  if (type === 'li') {
    return {
      type: 'list',
      tag: 'ul',
      children: [element],
      direction: 'ltr' as const,
      format: '' as '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify',
      indent: 0,
      listType: 'bullet',
      start: 1,
      version: 1,
    }
  }

  return element
}

const createRichTextRoot = (children: any[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify',
    indent: 0,
    version: 1,
  },
})

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      title: 'Building Powerful, Custom Web Applications. Streamlined.',
      subTagline: 'Your Vision, Expertly Engineered',
      highlightText: 'Powered by Payload 3.0 & Next.js',
      richText: createRichTextRoot([
        formatRichText(
          'We leverage Payload CMS 3.0 and modern technologies like Next.js to deliver high-performance, scalable web solutions tailored to your unique business needs. Experience a transparent development process designed for collaboration.',
          'p',
        ),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Start Your Project',
            url: '/contact',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'View Our Work',
            url: '/portfolio',
          },
        },
      ],
      media: heroImage.id,
    },
    layout: [
      // Value Proposition Section
      {
        blockName: 'Value Proposition',
        blockType: 'iconsBlock',
        backgroundColor: 'white',
        sectionId: 'value-proposition',
        heading: 'Your Vision, Expertly Engineered',
        features: [
          {
            iconName: 'FaCode',
            iconLibrary: 'fa',
            title: 'Custom Solutions',
            description: 'Tailored development for unique business logic.',
          },
          {
            iconName: 'SiPayloadcms',
            iconLibrary: 'fa',
            title: 'Payload CMS Experts',
            description: 'Deep expertise in leveraging Payload 3.0 for flexibility.',
          },
          {
            iconName: 'FaChartLine',
            iconLibrary: 'fa',
            title: 'Transparent Workflow',
            description: 'Real-time tracking via our Client Portal.',
          },
          {
            iconName: 'FaServer',
            iconLibrary: 'fa',
            title: 'Scalable Architecture',
            description: 'Built with Next.js & PostgreSQL for growth.',
          },
        ],
      },

      // Tech Stack Section
      {
        blockName: 'Tech Stack',
        blockType: 'featList',
        backgroundColor: 'gray-50',
        sectionId: 'tech-stack',
        imageCfg: {
          image: metaImage.id,
          imagePosition: 'right',
        },
        titleHighlightText: 'Modern Technologies',
        title: 'Built for Performance & Scale',
        features: [
          {
            featureText: 'Payload CMS 3.0: Flexible, TypeScript-based headless CMS',
          },
          {
            featureText: 'Next.js 15: React framework with App Router architecture',
          },
          {
            featureText: 'PostgreSQL: Robust relational database for complex data',
          },
          {
            featureText: 'AWS/Railway: Enterprise-grade cloud hosting infrastructure',
          },
        ],
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Explore Our Tech Stack',
              url: '/about#tech-stack',
            },
          },
        ],
      },

      // Developer Workspace Section
      {
        blockName: 'Developer Workspace',
        blockType: 'featList',
        backgroundColor: 'white',
        sectionId: 'developer-workspace',
        imageCfg: {
          image: metaImage.id,
          imagePosition: 'left',
        },
        titleHighlightText: 'Developer Tools',
        title: 'Built for Developers, By Developers',
        features: [
          {
            featureText: 'Code Repository Integration: Seamless GitHub/GitLab connectivity',
          },
          {
            featureText: 'Component Libraries: Access to field-tested, reusable assets',
          },
          {
            featureText: 'Deployment Pipeline: Automated testing and deployment workflows',
          },
        ],
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Learn About Our Developer Tools',
              url: '/features/developer-tools',
            },
          },
        ],
      },

      // YouTube Integration Section
      {
        blockName: 'YouTube Integration',
        blockType: 'iconsBlock',
        backgroundColor: 'gray-50',
        sectionId: 'youtube-integration',
        heading: 'Learn While We Build',
        features: [
          {
            iconName: 'FaYoutube',
            iconLibrary: 'fa',
            title: 'Embedded Tutorials',
            description: 'Video content alongside project documentation',
          },
          {
            iconName: 'FaVideo',
            iconLibrary: 'fa',
            title: 'Development Series',
            description: 'Watch real client projects come to life',
          },
          {
            iconName: 'FaCode',
            iconLibrary: 'fa',
            title: 'Technical Deep Dives',
            description: 'Understand the "why" behind our solutions',
          },
        ],
      },

      // AI Features Section
      {
        blockName: 'AI Features',
        blockType: 'iconsBlock',
        backgroundColor: 'white',
        sectionId: 'ai-features',
        heading: 'The Future of Development is Here',
        features: [
          {
            iconName: 'FaRobot',
            iconLibrary: 'fa',
            title: 'Requirements Analysis',
            description: 'AI assistance for project scoping',
          },
          {
            iconName: 'FaCode',
            iconLibrary: 'fa',
            title: 'Code Generation',
            description: 'Automated boilerplate for common patterns',
          },
          {
            iconName: 'FaCheckCircle',
            iconLibrary: 'fa',
            title: 'Quality Assurance',
            description: 'AI-powered testing and optimization',
          },
        ],
      },

      // Client Portal Section
      {
        blockName: 'Client Portal',
        blockType: 'featList',
        backgroundColor: 'gray-50',
        sectionId: 'client-portal',
        imageCfg: {
          image: metaImage.id,
          imagePosition: 'right',
        },
        titleHighlightText: 'Client Portal',
        title: 'Collaborate Seamlessly',
        features: [
          {
            featureText: 'Real-time Project Tracking & Updates',
          },
          {
            featureText: 'Integrated Communication Channels',
          },
          {
            featureText: 'Deliverable Review & Approval System',
          },
          {
            featureText: 'Simplified Invoicing & Payments',
          },
        ],
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Learn About the Portal',
              url: '/features/client-portal',
            },
          },
        ],
      },

      // Testimonials Section
      {
        blockName: 'Testimonials',
        blockType: 'testimonials',
        backgroundColor: 'white',
        sectionId: 'testimonials',
        heading: 'Trusted by Innovative Businesses',
        testimonials: [
          {
            testimonialText:
              'This platform revolutionized how we build client websites. The combination of Payload CMS and Next.js has significantly improved our development workflow.',
            authorName: 'Jane Doe',
            authorTitle: 'Acme Web Solutions',
            highlightCard: true,
          },
          {
            testimonialText:
              'The integrated YouTube tutorials and streamlined workflow saved us countless hours. Highly recommended!',
            authorName: 'John Smith',
            authorTitle: 'Innovate Digital',
            highlightCard: false,
          },
        ],
      },

      // Final CTA Section
      {
        blockName: 'Final CTA',
        blockType: 'cta',
        backgroundColor: 'blue-50',
        sectionId: 'final-cta',
        richText: createRichTextRoot([
          formatRichText('Ready to Elevate Your Digital Presence?', 'h3'),
          formatRichText(
            "Let's discuss how a custom web application can drive your business forward.",
            'p',
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Request a Consultation',
              url: '/contact',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'Professional Web Application Development Platform',
      description:
        'Build, manage, and deploy client web applications efficiently with our platform featuring Payload CMS, Next.js, YouTube integration, and AI tools.',
      image: metaImage.id,
    },
    title: 'Home',
  }
}

// // Add partners seed function
// export const partners = () => {
//   return {
//     partnerList: [
//       {
//         title: 'Next.js',
//         link: 'https://nextjs.org',
//       },
//       {
//         title: 'Payload CMS',
//         link: 'https://payloadcms.com',
//       },
//       {
//         title: 'PostgreSQL',
//         link: 'https://www.postgresql.org',
//       },
//       {
//         title: 'AWS',
//         link: 'https://aws.amazon.com',
//       },
//       {
//         title: 'Railway',
//         link: 'https://railway.app',
//       },
//     ],
//   }
// }

// Helper type definitions (example - adjust based on your actual block definitions)
// You might not need these directly in the seed file if types are imported correctly,
// but they help illustrate the structure.

// Example structure for Icon item within IconsBlock
type IconItem = {
  icon: string // e.g., 'FaReact' from react-icons
  title?: string
  description?: string
}

// Example structure for Feature item within FeatureListBlock
type FeatureItem = {
  featureText: string
}

// Example structure for Link item
type LinkItem = {
  link: {
    type: 'reference' | 'custom'
    appearance?:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'outline-light' // Added for contrast CTA
      | 'light' // Added for contrast CTA
    label: string
    url?: string
    reference?: {
      relationTo: string
      value: string | object // Payload ID or populated doc
    }
    newTab?: boolean
  }
}

// Example structure for RichText node (simplified)
type RichTextNode = {
  type: string
  tag?: string
  children: Array<{ type: string; text?: string }>
  direction?: 'ltr' | 'rtl' | null
  format?: string | number
  indent?: number
  version: number
  listType?: 'bullet' | 'number'
  start?: number
}

// Example structure for RichText root
type RichTextRoot = {
  root: {
    type: 'root'
    children: RichTextNode[]
    direction?: 'ltr' | 'rtl' | null
    format?: string | number
    indent?: number
    version: number
  }
}

// Example Blocks (adjust according to your actual block definitions)
type IconsBlock = {
  blockName: 'Icons Block'
  blockType: 'iconsBlock'
  backgroundColor?: 'none' | 'bg-muted' | 'bg-primary' | string // Allow theme colors
  sectionId?: string
  title?: string
  icons: IconItem[]
}

type FeatureListBlock = {
  blockName: 'Feature List Block'
  blockType: 'featList' // Ensure this matches your block slug
  backgroundColor?: 'none' | 'bg-muted' | 'bg-primary' | string
  sectionId?: string
  layout: 'imageLeft' | 'imageRight'
  image: string | Media // Image ID or populated object
  highlightedTitle?: string
  title?: string
  features: FeatureItem[]
  links?: LinkItem[]
}

type TestimonialsBlock = {
  blockName: 'Testimonials Block'
  blockType: 'testimonials'
  backgroundColor?: 'none' | 'bg-muted' | 'bg-primary' | string
  sectionId?: string
  title?: string
  // Adjust this field name based on your Testimonials/config.ts (e.g., 'testimonialsList', 'items', etc.)
  testimonialsList: Array<{
    quote: string // Use RichTextRoot if quote is rich text
    author: string
    company?: string
    logo?: string | Media // Logo ID or Media object
    highlight?: boolean
    // Add any other fields defined in the block's array item config
  }>
}

type CtaBlock = {
  blockName: 'CTA'
  blockType: 'cta'
  backgroundColor?: 'none' | 'bg-muted' | 'bg-primary' | string
  sectionId?: string
  richText: RichTextRoot
  links?: LinkItem[]
}

type ArchiveBlock = {
  blockName: 'Archive Block'
  blockType: 'archive'
  backgroundColor?: 'none' | 'bg-muted' | 'bg-primary' | string
  sectionId?: string
  introContent: RichTextRoot
  populateBy: 'collection' | 'selection' | 'category'
  relationTo?: 'posts' | string // Adjust if your post collection has a different slug
  categories?: string[] // Category IDs
  limit?: number
  selectedDocs?: Array<{ relationTo: string; value: string | object }>
  populatedDocs?: Array<{ relationTo: string; value: string | object }> // Typically added by Payload hooks
  populatedDocsTotal?: number // Typically added by Payload hooks
  showPagination?: boolean
}

// You might need other block types like ContentBlock, MediaBlock etc. defined as well
// based on what you intend to use.

// Combine all possible block types for the layout
type LayoutBlock = IconsBlock | FeatureListBlock | TestimonialsBlock | CtaBlock | ArchiveBlock // Add other block types here, e.g. | ContentBlock | MediaBlock

// Extend the Page type slightly for clarity
type Page = RequiredDataFromCollectionSlug<'pages'> & {
  hero: {
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
    title?: string // Added field
    subTagline?: string // Added field
    highlightText?: string // Added field
    richText?: RichTextRoot
    links?: LinkItem[]
    media?: string | Media // Media ID or populated object
  }
  layout: LayoutBlock[]
  meta: {
    title: string
    description: string
    image: string
  }
  title: string
}
