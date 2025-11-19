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
import { formSubmissionsToSheets } from './hooks/formSubmissionsToSheets'

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
  onInit: async (payload) => {
    console.log('🚀 [Payload Config] onInit called - attaching hooks...')
    console.log('🔍 [Payload Config] Available collections:', Object.keys(payload.collections))
    
    // Attach Google Sheets hook to form-submissions collection
    const formSubmissionsCollection = payload.collections['form-submissions']
    
    console.log('🔍 [Payload Config] Checking form-submissions collection:', {
      exists: !!formSubmissionsCollection,
      collectionName: formSubmissionsCollection?.config?.slug,
      hasHooks: !!formSubmissionsCollection?.config?.hooks,
      existingHooks: formSubmissionsCollection?.config?.hooks ? Object.keys(formSubmissionsCollection.config.hooks) : [],
    })
    
    if (formSubmissionsCollection) {
      const originalHooks = formSubmissionsCollection.config.hooks || {}
      const existingAfterChange = originalHooks.afterChange || []
      
      console.log('📝 [Payload Config] Current hooks:', {
        hasAfterChange: !!originalHooks.afterChange,
        afterChangeCount: existingAfterChange.length,
        allHookKeys: Object.keys(originalHooks),
      })
      
      formSubmissionsCollection.config.hooks = {
        ...originalHooks,
        afterChange: [
          ...existingAfterChange,
          formSubmissionsToSheets,
        ],
      }
      
      console.log('✅ [Payload Config] Google Sheets hook attached successfully!', {
        totalAfterChangeHooks: formSubmissionsCollection.config.hooks.afterChange?.length || 0,
        hookFunction: typeof formSubmissionsToSheets,
      })
      
      // Verify the hook was added
      const verifyHooks = formSubmissionsCollection.config.hooks.afterChange || []
      console.log('🔍 [Payload Config] Verification - afterChange hooks count:', verifyHooks.length)
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ [Payload Config] Google Sheets hook attached to form-submissions collection')
      }
    } else {
      console.error('❌ [Payload Config] form-submissions collection not found!', {
        availableCollections: Object.keys(payload.collections),
      })
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ form-submissions collection not found - Google Sheets hook not attached')
      }
    }
    
    console.log('🏁 [Payload Config] onInit completed')
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
