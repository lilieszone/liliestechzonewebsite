import { Block } from 'payload'

export const IconsBlock: Block = {
  slug: 'iconsBlock',
  labels: {
    singular: 'Icons Block',
    plural: 'Icons Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Block Heading',
      type: 'text',
      required: false,
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      //   admin: {
      //     components: {
      //       RowLabel: ({ data, index }) => {
      //         return data?.title || `Feature ${index + 1}`
      //       },
      //     },
      //   },
      fields: [
        {
          name: 'iconName',
          label: 'Icon Name',
          type: 'text',
          required: true,
          admin: {
            description:
              'Enter icon name from react-icons. Examples: Heroicons (HiOutlineLightBulb, HiChartBar), Font Awesome (FaBolt, FaStar), Material Design (MdSettings, MdAccessAlarm), Feather (FiCamera, FiCpu). Ensure the name matches the selected library.',
          },
        },
        {
          name: 'iconColor',
          label: 'Icon Color',
          type: 'text',
          defaultValue: '#10b981', // Default green color
          admin: {
            description: 'Enter hex color code or CSS color name (e.g., #ff0000 or red).',
          },
        },
        {
          name: 'iconLibrary',
          label: 'Icon Library',
          type: 'select',
          required: true,
          defaultValue: 'hi', // Heroicons by default
          options: [
            { label: 'Heroicons', value: 'hi' },
            { label: 'Font Awesome', value: 'fa' },
            { label: 'Material Design', value: 'md' },
            { label: 'Feather', value: 'fi' },
          ],
          admin: {
            description: 'Select the icon library. The Icon Name must belong to this library.',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray-50' },
        { label: 'Light Blue', value: 'blue-50' },
      ],
    },
  ],
}
