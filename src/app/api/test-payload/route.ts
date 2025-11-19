import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Test endpoint to verify Payload CMS is working
 * Access at: /api/test-payload
 */
export async function GET() {
  try {
    // Try to initialize Payload
    const payload = await getPayload({ config })
    
    // Try to query the database
    const forms = await payload.find({
      collection: 'forms',
      limit: 1,
    })

    return NextResponse.json({
      success: true,
      message: 'Payload CMS is working correctly',
      formsCount: forms.totalDocs,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Payload CMS test error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

