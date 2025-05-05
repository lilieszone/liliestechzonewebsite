import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const FeatureListBlock: Block = {
  slug: 'featList',
  labels: {
    singular: 'Feature List Block',
    plural: 'Feature List Blocks',
  },
  fields: [
    {
      name: 'imageCfg',
      label: 'Image Section',
      type: 'group',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'darkImage',
          label: 'Dark Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          label: 'Image Position',
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
          admin: {
            layout: 'horizontal',
          },
        },
      ],
    },
    {
      name: 'status',
      label: 'Status Line (Optional)',
      type: 'group',
      fields: [
        {
          name: 'showStatusIcon',
          label: 'Show Lightning Icon',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'text',
          label: 'Status Text',
          type: 'text',
          admin: {
            description: 'e.g., CURRENTLY AVAILABLE FOR WORK',
          },
        },
      ],
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main title text.',
      },
    },
    {
      name: 'titleHighlightText',
      label: 'Title Highlight Text',
      type: 'text',
      required: true,
      admin: {
        description:
          'Enter the exact part of the title you want to highlight (e.g., "Everything You Need."). This part will be colored.',
      },
    },
    {
      name: 'features',
      label: 'Features List',
      type: 'array',
      minRows: 1,
      required: true,
      //   admin: {
      //     components: {
      //       RowLabel: ({ data, index = 0 }) => {
      //         return data?.featureText || `Feature ${index + 1}`
      //       },
      //     },
      //   },
      fields: [
        {
          name: 'featureText',
          label: 'Feature Text',
          type: 'text',
          required: true,
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
