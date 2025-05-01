import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const FAQS: Block = {
  slug: 'faq',
  interfaceName: 'foqBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'question',
      type: 'array',
      label: 'Questions',
      required: true,
      fields: [
        {
          name: 'Question', // service name
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          label: false,
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 2,
          },
        }),
      ],
    },
  ],
}
