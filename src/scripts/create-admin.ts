import dotenv from 'dotenv'
import { getPayload } from 'payload'
import config from '@payload-config'

// Load environment variables
dotenv.config()

const createAdmin = async () => {
  const payload = await getPayload({ config })

  try {
    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'demo@email.com',
        },
      },
    })

    if (existingUser.docs.length > 0) {
      console.log('Admin user already exists with email: demo@email.com')
      // Update the password
      await payload.update({
        collection: 'users',
        id: existingUser.docs[0].id,
        data: {
          password: 'admin@123',
        },
      })
      console.log('Password updated for admin user')
    } else {
      // Create new admin user
      await payload.create({
        collection: 'users',
        data: {
          email: 'demo@email.com',
          password: 'admin@123',
        },
      })
      console.log('Admin user created successfully!')
      console.log('Email: demo@email.com')
      console.log('Password: admin@123')
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }

  process.exit(0)
}

createAdmin()

