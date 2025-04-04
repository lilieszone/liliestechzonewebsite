import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { adminOrEditor, anyone, onlyAdmin } from '@/access/authentications'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: adminOrEditor,
    delete: onlyAdmin,
    read: anyone,
    update: onlyAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
