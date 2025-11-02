import { CollectionConfig } from 'payload'

export const Entries: CollectionConfig = {
  slug: 'entries',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}
