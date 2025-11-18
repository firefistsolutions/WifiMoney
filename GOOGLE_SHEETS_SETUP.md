# Google Sheets Integration Setup Guide

This guide will help you set up automatic syncing of form submissions from Payload CMS to Google Sheets.

## 🎯 Two Setup Options

### Option 1: Google Apps Script (Recommended - Easier) ⭐
**Pros:** No API keys needed, easier setup, free
**Cons:** Slightly slower (webhook-based)

### Option 2: Google Sheets API (More Control)
**Pros:** Faster, more reliable, direct API access
**Cons:** Requires service account setup

---

## 📋 Option 1: Google Apps Script Setup (Recommended)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it (e.g., "Form Submissions")
4. In the first row, add headers for your form fields:
   - Column A: `Submitted At`
   - Column B: `Form ID`
   - Column C: `Full Name` (or your first field)
   - Column D: `Email` (or your second field)
   - ... add columns for all your form fields

### Step 2: Create Google Apps Script

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

3. Click **Save** (💾 icon) and name your project (e.g., "Form Submissions Webhook")
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
6. Configure:
   - **Description:** Form Submissions Webhook
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**
8. **Copy the Web App URL** (you'll need this for Step 3)

### Step 3: Configure Environment Variables

Add to your `.env` file:

```env
# Enable Google Sheets integration (must be 'true' as string)
NEXT_PUBLIC_GOOGLE_SHEETS_ENABLED=true

# Google Apps Script Webhook URL (from Step 2)
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Important:** 
- Replace `YOUR_SCRIPT_ID` with the actual ID from your deployed web app URL
- The `NEXT_PUBLIC_` prefix makes these variables available to the frontend (required for Google Apps Script webhooks)
- For production, you can also set these in your hosting platform's environment variables

### Step 4: Test the Integration

1. Submit a test form on your website
2. Check your Google Sheet - the data should appear automatically!

---

## 🔧 Option 2: Google Sheets API Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google Sheets API"
   - Click **Enable**

### Step 2: Create a Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name it (e.g., "form-submissions-service")
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### Step 3: Create and Download Service Account Key

1. Click on your newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Download the JSON file
6. **Important:** Keep this file secure!

### Step 4: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click **Share** button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it **Editor** permissions
5. Click **Send**

### Step 5: Get Spreadsheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```
Copy the `SPREADSHEET_ID` part.

### Step 6: Configure Environment Variables

Add to your `.env` file:

```env
# Enable Google Sheets integration
GOOGLE_SHEETS_ENABLED=true

# Google Sheets API Credentials (paste the entire JSON content as a single line)
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}

# Your Google Sheet ID (from Step 5)
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here

# Sheet name (optional, defaults to "Form Submissions")
GOOGLE_SHEETS_SHEET_NAME=Form Submissions
```

**Note:** For `GOOGLE_SHEETS_CREDENTIALS`, you need to:
1. Open the downloaded JSON file
2. Copy the entire content
3. Paste it as a single line (remove all line breaks)
4. Escape any quotes if needed

### Step 7: Test the Integration

1. Submit a test form on your website
2. Check your Google Sheet - the data should appear automatically!

---

## 🎨 Customizing Column Headers

### For Google Apps Script Method:

1. Edit your Google Sheet headers (Row 1)
2. Make sure the headers match your form field names exactly
3. The script will automatically map fields to columns

### For Google Sheets API Method:

1. Edit your Google Sheet headers (Row 1)
2. The API will append data in the order: Timestamp, Form ID, then all form fields

---

## 🔍 Troubleshooting

### Data not appearing in Google Sheets?

1. **Check environment variables:**
   - Make sure `GOOGLE_SHEETS_ENABLED=true`
   - Verify your webhook URL or credentials are correct

2. **Check server logs:**
   - Look for errors in your Next.js console
   - Check for "Error sending form submission to Google Sheets"

3. **Test the webhook manually:**
   ```bash
   curl -X POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec \
     -H "Content-Type: application/json" \
     -d '{"submittedAt":"2024-01-01T00:00:00Z","formId":2,"fullName":"Test","email":"test@example.com"}'
   ```

4. **For Google Sheets API:**
   - Verify service account has Editor access to the sheet
   - Check that the spreadsheet ID is correct
   - Ensure the sheet name matches exactly

### Common Issues:

- **"Permission denied"**: Service account needs Editor access to the sheet
- **"Sheet not found"**: Check the sheet name spelling (case-sensitive)
- **"Invalid credentials"**: Verify the JSON credentials are properly formatted

---

## 📊 Data Format

Form submissions are sent with this structure:

```json
{
  "id": 123,
  "formId": 2,
  "submittedAt": "2024-01-15T10:30:00.000Z",
  "fullName": "John Doe",
  "email": "john@example.com",
  "whatsapp": "+1234567890",
  "interest": "courses",
  "message": "Hello!"
}
```

The hook automatically:
- Adds submission ID
- Adds form ID
- Adds timestamp
- Includes all form field values

---

## 🚀 Advanced: Multiple Sheets

To send different forms to different sheets, modify the hook in `src/hooks/formSubmissionsToSheets.ts` to check the form ID and use different webhook URLs or spreadsheet IDs.

---

## 📝 Notes

- Form submissions are still saved in Payload CMS database
- Google Sheets sync happens asynchronously (won't block form submission)
- If Google Sheets sync fails, the form submission still succeeds
- All errors are logged but don't affect the user experience

---

## ✅ Setup Checklist

- [ ] Created Google Sheet with headers
- [ ] Set up Google Apps Script OR Service Account
- [ ] Added environment variables to `.env`
- [ ] Tested with a form submission
- [ ] Verified data appears in Google Sheets
- [ ] Checked server logs for any errors

---

Need help? Check the server logs or test the webhook manually using curl/Postman.

