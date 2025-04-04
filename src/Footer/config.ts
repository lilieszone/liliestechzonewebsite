import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'providers',
      type: 'array',
      label: 'social media providers',
      minRows: 1,
      maxRows: 10,
      interfaceName: 'socialMenu',
      labels: {
        singular: 'social-media-provider',
        plural: 'social-media-providers',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'provider',
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
