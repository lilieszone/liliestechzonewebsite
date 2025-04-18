import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from './link'

import deepMerge from '@/utilities/deepMerge'
import { navDropdownLink } from './navDropdownLink'

type NavLinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const navLinkGroup: NavLinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedNavLinkGroup: Field = {
    name: 'navLinks',
    type: 'array',
    fields: [
      navDropdownLink({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
      description: 'Add navigation links with optional dropdown menus',
    },
  }

  return deepMerge(generatedNavLinkGroup, overrides)
}
