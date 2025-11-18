import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

/**
 * API Route to sync form submissions to Google Sheets
 * 
 * This route can be called:
 * 1. Directly from Payload hooks
 * 2. Via webhook from Google Apps Script
 * 
 * Setup Options:
 * 
 * Option 1: Google Apps Script (Recommended - Easier)
 * - Create a Google Apps Script webhook
 * - Set GOOGLE_SHEETS_WEBHOOK_URL in .env
 * 
 * Option 2: Google Sheets API (More Control)
 * - Requires service account credentials
 * - Set GOOGLE_SHEETS_CREDENTIALS in .env
 */

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Option 1: Use Google Apps Script Webhook (if configured)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.statusText}`)
      }

      return NextResponse.json({ success: true, method: 'webhook' })
    }

    // Option 2: Use Google Sheets API (if credentials are provided)
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Form Submissions'

    if (credentials && spreadsheetId) {
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(credentials),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })

      const sheets = google.sheets({ version: 'v4', auth })

      // Prepare row data
      const rowData = [
        data.submittedAt || new Date().toISOString(),
        data.formId || '',
        ...Object.entries(data)
          .filter(([key]) => !['id', 'formId', 'submittedAt'].includes(key))
          .map(([, value]) => String(value || '')),
      ]

      // Append row to sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      })

      return NextResponse.json({ success: true, method: 'api' })
    }

    return NextResponse.json(
      { error: 'Google Sheets not configured. Set GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_CREDENTIALS' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

