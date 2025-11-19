import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Custom API route to fetch a form by ID
 * This provides better error handling and debugging than the default Payload route
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const formId = parseInt(id, 10)

    if (isNaN(formId)) {
      return NextResponse.json(
        { error: 'Invalid form ID. Must be a number.' },
        { status: 400 }
      )
    }

    // Get search params
    const searchParams = request.nextUrl.searchParams
    const depth = parseInt(searchParams.get('depth') || '1', 10)
    const draft = searchParams.get('draft') === 'true'

    // Initialize Payload
    const payload = await getPayload({ config })

    // Fetch the form
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
      depth,
      draft,
    })

    if (!form) {
      return NextResponse.json(
        { error: `Form with ID ${formId} not found` },
        { status: 404 }
      )
    }

    return NextResponse.json(form, { status: 200 })
  } catch (error) {
    console.error('Error fetching form:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorType = error instanceof Error ? error.constructor.name : typeof error

    // Provide helpful error messages
    if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
      return NextResponse.json(
        { 
          error: 'Form not found',
          message: errorMessage,
          suggestion: 'Make sure the form ID is correct and the form exists in Payload CMS admin panel.'
        },
        { status: 404 }
      )
    }

    if (errorMessage.includes('connect') || errorMessage.includes('ECONNREFUSED')) {
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          message: errorMessage,
          suggestion: 'Check your DATABASE_URI and ensure the database is accessible.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to fetch form',
        message: errorMessage,
        errorType,
      },
      { status: 500 }
    )
  }
}

