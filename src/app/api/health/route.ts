import { NextResponse } from 'next/server'

/**
 * Health check endpoint to diagnose production issues
 * Access at: /api/health
 */
export async function GET() {
  try {
    const checks = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      checks: {
        payloadSecret: !!process.env.PAYLOAD_SECRET,
        databaseUri: !!process.env.DATABASE_URI,
        nextPublicPayloadUrl: !!process.env.NEXT_PUBLIC_PAYLOAD_URL,
      },
      values: {
        nodeEnv: process.env.NODE_ENV,
        hasPayloadSecret: !!process.env.PAYLOAD_SECRET,
        hasDatabaseUri: !!process.env.DATABASE_URI,
        payloadUrl: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'not set',
        // Don't expose actual secrets
        payloadSecretLength: process.env.PAYLOAD_SECRET?.length || 0,
        databaseUriLength: process.env.DATABASE_URI?.length || 0,
      },
    }

    return NextResponse.json(checks, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

