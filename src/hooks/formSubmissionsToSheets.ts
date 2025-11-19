import type { CollectionAfterChangeHook } from 'payload'

/**
 * Hook to send form submissions to Google Sheets
 * This hook is triggered after a form submission is created
 */
export const formSubmissionsToSheets: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Always log - this confirms the hook is being called
  console.log('='.repeat(80))
  console.log('🔍 [Google Sheets Hook] Hook triggered:', {
    operation,
    submissionId: doc.id,
    timestamp: new Date().toISOString(),
    docKeys: Object.keys(doc),
  })
  console.log('='.repeat(80))

  // Only run on create operations
  if (operation !== 'create') {
    console.log('⏭️ [Google Sheets Hook] Skipping - not a create operation')
    return doc
  }

  // Check if Google Sheets integration is enabled
  const googleSheetsEnabled = process.env.GOOGLE_SHEETS_ENABLED === 'true'
  console.log('🔧 [Google Sheets Hook] Integration enabled:', googleSheetsEnabled)
  
  if (!googleSheetsEnabled) {
    console.log('⚠️ [Google Sheets Hook] Integration disabled - set GOOGLE_SHEETS_ENABLED=true')
    return doc
  }

  try {
    // Get the form submission data
    const submissionData = doc.submissionData || []
    console.log('📊 [Google Sheets Hook] Submission data:', {
      submissionDataCount: submissionData.length,
      submissionData: submissionData,
    })
    
    // Transform submission data into a flat object
    const flattenedData: Record<string, any> = {
      id: doc.id,
      formId: typeof doc.form === 'object' ? doc.form.id : doc.form,
      submittedAt: doc.createdAt || new Date().toISOString(),
    }

    // Flatten the submission data array into an object
    submissionData.forEach((item: { field: string; value: any }) => {
      flattenedData[item.field] = item.value
    })

    console.log('📦 [Google Sheets Hook] Flattened data to send:', JSON.stringify(flattenedData, null, 2))

    // Send to Google Sheets via API route
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    console.log('🌐 [Google Sheets Hook] Webhook URL configured:', webhookUrl ? 'Yes' : 'No')
    
    if (webhookUrl) {
      // Option 1: Google Apps Script Webhook
      console.log('📤 [Google Sheets Hook] Sending to webhook:', webhookUrl)
      console.log('📋 [Google Sheets Hook] Request details:', {
        method: 'POST',
        url: webhookUrl.substring(0, 80) + '...', // First 80 chars for security
        headers: {
          'Content-Type': 'application/json',
        },
        bodySize: JSON.stringify(flattenedData).length,
        fieldCount: Object.keys(flattenedData).length,
      })
      const startTime = Date.now()
      
      try {
        console.log('🔄 [Google Sheets Hook] Initiating fetch request...')
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(flattenedData),
        })
        
        const responseTime = Date.now() - startTime
        console.log('📥 [Google Sheets Hook] Response received:', {
          status: response.status,
          statusText: response.statusText,
          responseTime: `${responseTime}ms`,
          headers: Object.fromEntries(response.headers.entries()),
        })
        
        const responseText = await response.text()
        console.log('📄 [Google Sheets Hook] Response body:', {
          length: responseText.length,
          preview: responseText.substring(0, 500), // First 500 chars
          fullBody: responseText.length < 1000 ? responseText : responseText.substring(0, 1000) + '... (truncated)',
        })
        
        // Try to parse JSON response
        let parsedResponse: any = null
        try {
          parsedResponse = JSON.parse(responseText)
          console.log('✅ [Google Sheets Hook] Parsed JSON response:', parsedResponse)
        } catch (parseError) {
          console.log('⚠️ [Google Sheets Hook] Response is not JSON, raw text:', responseText.substring(0, 200))
        }
        
        console.log('✅ [Google Sheets Hook] Webhook response summary:', {
          status: response.status,
          statusText: response.statusText,
          responseTime: `${responseTime}ms`,
          responseBodyLength: responseText.length,
          isSuccess: response.ok,
          parsedResponse: parsedResponse,
        })
        
        if (!response.ok) {
          const suggestion = response.status === 401
            ? 'Webhook returned 401 Unauthorized - The Google Apps Script is not properly deployed. Go to Google Apps Script → Deploy → New deployment → Set "Who has access" to "Anyone" → Deploy and copy the new URL'
            : response.status === 404
            ? 'Webhook URL might be incorrect or the script is not deployed. Check the URL and redeploy the script.'
            : response.status === 403
            ? 'Webhook requires authentication or permissions. Set "Who has access" to "Anyone" in the deployment settings.'
            : response.status === 500
            ? 'Google Apps Script might have an error - check the script execution logs in Google Apps Script dashboard'
            : 'Check the webhook URL and Google Apps Script deployment'
          
          console.error('❌ [Google Sheets Hook] Webhook returned error status:', {
            status: response.status,
            statusText: response.statusText,
            body: responseText.substring(0, 500), // Truncate long HTML responses
            parsedResponse: parsedResponse,
            suggestion: suggestion,
            fixSteps: response.status === 401 ? [
              '1. Go to Google Apps Script',
              '2. Click Deploy → New deployment',
              '3. Set "Who has access" to "Anyone"',
              '4. Click Deploy',
              '5. Copy the new Web App URL',
              '6. Update GOOGLE_SHEETS_WEBHOOK_URL in .env',
            ] : undefined,
          })
        } else {
          console.log('🎉 [Google Sheets Hook] Successfully sent to Google Sheets!', {
            submissionId: doc.id,
            formId: flattenedData.formId,
            timestamp: flattenedData.submittedAt,
            responseTime: `${responseTime}ms`,
          })
        }
      } catch (fetchError) {
        const responseTime = Date.now() - startTime
        const errorDetails = {
          error: fetchError instanceof Error ? fetchError.message : String(fetchError),
          errorType: fetchError instanceof Error ? fetchError.constructor.name : typeof fetchError,
          responseTime: `${responseTime}ms`,
          webhookUrl: webhookUrl.substring(0, 80) + '...', // First 80 chars for security
          stack: fetchError instanceof Error ? fetchError.stack : undefined,
        }
        
        console.error('❌ [Google Sheets Hook] Fetch error details:', errorDetails)
        
        // Provide specific suggestions based on error type
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          console.error('💡 [Google Sheets Hook] Suggestion: Network error - check if webhook URL is accessible and CORS is configured')
        } else if (fetchError instanceof Error && fetchError.message.includes('timeout')) {
          console.error('💡 [Google Sheets Hook] Suggestion: Request timed out - Google Apps Script might be slow or unresponsive')
        } else if (fetchError instanceof Error && fetchError.message.includes('CORS')) {
          console.error('💡 [Google Sheets Hook] Suggestion: CORS error - ensure Google Apps Script allows requests from your domain')
        }
        
        throw fetchError
      }
    } else {
      // Option 2: Use internal API route
      const apiUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/google-sheets/sync`
      console.log('📤 [Google Sheets Hook] Sending to internal API:', apiUrl)
      const startTime = Date.now()
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(flattenedData),
        })
        
        const responseTime = Date.now() - startTime
        const responseText = await response.text()
        
        console.log('✅ [Google Sheets Hook] Internal API response:', {
          status: response.status,
          statusText: response.statusText,
          responseTime: `${responseTime}ms`,
          responseBody: responseText.substring(0, 200),
        })
        
        if (!response.ok) {
          console.error('❌ [Google Sheets Hook] Internal API returned error status:', {
            status: response.status,
            statusText: response.statusText,
            body: responseText,
          })
        }
      } catch (fetchError) {
        const responseTime = Date.now() - startTime
        console.error('❌ [Google Sheets Hook] Internal API fetch error:', {
          error: fetchError instanceof Error ? fetchError.message : String(fetchError),
          errorType: fetchError instanceof Error ? fetchError.constructor.name : typeof fetchError,
          responseTime: `${responseTime}ms`,
        })
        throw fetchError
      }
    }
  } catch (error) {
    // Log error but don't fail the submission
    console.error('❌ [Google Sheets Hook] Error sending form submission to Google Sheets:', {
      error: error instanceof Error ? error.message : String(error),
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack : undefined,
      submissionId: doc.id,
      formId: typeof doc.form === 'object' ? doc.form.id : doc.form,
    })
  }

  console.log('🏁 [Google Sheets Hook] Hook completed for submission:', doc.id)
  return doc
}

