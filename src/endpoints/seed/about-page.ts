import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type AboutArgs = {
  metaImage: Media
}

// Helper function to format rich text
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

// Helper function to create a rich text root
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
//@ts-expect-error - TODO: fix this
export const about: (args: AboutArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
}) => {
  return {
    slug: 'about',
    _status: 'published',
    title: 'About Us',
    hero: {
      type: 'mediumImpact',
      title: 'Experts in Modern Web Application Development',
      subTagline: 'Our Approach',
      highlightText: 'Experts',
      richText: createRichTextRoot([
        formatRichText(
          'We streamline the development process for sophisticated web applications using Payload CMS 3.0, delivering exceptional value and fostering transparent partnerships with our clients.',
          'p',
        ),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Contact Us',
            url: '/contact',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'View Our Services',
            url: '/services',
          },
        },
      ],
    },
    layout: [
      // Vision & Mission Section
      {
        blockType: 'contentBlock',
        blockName: 'Our Vision & Mission',
        backgroundColor: 'white',
        sectionId: 'vision-mission',
        content: createRichTextRoot([
          formatRichText('Our Vision', 'h2'),
          formatRichText(
            'To create a platform that enables efficient building and delivery of complex, customized web applications for clients while showcasing expertise through integrated YouTube content.',
          ),
          formatRichText('Our Mission', 'h2'),
          formatRichText(
            'We streamline the development process for sophisticated web applications using Payload CMS 3.0, delivering exceptional value and fostering transparent partnerships with our clients. We aim to demonstrate technical excellence and share our knowledge through practical examples and educational content.',
          ),
        ]),
      },

      // Development Philosophy Section
      {
        blockType: 'iconsBlock',
        blockName: 'Development Philosophy',
        backgroundColor: 'gray-50',
        sectionId: 'development-philosophy',
        heading: 'Code Quality That Speaks for Itself',
        features: [
          {
            iconName: 'FaCheckCircle',
            iconLibrary: 'fa',
            title: 'Type Safety First',
            description: 'TypeScript throughout our stack ensures robust, maintainable code.',
          },
          {
            iconName: 'FaCubes',
            iconLibrary: 'fa',
            title: 'Component-Driven Design',
            description: 'Modular architecture for maximum reusability and flexibility.',
          },
          {
            iconName: 'FaBolt',
            iconLibrary: 'fa',
            title: 'Performance by Design',
            description: 'Optimization built into our development process, not added later.',
          },
          {
            iconName: 'FaUniversalAccess',
            iconLibrary: 'fa',
            title: 'Accessibility as Standard',
            description: 'WCAG compliance and inclusive design principles from day one.',
          },
          {
            iconName: 'FaVial',
            iconLibrary: 'fa',
            title: 'Continuous Testing',
            description:
              'Automated tests at every level to ensure stability and prevent regressions.',
          },
        ],
      },

      // Payload CMS Section
      {
        blockType: 'contentBlock',
        blockName: 'Why We Specialize in Payload CMS',
        backgroundColor: 'white',
        sectionId: 'payload-cms',
        content: createRichTextRoot([
          formatRichText('The Power of Headless Flexibility', 'h2'),
          formatRichText(
            'Payload CMS 3.0 is central to our approach. Its developer-centric design, TypeScript foundation, and highly extensible nature allow us to build truly custom backends and administrative interfaces efficiently. This means faster development, easier content management for you, and robust, scalable applications perfectly tailored to your needs.',
          ),
        ]),
      },

      // Collaboration Approach Section
      {
        blockType: 'featList',
        blockName: 'Our Approach',
        backgroundColor: 'gray-50',
        sectionId: 'collaboration-approach',
        titleHighlightText: 'Collaboration',
        title: 'Collaboration & Transparency',
        features: [
          { featureText: 'Client Portal for real-time project tracking and communication' },
          { featureText: 'Regular project updates and milestone reviews' },
          { featureText: 'Transparent development process and decision-making' },
          { featureText: 'Educational content integrated into documentation' },
          { featureText: 'YouTube tutorials and development insights available to clients' },
        ],
      },

      // AI-Assisted Development Section
      {
        blockType: 'iconsBlock',
        blockName: 'AI-Assisted Development',
        backgroundColor: 'white',
        sectionId: 'ai-development',
        heading: 'Accelerating Development with Intelligent Tools',
        features: [
          {
            iconName: 'FaSearch',
            iconLibrary: 'fa',
            title: 'Requirements Analysis',
            description: 'AI assistance to identify gaps and potential issues early.',
          },
          {
            iconName: 'FaSitemap',
            iconLibrary: 'fa',
            title: 'Architecture Planning',
            description: 'AI-suggested patterns based on successful implementations.',
          },
          {
            iconName: 'FaCode',
            iconLibrary: 'fa',
            title: 'Code Generation',
            description: 'Automated creation of boilerplate components and repetitive code.',
          },
          {
            iconName: 'FaShieldAlt',
            iconLibrary: 'fa',
            title: 'Quality Assurance',
            description: 'AI-driven testing to ensure comprehensive coverage.',
          },
          {
            iconName: 'FaRocket',
            iconLibrary: 'fa',
            title: 'Performance Optimization',
            description: 'Intelligent analysis to identify and resolve bottlenecks.',
          },
        ],
      },

      // Deployment Pipeline Section
      {
        blockType: 'contentBlock',
        blockName: 'Deployment Pipeline',
        backgroundColor: 'gray-50',
        sectionId: 'deployment-pipeline',
        content: createRichTextRoot([
          formatRichText('From Code to Production with Confidence', 'h2'),
          formatRichText('Our deployment process is built for reliability and efficiency:'),
          formatRichText('Continuous Integration: Automated testing on every code commit.', 'li'),
          formatRichText(
            'Infrastructure as Code: Reproducible environments across development and production.',
            'li',
          ),
          formatRichText(
            'Containerization: Docker-based deployments for consistency and scaling.',
            'li',
          ),
          formatRichText(
            'Automated Rollbacks: Instant recovery options if issues are detected.',
            'li',
          ),
          formatRichText(
            'Performance Monitoring: Real-time analytics to ensure optimal application health.',
            'li',
          ),
        ]),
      },

      // Community Building Section
      {
        blockType: 'iconsBlock',
        blockName: 'Community Building',
        backgroundColor: 'white',
        sectionId: 'community-building',
        heading: 'Building More Than Applications',
        features: [
          {
            iconName: 'FaGithub',
            iconLibrary: 'fa',
            title: 'Open Source Contributions',
            description: 'Sharing reusable components and solutions.',
          },
          {
            iconName: 'FaYoutube',
            iconLibrary: 'fa',
            title: 'YouTube Educational Content',
            description: 'Tutorials and development series for all skill levels.',
          },
          {
            iconName: 'FaComments',
            iconLibrary: 'fa',
            title: 'Discussion Forums',
            description: 'Community spaces for developers to connect and collaborate.',
          },
          {
            iconName: 'FaBook',
            iconLibrary: 'fa',
            title: 'Knowledge Base',
            description: 'Documented patterns and solutions to common development challenges.',
          },
          {
            iconName: 'FaUserGraduate',
            iconLibrary: 'fa',
            title: 'Mentorship Programs',
            description: 'Supporting the next generation of web developers.',
          },
        ],
      },

      // CTA Section
      {
        blockType: 'cta',
        blockName: 'Partner With Us',
        backgroundColor: 'blue-50',
        sectionId: 'partner-with-us',
        richText: createRichTextRoot([
          formatRichText('Partner with Experienced Developers', 'h2'),
          formatRichText(
            'Ready to start your custom web application project? Our team of experts is ready to help bring your vision to life with modern technologies and transparent development practices.',
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Contact Us Today',
              url: '/contact',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'About Us | Lilies Tech Zone',
      description:
        'Learn about our expertise in modern web application development using PayloadCMS, Next.js, and TypeScript. Discover our transparent approach and commitment to quality.',
      image: metaImage.id,
    },
  }
}
