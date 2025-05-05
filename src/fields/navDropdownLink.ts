import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { link, LinkAppearances } from './link'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export type NavDropdownLinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const dropdownLayoutOptions = [
  {
    label: 'Single Column',
    value: 'single',
  },
  {
    label: 'Two Columns',
    value: 'two-columns',
  },
  {
    label: 'Multiple Sections',
    value: 'sections',
  },
]

export const navDropdownLink: NavDropdownLinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const navLinkResult: GroupField = {
    name: 'navLink',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      // Main link configuration
      link({ appearances, disableLabel }),
      // Dropdown configuration
      {
        name: 'hasDropdown',
        type: 'checkbox',
        label: 'Has dropdown menu',
      },
      {
        name: 'ddContent',
        type: 'group',
        admin: {
          condition: (_, siblingData) => siblingData?.hasDropdown === true,
        },
        fields: [
          {
            name: 'layout',
            type: 'select',
            label: 'Dropdown Layout',
            defaultValue: 'single',
            options: dropdownLayoutOptions,
            admin: {
              description: 'Choose how the dropdown menu should be structured',
            },
          },
          {
            name: 'header',
            type: 'richText',
            label: 'Dropdown Header',
            admin: {
              description: 'Optional rich text content to display at the top of the dropdown',
            },
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  AlignFeature(),
                ]
              },
            }),
          },
          {
            name: 'stns',
            type: 'array',
            label: 'Dropdown Sections',
            admin: {
              condition: (_, siblingData) => siblingData?.layout === 'sections',
              description: 'Add multiple sections with their own headers and links',
            },
            fields: [
              {
                name: 'title',
                type: 'text',
                label: 'Section Title',
              },
              {
                name: 'links',
                type: 'array',
                label: 'Section Links',
                fields: [link({ appearances })],
              },
            ],
          },
          {
            name: 'links',
            type: 'array',
            label: 'Dropdown Links',
            admin: {
              condition: (_, siblingData) => siblingData?.layout !== 'sections',
              description: 'The links to display in the dropdown menu',
            },
            fields: [link({ appearances })],
          },
          {
            name: 'footer',
            type: 'richText',
            label: 'Dropdown Footer',
            admin: {
              description: 'Optional rich text content to display at the bottom of the dropdown',
            },
          },
          {
            name: 'ftCnt',
            type: 'group',
            label: 'Featured Content',
            admin: {
              description: 'Optional promotional content to display on the side of the dropdown',
            },
            fields: [
              {
                name: 'title',
                type: 'text',
                label: 'Title',
              },
              {
                name: 'description',
                type: 'textarea',
                label: 'Description',
              },
              {
                name: 'image',
                type: 'upload',
                label: 'Image',
                relationTo: 'media',
              },
              link({ appearances, disableLabel: false }),
            ],
          },
        ],
      },
    ],
  }

  return deepMerge(navLinkResult, overrides)
}
