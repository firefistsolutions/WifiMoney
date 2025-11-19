import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Test endpoint to verify Payload CMS is working
 * Access at: /api/test-payload
 */
export async function GET() {
  const errors: string[] = []
  const steps: Record<string, any> = {}

  try {
    // Step 1: Check config
    steps.configCheck = 'passed'
    
    // Step 2: Try to initialize Payload
    let payload
    try {
      payload = await getPayload({ config })
      steps.payloadInit = 'passed'
    } catch (initError) {
      steps.payloadInit = 'failed'
      errors.push(`Payload init error: ${initError instanceof Error ? initError.message : String(initError)}`)
      throw initError
    }
    
    // Step 3: Try to query the database
    let forms
    try {
      forms = await payload.find({
        collection: 'forms',
        limit: 1,
      })
      steps.databaseQuery = 'passed'
      steps.formsCount = forms.totalDocs
    } catch (dbError) {
      steps.databaseQuery = 'failed'
      errors.push(`Database query error: ${dbError instanceof Error ? dbError.message : String(dbError)}`)
      throw dbError
    }

    return NextResponse.json({
      success: true,
      message: 'Payload CMS is working correctly',
      steps,
      formsCount: forms.totalDocs,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Payload CMS test error:', error)
    
    const errorDetails = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      steps,
      errors,
      timestamp: new Date().toISOString(),
    }

    // Include stack trace in development only
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      errorDetails.stack = error.stack
    }

    // Include more details about the error
    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        errorDetails.suggestion = 'Database connection failed. Check DATABASE_URI and ensure database is accessible.'
      } else if (error.message.includes('relation') || error.message.includes('does not exist')) {
        errorDetails.suggestion = 'Database tables missing. Run migrations: pnpm migrate'
      } else if (error.message.includes('secret') || error.message.includes('PAYLOAD_SECRET')) {
        errorDetails.suggestion = 'PAYLOAD_SECRET is missing or invalid.'
      }
    }
    
    return NextResponse.json(errorDetails, { status: 500 })
  }
}

