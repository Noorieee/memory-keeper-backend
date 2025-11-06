// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { JournalEntries } from './collections/JournalEntries'
import { FaIcons } from './collections/FaIcons'
import { Tags } from './collections/Tags'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, JournalEntries, FaIcons, Tags],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  cors: ["https://memory-keeper.noorhussain.co.uk", "https://cms.noorhussain.co.uk", "http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
  csrf: ["https://memory-keeper.noorhussain.co.uk", "https://cms.noorhussain.co.uk", "http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
      },
    }),
  ],
})
