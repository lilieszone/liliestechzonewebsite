import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type ServicesArgs = {
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

export const services: (args: ServicesArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
}) => {
  return {
    slug: 'services',
    _status: 'published',
    title: 'Services',
    hero: {
      type: 'mediumImpact',
      title: 'Custom Web Application Development Services',
      subTagline: 'End-to-End Solutions',
      highlightText: 'Custom',
      richText: createRichTextRoot([
        formatRichText(
          'Specializing in Payload CMS 3.0 & Next.js for scalable, high-performance web applications tailored to your specific business requirements.',
          'p'
        ),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Get a Custom Quote',
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
    },
    layout: [
      // Service Offerings Section
      {
        blockType: 'contentBlock',
        blockName: 'Service Offerings',
        backgroundColor: 'white',
        sectionId: 'service-offerings',
        content: createRichTextRoot([
          formatRichText('End-to-End Application Development', 'h2'),
          formatRichText('We handle the entire lifecycle, from initial concept and design to development, deployment, and ongoing support. Our expertise includes:'),
          formatRichText('Custom Client Portals & Dashboards: Enhance client interaction and data visibility.', 'li'),
          formatRichText('Internal Business Tools: Streamline operations and automate workflows.', 'li'),
          formatRichText('SaaS Platform Development: Build and scale your software-as-a-service product.', 'li'),
          formatRichText('API Design & Integration: Connect systems and enable data flow.', 'li'),
          formatRichText('Content-Driven Applications: Leverage Payload CMS for powerful content management.', 'li'),
          formatRichText('E-commerce Solutions: Custom online stores integrated with business logic.', 'li'),
        ]),
      },

      // Technology Stack Section
      {
        blockType: 'iconsBlock',
        blockName: 'Technology Stack',
        backgroundColor: 'gray-50',
        sectionId: 'tech-stack',
        heading: 'Our Preferred Tech Stack for Optimal Results',
        features: [
          {
            iconName: 'FaReact',
            iconLibrary: 'fa',
            title: 'Frontend',
            description: 'Next.js (Dynamic, SEO-friendly React framework)',
          },
          {
            iconName: 'FaServer',
            iconLibrary: 'fa',
            title: 'Backend & CMS',
            description: 'Payload CMS 3.0 (Flexible, TypeScript-based Headless CMS)',
          },
          {
            iconName: 'FaDatabase',
            iconLibrary: 'fa',
            title: 'Database',
            description: 'PostgreSQL (Reliable and scalable relational database)',
          },
          {
            iconName: 'FaCloud',
            iconLibrary: 'fa',
            title: 'Hosting',
            description: 'AWS & Railway (Robust cloud infrastructure options)',
          },
          {
            iconName: 'FaLock',
            iconLibrary: 'fa',
            title: 'Authentication',
            description: 'Secure JWT-based authentication with Role-Based Access Control',
          },
        ],
      },

      // AI-Enhanced Development Section
      {
        blockType: 'featList',
        blockName: 'AI-Enhanced Development',
        backgroundColor: 'white',
        sectionId: 'ai-enhanced',
        titleHighlightText: 'AI',
        title: 'Next-Generation Development with AI',
        features: [
          { featureText: 'AI-Powered Requirements Analysis: Intelligent parsing of project specifications' },
          { featureText: 'Smart Code Generation: AI-assisted creation of boilerplate components' },
          { featureText: 'Automated Testing & QA: AI-driven test generation and execution' },
          { featureText: 'Performance Optimization: Intelligent analysis of application performance' },
          { featureText: 'Content Generation Assistance: AI tools for placeholder content' },
        ],
      },

      // Development Process Section
      {
        blockType: 'contentBlock',
        blockName: 'Development Process',
        backgroundColor: 'gray-50',
        sectionId: 'dev-process',
        content: createRichTextRoot([
          formatRichText('A Streamlined & Transparent Workflow', 'h2'),
          formatRichText('We follow a structured process to ensure quality and alignment:'),
          formatRichText('1. Discovery & Strategy: Deep dive into your requirements, goals, and technical needs.', 'li'),
          formatRichText('2. Design & UX/UI: Wireframing, prototyping, and designing intuitive user interfaces.', 'li'),
          formatRichText('3. Agile Development: Iterative sprints using Payload CMS, Next.js, and other tools.', 'li'),
          formatRichText('4. Client Portal Collaboration: Continuous feedback and milestone tracking via the portal.', 'li'),
          formatRichText('5. Rigorous Testing: Automated and manual QA to ensure stability and performance.', 'li'),
          formatRichText('6. Deployment & Handover: Smooth deployment to chosen hosting environment.', 'li'),
          formatRichText('7. Support & Evolution: Ongoing maintenance and future feature development.', 'li'),
        ]),
      },

      // Deployment Pipeline Section
      {
        blockType: 'featList',
        blockName: 'Deployment Pipeline',
        backgroundColor: 'white',
        sectionId: 'deployment-pipeline',
        titleHighlightText: 'Enterprise-Grade',
        title: 'Enterprise-Grade Deployment Infrastructure',
        features: [
          { featureText: 'Infrastructure as Code: Terraform or AWS CloudFormation templates' },
          { featureText: 'Containerization: Docker and Kubernetes configuration' },
          { featureText: 'Environment Management: Development, staging, and production environments' },
          { featureText: 'Database Migration Systems: Automated schema updates' },
          { featureText: 'Blue/Green Deployments: Zero-downtime deployment strategies' },
          { featureText: 'Performance Monitoring: Implementation of monitoring solutions' },
        ],
      },

      // Testing & QA Section
      {
        blockType: 'iconsBlock',
        blockName: 'Testing & QA',
        backgroundColor: 'gray-50',
        sectionId: 'testing-qa',
        heading: 'Comprehensive Quality Assurance',
        features: [
          {
            iconName: 'FaVial',
            iconLibrary: 'fa',
            title: 'Unit Testing',
            description: 'Jest, Vitest, or other frameworks for component-level testing.',
          },
          {
            iconName: 'FaPuzzlePiece',
            iconLibrary: 'fa',
            title: 'Integration Testing',
            description: 'End-to-end testing with Cypress, Playwright, or similar tools.',
          },
          {
            iconName: 'FaWeight',
            iconLibrary: 'fa',
            title: 'Load Testing',
            description: 'Performance testing to ensure your application scales under pressure.',
          },
          {
            iconName: 'FaUniversalAccess',
            iconLibrary: 'fa',
            title: 'Accessibility Testing',
            description: 'Automated WCAG compliance checking and manual verification.',
          },
          {
            iconName: 'FaShieldAlt',
            iconLibrary: 'fa',
            title: 'Security Testing',
            description: 'Vulnerability scanning and penetration testing.',
          },
        ],
      },

      // Client Portal Section
      {
        blockType: 'contentBlock',
        blockName: 'Client Portal',
        backgroundColor: 'white',
        sectionId: 'client-portal',
        content: createRichTextRoot([
          formatRichText('Your Project Hub: The Client Portal Advantage', 'h2'),
          formatRichText('Gain unprecedented visibility and control over your project:'),
          formatRichText('Project Tracking: Monitor milestones, tasks, and overall progress on your dashboard.', 'li'),
          formatRichText('Communication: Centralized messaging and feedback channels with our team.', 'li'),
          formatRichText('Deliverable Approvals: Review and approve project deliverables seamlessly.', 'li'),
          formatRichText('Invoicing & Payments: Manage payments and view invoice history.', 'li'),
          formatRichText('Documentation Access: Find project documents and resources easily.', 'li'),
        ]),
      },

      // CTA Section
      {
        blockType: 'cta',
        blockName: 'Get Started',
        backgroundColor: 'blue-50',
        sectionId: 'get-started',
        richText: createRichTextRoot([
          formatRichText("Let's Discuss Your Specific Needs", 'h2'),
          formatRichText(
            'Ready to start your custom web application project? Contact us today for a personalized consultation and project quote tailored to your specific requirements.'
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Get a Custom Quote',
              url: '/contact',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'Web Application Development Services | Lilies Tech Zone',
      description: 'Specialized web application development services including custom client portals, SaaS platforms, and business tools built with PayloadCMS, Next.js, and TypeScript.',
      image: metaImage.id,
    },
  }
}
