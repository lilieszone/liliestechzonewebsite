import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { navDropdownLink } from '@/fields/navDropdownLink'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        navDropdownLink({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'logoImage',
      type: 'upload',
      label: 'Logo Image',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Website Title',
      defaultValue: 'Clear Result Consult',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
