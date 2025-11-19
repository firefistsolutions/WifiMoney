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
  const requestStartTime = Date.now()
  console.log('🌐 [Google Sheets API] Request received at:', new Date().toISOString())
  
  try {
    const data = await request.json()
    console.log('📦 [Google Sheets API] Request data:', {
      fieldCount: Object.keys(data).length,
      fields: Object.keys(data),
      dataSize: JSON.stringify(data).length,
      submissionId: data.id,
      formId: data.formId,
    })

    // Option 1: Use Google Apps Script Webhook (if configured)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    console.log('🔍 [Google Sheets API] Configuration check:', {
      webhookUrlConfigured: !!webhookUrl,
      webhookUrlPreview: webhookUrl ? webhookUrl.substring(0, 80) + '...' : 'Not set',
      credentialsConfigured: !!process.env.GOOGLE_SHEETS_CREDENTIALS,
      spreadsheetIdConfigured: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    })
    
    if (webhookUrl) {
      console.log('📤 [Google Sheets API] Using webhook method')
      console.log('📋 [Google Sheets API] Webhook request details:', {
        url: webhookUrl.substring(0, 80) + '...',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        bodySize: JSON.stringify(data).length,
      })
      
      const fetchStartTime = Date.now()
      console.log('🔄 [Google Sheets API] Initiating webhook fetch...')
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const fetchTime = Date.now() - fetchStartTime
      console.log('📥 [Google Sheets API] Webhook response received:', {
        status: response.status,
        statusText: response.statusText,
        responseTime: `${fetchTime}ms`,
        headers: Object.fromEntries(response.headers.entries()),
      })
      
      const responseText = await response.text()
      console.log('📄 [Google Sheets API] Webhook response body:', {
        length: responseText.length,
        preview: responseText.substring(0, 500),
        fullBody: responseText.length < 1000 ? responseText : responseText.substring(0, 1000) + '... (truncated)',
      })
      
      // Try to parse JSON response
      let parsedResponse: any = null
      try {
        parsedResponse = JSON.parse(responseText)
        console.log('✅ [Google Sheets API] Parsed webhook response:', parsedResponse)
      } catch (parseError) {
        console.log('⚠️ [Google Sheets API] Webhook response is not JSON:', responseText.substring(0, 200))
      }

      if (!response.ok) {
        console.error('❌ [Google Sheets API] Webhook returned error:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
          parsedResponse: parsedResponse,
          suggestion: response.status === 404 
            ? 'Webhook URL might be incorrect or script not deployed'
            : response.status === 403
            ? 'Webhook might require authentication'
            : response.status === 500
            ? 'Google Apps Script error - check execution logs'
            : 'Check webhook URL and deployment',
        })
        throw new Error(`Webhook failed: ${response.status} ${response.statusText}`)
      }

      const totalTime = Date.now() - requestStartTime
      console.log('✅ [Google Sheets API] Webhook success:', {
        method: 'webhook',
        totalTime: `${totalTime}ms`,
        fetchTime: `${fetchTime}ms`,
        submissionId: data.id,
      })

      return NextResponse.json({ success: true, method: 'webhook' })
    }

    // Option 2: Use Google Sheets API (if credentials are provided)
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Form Submissions'

    if (credentials && spreadsheetId) {
      console.log('📤 [Google Sheets API] Using Google Sheets API method')
      console.log('📋 [Google Sheets API] API request details:', {
        spreadsheetId: spreadsheetId.substring(0, 40) + '...',
        sheetName,
        credentialsLength: credentials.length,
      })
      
      const apiStartTime = Date.now()
      console.log('🔄 [Google Sheets API] Authenticating with Google...')
      
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(credentials),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })

      const sheets = google.sheets({ version: 'v4', auth })
      console.log('✅ [Google Sheets API] Authentication successful')

      // Prepare row data
      const rowData = [
        data.submittedAt || new Date().toISOString(),
        data.formId || '',
        ...Object.entries(data)
          .filter(([key]) => !['id', 'formId', 'submittedAt'].includes(key))
          .map(([, value]) => String(value || '')),
      ]
      
      console.log('📊 [Google Sheets API] Row data prepared:', {
        rowLength: rowData.length,
        rowData: rowData,
      })

      console.log('🔄 [Google Sheets API] Appending row to sheet...')
      // Append row to sheet
      const appendResult = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      })
      
      const apiTime = Date.now() - apiStartTime
      console.log('✅ [Google Sheets API] Row appended successfully:', {
        updatedRange: appendResult.data.updates?.updatedRange,
        updatedRows: appendResult.data.updates?.updatedRows,
        updatedColumns: appendResult.data.updates?.updatedColumns,
        updatedCells: appendResult.data.updates?.updatedCells,
        responseTime: `${apiTime}ms`,
      })

      const totalTime = Date.now() - requestStartTime
      console.log('✅ [Google Sheets API] API method success:', {
        method: 'api',
        totalTime: `${totalTime}ms`,
        apiTime: `${apiTime}ms`,
        submissionId: data.id,
      })

      return NextResponse.json({ success: true, method: 'api' })
    }

    console.error('❌ [Google Sheets API] No configuration found')
    return NextResponse.json(
      { error: 'Google Sheets not configured. Set GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_CREDENTIALS' },
      { status: 400 }
    )
  } catch (error) {
    const totalTime = Date.now() - requestStartTime
    const errorDetails = {
      error: error instanceof Error ? error.message : String(error),
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack : undefined,
      totalTime: `${totalTime}ms`,
    }
    
    console.error('❌ [Google Sheets API] Error syncing to Google Sheets:', errorDetails)
    
    // Provide helpful suggestions
    if (error instanceof Error) {
      if (error.message.includes('invalid_grant') || error.message.includes('credentials')) {
        console.error('💡 [Google Sheets API] Suggestion: Check Google Sheets API credentials - they might be expired or invalid')
      } else if (error.message.includes('permission') || error.message.includes('access')) {
        console.error('💡 [Google Sheets API] Suggestion: Service account might not have access to the spreadsheet')
      } else if (error.message.includes('not found') || error.message.includes('404')) {
        console.error('💡 [Google Sheets API] Suggestion: Spreadsheet ID might be incorrect or spreadsheet was deleted')
      }
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

