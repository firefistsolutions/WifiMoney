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
  // Only run on create operations
  if (operation !== 'create') {
    return doc
  }

  // Check if Google Sheets integration is enabled
  const googleSheetsEnabled = process.env.GOOGLE_SHEETS_ENABLED === 'true'
  if (!googleSheetsEnabled) {
    return doc
  }

  try {
    // Get the form submission data
    const submissionData = doc.submissionData || []
    
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

    // Send to Google Sheets via API route
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (webhookUrl) {
      // Option 1: Google Apps Script Webhook
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flattenedData),
      })
    } else {
      // Option 2: Use internal API route
      const apiUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/google-sheets/sync`
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flattenedData),
      })
    }
  } catch (error) {
    // Log error but don't fail the submission
    console.error('Error sending form submission to Google Sheets:', error)
  }

  return doc
}

