import { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing Section',
    plural: 'Pricing Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Text',
      type: 'text',
      defaultValue: 'PRICING',
      admin: {
        description: 'Small text above the main heading.',
      },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      defaultValue: 'Explore Our Pricing',
      admin: {
        description: 'Main heading for the pricing section.',
      },
    },
    {
      name: 'highlightedText',
      label: 'Highlighted Text',
      type: 'text',
      defaultValue: 'Pricing',
      admin: {
        description: 'The portion of the heading that will be highlighted with a different color.',
      },
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'textarea',
      defaultValue:
        "Easily tweak layouts, update content, and personalize your site with Framer's intuitive editor—no coding needed.",
      admin: {
        description: 'Descriptive text below the heading.',
      },
    },
    {
      name: 'monthlyLabel',
      label: 'Monthly Toggle Label',
      type: 'text',
      defaultValue: 'Monthly',
    },
    {
      name: 'yearlyLabel',
      label: 'Yearly Toggle Label',
      type: 'text',
      defaultValue: 'Yearly',
    },
    {
      name: 'popularLabel',
      label: 'Popular Plan Label',
      type: 'text',
      defaultValue: 'MOST POPULAR',
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      defaultValue: 'Start Today',
    },
    {
      name: 'plans',
      label: 'Pricing Plans',
      type: 'array',
      minRows: 1,
      required: true,
      admin: {
        description: 'Add individual pricing plans here.',
      },
      fields: [
        {
          name: 'type',
          label: 'Plan Type',
          type: 'text',
          required: true,
          admin: {
            description: 'E.g., Basic, Pro, Enterprise',
          },
        },
        {
          name: 'tagline',
          label: 'Plan Tagline',
          type: 'text',
          required: true,
          admin: {
            description: 'E.g., Best for personal use.',
          },
        },
        {
          name: 'monthlyPrice',
          label: 'Monthly Price',
          type: 'number',
          admin: {
            description: 'Price in dollars, leave empty for custom pricing.',
          },
        },
        {
          name: 'yearlyPrice',
          label: 'Yearly Price',
          type: 'number',
          admin: {
            description: 'Price in dollars, leave empty for custom pricing.',
          },
        },
        {
          name: 'priceSuffix',
          label: 'Price Suffix',
          type: 'text',
          defaultValue: '/ mo',
          admin: {
            description: 'Text to display after the price, e.g., "/ mo".',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          defaultValue: 'Pause or cancel anytime.',
        },
        {
          name: 'customPriceLabel',
          label: 'Custom Price Label',
          type: 'text',
          defaultValue: 'Custom',
          admin: {
            description: 'Label to show for custom pricing (e.g., for Enterprise plan).',
          },
        },
        {
          name: 'isCustomPricing',
          label: 'Is Custom Pricing?',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check this for plans with custom pricing (e.g., Enterprise).',
          },
        },
        {
          name: 'isPopular',
          label: 'Is Popular Plan?',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Mark this plan as the most popular option.',
          },
        },
        {
          name: 'features',
          label: 'Plan Features',
          type: 'array',
          required: true,
          admin: {
            description: 'Features included or not included in this plan.',
          },
          fields: [
            {
              name: 'text',
              label: 'Feature Text',
              type: 'text',
              required: true,
            },
            {
              name: 'included',
              label: 'Is Included',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Section Background Color',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray-50' },
        { label: 'Light Blue', value: 'blue-50' },
      ],
    },
  ],
}
