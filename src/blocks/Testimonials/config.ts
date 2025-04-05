import { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials', // Short, descriptive slug
  labels: {
    singular: 'Testimonial Section',
    plural: 'Testimonial Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Text (Optional)',
      type: 'text',
      admin: {
        description: 'Small text above the main heading, e.g., "DON\'T JUST TAKE OUR WORD FOR IT".',
      },
    },
    {
      name: 'heading',
      label: 'Heading (Optional)',
      type: 'text',
      admin: {
        description: 'Main heading for the testimonials section.',
      },
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'array',
      minRows: 1,
      required: true,
      admin: {
        description: 'Add individual testimonials here.',
      },
      fields: [
        {
          name: 'companyLogo',
          label: 'Company Logo (Optional)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'testimonialText',
          label: 'Testimonial Text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorImage',
          label: 'Author Image (Optional)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'authorName',
          label: 'Author Name',
          type: 'text',
          required: true,
        },
        {
          name: 'authorTitle',
          label: 'Author Title/Company',
          type: 'text',
          required: true,
        },
        {
          name: 'highlightCard',
          label: 'Highlight this Card?',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Adds a distinct border/style (like the purple border example).',
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Section Background Color',
      type: 'select',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray-50' },
        { label: 'Light Blue', value: 'blue-50' },
      ],
    },
  ],
}
