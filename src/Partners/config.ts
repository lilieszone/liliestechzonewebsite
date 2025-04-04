import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

export const Partners: GlobalConfig = {
  slug: 'partners',
  label: 'Site Partners',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'partnerList', // Changed name for clarity within the Global context
      label: 'Partner List',
      type: 'array',
      minRows: 1,
      required: true,
      //   admin: {
      //     description: 'Manage the list of site partners displayed globally.',
      //     components: {
      //       RowLabel: ({ data, index = 0 }) => {
      //         return data?.title || `Partner ${index + 1}`
      //       },
      //     },
      //   },
      fields: [
        // Fields for each partner remain the same
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media', // Ensure you have a 'media' collection
          required: true,
          admin: {
            description: "Upload the partner's logo.",
          },
        },
        {
          name: 'title',
          label: 'Partner Name',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter the name of the partner.',
          },
        },
        {
          name: 'link',
          label: 'Website Link (Optional)',
          type: 'text',
          required: false,
          admin: {
            description: "Enter the full URL to the partner's website (e.g., https://example.com).",
          },
        },
      ],
    },
  ],
}
