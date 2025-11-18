import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { home } from '../seed/home'

import { advanced } from '../seed/advanced'
import { advancedForm } from '../seed/advancedForm'
import { basicForm } from '../seed/basicForm'
import { contact } from '../seed/contact'
import { contactForm } from '../seed/contactForm'
import { signUp } from '../seed/signUp'
import { signUpForm } from '../seed/signUpForm'

// Helper function to recursively remove MongoDB-style IDs and timestamps
function removeMongoIds(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeMongoIds)
  } else if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {}
    for (const [key, value] of Object.entries(obj)) {
      // Skip MongoDB-specific fields at all levels
      if (key === 'id' || key === 'createdAt' || key === 'updatedAt' || key === '_id') {
        continue
      }
      cleaned[key] = removeMongoIds(value)
    }
    return cleaned
  }
  return obj
}

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.create({
    collection: 'users',
    data: {
      email: 'demo@email.com',
      password: 'admin@123',
    },
  })

  // Remove MongoDB-style IDs for PostgreSQL auto-increment (recursively)
  const basicFormJSON = removeMongoIds(basicForm)
  // Ensure no ID fields remain
  if ('id' in basicFormJSON) {
    delete basicFormJSON.id
  }

  const { id: basicFormID } = await payload.create({
    collection: 'forms',
    data: basicFormJSON,
  })

  const contactFormJSON = removeMongoIds(contactForm)
  if ('id' in contactFormJSON) {
    delete contactFormJSON.id
  }

  const { id: contactFormID } = await payload.create({
    collection: 'forms',
    data: contactFormJSON,
  })

  const advancedFormJSON = removeMongoIds(advancedForm)
  if ('id' in advancedFormJSON) {
    delete advancedFormJSON.id
  }

  const { id: advancedFormID } = await payload.create({
    collection: 'forms',
    data: advancedFormJSON,
  })

  const signUpFormJSON = removeMongoIds(signUpForm)
  if ('id' in signUpFormJSON) {
    delete signUpFormJSON.id
  }

  const { id: signUpFormID } = await payload.create({
    collection: 'forms',
    data: signUpFormJSON,
  })

  // Remove MongoDB-style IDs from pages and replace form ID placeholders with numeric IDs
  const homePageData = JSON.parse(JSON.stringify(home))
  // Replace form ID placeholder with actual numeric ID
  const homePageStr = JSON.stringify(homePageData).replace(/\{\{BASIC_FORM_ID\}\}/g, String(basicFormID))
  const homePageJSON = removeMongoIds(JSON.parse(homePageStr))
  // Ensure form field is a number, not a string
  if (homePageJSON.layout && homePageJSON.layout[0] && homePageJSON.layout[0].form) {
    homePageJSON.layout[0].form = Number(homePageJSON.layout[0].form)
  }

  const contactPageData = JSON.parse(JSON.stringify(contact))
  const contactPageStr = JSON.stringify(contactPageData).replace(/\{\{CONTACT_FORM_ID\}\}/g, String(contactFormID))
  const contactPageJSON = removeMongoIds(JSON.parse(contactPageStr))
  if (contactPageJSON.layout && contactPageJSON.layout[0] && contactPageJSON.layout[0].form) {
    contactPageJSON.layout[0].form = Number(contactPageJSON.layout[0].form)
  }

  const advancedPageData = JSON.parse(JSON.stringify(advanced))
  const advancedPageStr = JSON.stringify(advancedPageData).replace(/\{\{ADVANCED_FORM_ID\}\}/g, String(advancedFormID))
  const advancedPageJSON = removeMongoIds(JSON.parse(advancedPageStr))
  if (advancedPageJSON.layout && advancedPageJSON.layout[0] && advancedPageJSON.layout[0].form) {
    advancedPageJSON.layout[0].form = Number(advancedPageJSON.layout[0].form)
  }

  const signupPageData = JSON.parse(JSON.stringify(signUp))
  const signupPageStr = JSON.stringify(signupPageData).replace(/\{\{SIGNUP_FORM_ID\}\}/g, String(signUpFormID))
  const signupPageJSON = removeMongoIds(JSON.parse(signupPageStr))
  if (signupPageJSON.layout && signupPageJSON.layout[0] && signupPageJSON.layout[0].form) {
    signupPageJSON.layout[0].form = Number(signupPageJSON.layout[0].form)
  }

  await payload.create({
    collection: 'pages',
    data: homePageJSON,
  })

  const { id: contactPageID } = await payload.create({
    collection: 'pages',
    data: contactPageJSON,
  })

  const { id: advancedPageID } = await payload.create({
    collection: 'pages',
    data: advancedPageJSON,
  })

  const { id: signupPageID } = await payload.create({
    collection: 'pages',
    data: signupPageJSON,
  })

  await payload.updateGlobal({
    slug: 'main-menu',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            label: 'Contact Form',
            reference: {
              relationTo: 'pages',
              value: contactPageID,
            },
          },
        },
        {
          link: {
            type: 'reference',
            label: 'Advanced Form',
            reference: {
              relationTo: 'pages',
              value: advancedPageID,
            },
          },
        },
        {
          link: {
            type: 'reference',
            label: 'Signup Form',
            reference: {
              relationTo: 'pages',
              value: signupPageID,
            },
          },
        },
      ],
    },
  })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Seed migrations typically don't need a down function
  // as seed data can be re-seeded by running migrate:fresh
  // This is a no-op to satisfy the migration interface
}
