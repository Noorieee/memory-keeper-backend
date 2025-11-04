import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
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
      name: 'icon',
      type: 'relationship',
      required: true,
      relationTo: 'fa-icons',
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && typeof data.label === 'string' && !data.slug) {
          data.slug = slugify(data.label, {
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
