import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
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
export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    title: 'Contact',
    hero: {
      type: 'mediumImpact',
      title: "Let's Build Your Next Web Application",
      subTagline: 'Start Your Project',
      highlightText: 'Custom',
      richText: createRichTextRoot([
        formatRichText(
          "Reach out to discuss your project requirements. We're ready to help you define, design, and develop a custom solution that drives results.",
          'p',
        ),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Start Your Project',
            url: '#project-consultation',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Learn More',
            url: '/services',
          },
        },
      ],
    },
    layout: [
      // Contact Information Section
      {
        blockType: 'contentBlock',
        blockName: 'Contact Information',
        backgroundColor: 'white',
        sectionId: 'contact-info',
        content: createRichTextRoot([
          formatRichText('Contact Information', 'h2'),
          formatRichText(
            'Our team is ready to answer your questions and discuss your project needs during business hours.',
          ),
          formatRichText('Email: contact@liliestechzone.com'),
          formatRichText('Phone: (555) 123-4567'),
          formatRichText('Location: San Francisco, CA'),
          formatRichText('Business Hours: Monday - Friday, 9 AM - 5 PM PST'),
        ]),
      },

      // Project Consultation Form Section
      {
        blockType: 'formBlock',
        blockName: 'Project Consultation',
        backgroundColor: 'gray-50',
        sectionId: 'project-consultation',
        enableIntro: true,
        form: contactForm,
        introContent: createRichTextRoot([
          formatRichText('Tell Us About Your Project', 'h2'),
          formatRichText(
            'Fill out the form below to get started with your custom web application project. Our team will review your requirements and contact you within 1-2 business days to schedule an initial discovery call.',
          ),
        ]),
      },

      // What Happens Next Section
      {
        blockType: 'contentBlock',
        blockName: 'What Happens Next',
        backgroundColor: 'white',
        sectionId: 'what-happens-next',
        content: createRichTextRoot([
          formatRichText('What Happens Next?', 'h2'),
          formatRichText(
            "Thank you for your interest! We've received your inquiry and will review the details carefully. A member of our team will reach out within 1-2 business days to schedule an initial discovery call and discuss the next steps.",
          ),
        ]),
      },

      // Client Portal Demo Section
      {
        blockType: 'featList',
        blockName: 'Client Portal',
        backgroundColor: 'gray-50',
        sectionId: 'client-portal-demo',
        titleHighlightText: 'Client',
        title: 'Experience Our Client Portal Firsthand',
        features: [
          { featureText: 'Real-time project tracking dashboards' },
          { featureText: 'Seamless communication and feedback tools' },
          { featureText: 'Document sharing and version control' },
          { featureText: 'Milestone and deliverable approval workflows' },
        ],
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Schedule a Demo',
              url: '/demo',
            },
          },
        ],
      },

      // Developer Community Section
      {
        blockType: 'iconsBlock',
        blockName: 'Developer Resources',
        backgroundColor: 'white',
        sectionId: 'developer-community',
        heading: 'Join Our Developer Community',
        features: [
          {
            iconName: 'FaBook',
            iconLibrary: 'fa',
            title: 'Knowledge Base',
            description: 'Access our documented patterns and solutions',
          },
          {
            iconName: 'FaUsers',
            iconLibrary: 'fa',
            title: 'Discussion Forums',
            description: 'Participate in Q&A sessions with peers',
          },
          {
            iconName: 'FaYoutube',
            iconLibrary: 'fa',
            title: 'Tutorial Access',
            description: 'Early access to new educational content',
          },
          {
            iconName: 'FaNetworkWired',
            iconLibrary: 'fa',
            title: 'Networking',
            description: 'Connect with other development professionals',
          },
        ],
      },

      // YouTube Collaboration Section
      {
        blockType: 'cta',
        blockName: 'YouTube Collaboration',
        backgroundColor: 'blue-50',
        sectionId: 'youtube-collaboration',
        richText: createRichTextRoot([
          formatRichText('Feature Your Project in Our Development Series', 'h2'),
          formatRichText(
            'Interested in having your project documented through our YouTube channel? We select certain client projects to feature in our development series, providing educational content while showcasing your application.',
          ),
          formatRichText(
            'Benefits include additional exposure for your brand, behind-the-scenes development insights, educational content for your team, and potential discounts on development services.',
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Discuss YouTube Collaboration',
              url: '/youtube-collaboration',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'Contact Us | Lilies Tech Zone',
      description:
        'Get in touch with our team to discuss your web application project requirements and start building your custom solution.',
      image: null,
    },
  }
}
