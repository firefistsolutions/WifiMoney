import type { MigrateUpArgs } from '@payloadcms/db-mongodb'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Check if user already exists
  const existingUser = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'demo@email.com',
      },
    },
    limit: 1,
  })

  if (existingUser.docs.length > 0) {
    // Update the password if user exists
    await payload.update({
      collection: 'users',
      id: existingUser.docs[0].id,
      data: {
        password: 'admin@123',
      },
    })
    console.log('Updated password for existing admin user: demo@email.com')
  } else {
    // Create new admin user
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo@email.com',
        password: 'admin@123',
      },
    })
    console.log('Created admin user: demo@email.com')
  }
}

