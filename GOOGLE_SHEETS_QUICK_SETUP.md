# Quick Google Sheets Setup

## ✅ Step 1: Enable the Hook

The hook is now enabled in `payload.config.ts`. You just need to configure the environment variables.

## 📋 Step 2: Set Up Google Apps Script (Easiest Method)

### 1. Create a Google Sheet
- Go to [Google Sheets](https://sheets.google.com)
- Create a new spreadsheet
- Add headers in Row 1: `Submitted At`, `Form ID`, `full-name`, `email`, `phone`, `Interested`, `message`
  (Adjust headers to match your form field names)

### 2. Create the Webhook
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete the default code and paste this:

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

3. Click **Save** (💾 icon)
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ → Choose **Web app**
6. Configure:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**
8. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/XXXXX/exec`)

## 🔧 Step 3: Add Environment Variables

Add these to your `.env` file:

```env
# Enable Google Sheets integration (server-side)
GOOGLE_SHEETS_ENABLED=true

# Your Google Apps Script webhook URL (from Step 2)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Important:** 
- Replace `YOUR_SCRIPT_ID` with the actual ID from your deployed web app URL
- These are **server-side** variables (no `NEXT_PUBLIC_` prefix needed)
- Restart your dev server after adding these variables

## 🧪 Step 4: Test

1. Restart your Next.js dev server: `pnpm dev`
2. Submit a test form on your website
3. Check your Google Sheet - the data should appear automatically!

## 🔍 Troubleshooting

- **Data not appearing?** Check your server console for errors
- **Hook not running?** Make sure `GOOGLE_SHEETS_ENABLED=true` (as a string)
- **Webhook failing?** Test the webhook URL manually with curl or Postman

## 📊 Data Format

The hook sends data in this format:
```json
{
  "id": 123,
  "formId": 2,
  "submittedAt": "2024-01-15T10:30:00.000Z",
  "full-name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "Interested": "Courses",
  "message": "Hello!"
}
```

Make sure your Google Sheet headers match these field names exactly!

