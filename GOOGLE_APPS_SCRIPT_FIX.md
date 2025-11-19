# Fix Google Apps Script 401 Unauthorized Error

## Problem
Your webhook is returning `401 Unauthorized` with "Page not found" error. This means the Google Apps Script is not properly deployed as a web app.

## Solution: Redeploy Your Google Apps Script

### Step 1: Open Your Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Find your project (or create a new one)
3. Make sure your script has the `doPost` function:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Get headers (first row)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Prepare row data
    const rowData = [];
    
    // Add timestamp
    rowData.push(data.submittedAt || new Date().toISOString());
    
    // Add form ID
    rowData.push(data.formId || '');
    
    // Add form field values in order
    for (let i = 2; i < headers.length; i++) {
      const fieldName = headers[i];
      rowData.push(data[fieldName] || '');
    }
    
    // Append row to sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Deploy as Web App (IMPORTANT!)

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app** (NOT "API Executable")
4. Configure the deployment:
   - **Description:** Form Submissions Webhook (or any name)
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** (THIS IS CRITICAL!)
5. Click **Deploy**
6. **Authorize the app** when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Your Project Name] (unsafe)"
   - Click "Allow"
7. **Copy the NEW Web App URL** (it will be different from before)

### Step 3: Update Your .env File

Replace the old webhook URL with the new one:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec
```

**Important:** 
- The URL should end with `/exec` (not `/dev`)
- Make sure "Who has access" is set to **"Anyone"** (not "Only myself")
- The script must be deployed, not just saved

### Step 4: Restart Your Server

```bash
# Stop server (Ctrl+C)
pnpm dev
```

### Step 5: Test Again

Submit a form and check the logs. You should see:
- Status: 200 (instead of 401)
- Response: `{"success":true}`

## Common Issues

### Still Getting 401?
- Make sure "Who has access" is set to **"Anyone"**
- Make sure you clicked "Deploy" (not just "Save")
- Make sure the URL ends with `/exec`
- Try creating a new deployment

### Getting 404?
- The script ID in the URL might be wrong
- Copy the URL directly from the deployment dialog

### Getting 500?
- Check the Google Apps Script execution logs:
  1. Go to your script
  2. Click "Executions" in the left menu
  3. Check for errors

### Script Not Running?
- Make sure the spreadsheet is open and accessible
- Make sure the sheet has headers in row 1
- Check that the script has permission to edit the sheet

## Verify Your Setup

After deploying, test the webhook manually:

```bash
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"submittedAt":"2024-01-01T00:00:00Z","formId":2,"full-name":"Test","email":"test@example.com"}'
```

You should get: `{"success":true}`

## Need Help?

Check the server logs - they now show detailed information about:
- Request details
- Response status
- Response body
- Error messages

The logs will help you identify exactly what's wrong!

