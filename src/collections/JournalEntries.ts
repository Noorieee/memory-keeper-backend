import { AccountView } from '@payloadcms/next/views'
import { CollectionConfig } from 'payload'
import slugify from 'slugify'

const accentColours = [
  { label: 'amber', value: 'amber' },
  { label: 'pink', value: 'pink' },
  { label: 'sky', value: 'sky' },
  { label: 'emerald', value: 'emerald' },
  { label: 'violet', value: 'violet' },
  { label: 'orange', value: 'orange' },
]

export const JournalEntries: CollectionConfig = {
  slug: 'journal-entries',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'accentColour',
      type: 'select',
      required: true,
      options: accentColours,
    },
    {
      name: 'tags',
      type: 'relationship',
      required: true,
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'favourited',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      maxRows: 2,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'accentColour',
          type: 'select',
          required: true,
          options: accentColours,
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && typeof data.title === 'string' && !data.slug) {
          data.slug = slugify(data.title, {
            lower: true,
            strict: true,
            trim: true,
          })
        }
        return data
      },
    ],
  },
}
