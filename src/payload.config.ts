import { postgresAdapter } from '@payloadcms/db-postgres'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { MainMenu } from './globals/MainMenu'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Determine SSL configuration for Supabase
const databaseUri = process.env.DATABASE_URI || ''
const isSupabase = databaseUri.includes('supabase') || databaseUri.includes('sslmode')

// Validate required environment variables
// Note: We check at runtime, not at config load time, to provide better error messages
const validateEnv = () => {
  if (!process.env.PAYLOAD_SECRET) {
    console.error('❌ PAYLOAD_SECRET is missing!')
    if (process.env.NODE_ENV === 'production') {
      throw new Error('PAYLOAD_SECRET environment variable is required')
    }
  }
  if (!databaseUri) {
    console.error('❌ DATABASE_URI is missing!')
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URI environment variable is required')
    }
  }
}

// Only validate in production to avoid breaking dev
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    meta: {
      titleSuffix: '- WiFi Money',
    },
  },
  collections: [Pages, Users],
  // We need to set CORS rules pointing to our hosted domains for the frontend to be able to submit to our API
  // In development, allow localhost; in production, use the actual domain
  cors: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000', process.env.NEXT_PUBLIC_PAYLOAD_URL || ''].filter(Boolean)
    : [
        process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
      ].filter(Boolean),
  db: postgresAdapter({
    pool: isSupabase
      ? {
          connectionString: databaseUri,
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {
          connectionString: databaseUri,
        },
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({ enabledCollections: ['pages'] }),
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ]
    },
  }),
  globals: [MainMenu],
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: undefined,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
