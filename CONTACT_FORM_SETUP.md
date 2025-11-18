# Contact Form Setup Guide

This guide will help you configure the Contact Form (Form ID: 2) in Payload CMS with the exact field layout specified.

## Required Form Structure

The Contact Form should have **5 fields** with the following configuration:

### Field Layout:

1. **Name** (Text field)
   - Width: **100%**
   - Required: Yes
   - Row: 1 (full width)

2. **Email** (Email field)
   - Width: **50%**
   - Required: Yes
   - Row: 2 (left side)

3. **Phone** (Number or Text field)
   - Width: **50%**
   - Required: Yes
   - Row: 2 (right side, next to Email)

4. **I'm interested in** (Select field)
   - Width: **100%**
   - Required: Yes
   - Row: 3 (full width)
   - Options: Add your interest options (e.g., "Courses", "Mentorship", "Partnership", etc.)

5. **Message** (Textarea field)
   - Width: **100%**
   - Required: Yes (or Optional, as per your preference)
   - Row: 4 (full width)

---

## Step-by-Step Setup in Payload CMS

### Step 1: Access the Form

1. Go to `http://localhost:3000/admin`
2. Login with: `demo@email.com` / `admin@123`
3. Navigate to **Forms** in the left sidebar
4. Find and click on **Form ID: 2** (or the form titled "Contact Form")

### Step 2: Configure Form Fields

#### Field 1: Name
1. Click **"Add Field"** or edit existing field
2. Select **"Text"** field type
3. Configure:
   - **Name**: `name` (or `full-name`)
   - **Label**: `Name` (or `Full Name`)
   - **Width**: `100`
   - **Required**: ✅ Yes
   - **Placeholder**: `Enter your full name` (optional)

#### Field 2: Email
1. Click **"Add Field"**
2. Select **"Email"** field type
3. Configure:
   - **Name**: `email`
   - **Label**: `Email`
   - **Width**: `50`
   - **Required**: ✅ Yes
   - **Placeholder**: `your.email@example.com` (optional)

#### Field 3: Phone
1. Click **"Add Field"**
2. Select **"Number"** or **"Text"** field type (Number is recommended)
3. Configure:
   - **Name**: `phone` (or `whatsapp`)
   - **Label**: `Phone` (or `WhatsApp Number`)
   - **Width**: `50`
   - **Required**: ✅ Yes
   - **Placeholder**: `+1 234 567 8900` (optional)

#### Field 4: I'm interested in
1. Click **"Add Field"**
2. Select **"Select"** field type
3. Configure:
   - **Name**: `interest` (or `im-interested-in`)
   - **Label**: `I'm interested in`
   - **Width**: `100`
   - **Required**: ✅ Yes
   - **Options**: Click **"Add Option"** and add:
     - Value: `courses`, Label: `Courses`
     - Value: `mentorship`, Label: `Mentorship`
     - Value: `partnership`, Label: `Partnership`
     - Value: `browsing`, Label: `Just Browsing`
     - (Add more options as needed)
   - **Placeholder**: `Select an option` (optional)

#### Field 5: Message
1. Click **"Add Field"**
2. Select **"Textarea"** field type
3. Configure:
   - **Name**: `message`
   - **Label**: `Message`
   - **Width**: `100`
   - **Required**: ❌ No (or Yes, as per your preference)
   - **Rows**: `4` (optional, controls textarea height)
   - **Placeholder**: `Tell us more about your requirements...` (optional)

### Step 3: Configure Form Settings

1. **Title**: `Contact Form` (or keep existing)
2. **Submit Button Label**: `Submit` (or customize to `Send Message`, etc.)
3. **Confirmation Type**: 
   - Choose **"Message"** for a confirmation message
   - Or **"Redirect"** to redirect after submission
4. **Confirmation Message** (if using Message type):
   - `Thank you for contacting us! We'll get back to you soon.`

### Step 4: Save the Form

1. Click **"Save"** or **"Save Draft"**
2. The form is now configured and will be used on the contact page

---

## Field Order Verification

Make sure the fields are in this exact order in Payload CMS:

1. Name (100% width)
2. Email (50% width)
3. Phone (50% width)
4. I'm interested in (100% width)
5. Message (100% width)

**Important:** The order matters! Fields with 50% width will automatically appear side by side if they are consecutive.

---

## Visual Layout

The form will render like this:

```
┌─────────────────────────────────────┐
│ Name (100%)                         │
├─────────────────────────────────────┤
│ Email (50%)    │ Phone (50%)        │
├─────────────────────────────────────┤
│ I'm interested in (100%)            │
├─────────────────────────────────────┤
│ Message (100%)                      │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## Testing

1. Go to `http://localhost:3000/contact`
2. Verify the form layout:
   - Name field takes full width
   - Email and Phone appear side by side
   - I'm interested in takes full width
   - Message takes full width
3. Submit a test form
4. Check **Form Submissions** in Payload admin to verify data is saved

---

## Troubleshooting

### Fields not appearing side by side?

- Make sure Email and Phone both have **Width: 50**
- Ensure they are consecutive fields (Email immediately followed by Phone)
- Clear browser cache and refresh

### Wrong field order?

- In Payload CMS, you can drag and drop fields to reorder them
- Or delete and recreate fields in the correct order

### Form not updating on frontend?

- Make sure you **Saved** the form in Payload CMS
- Check that you're using Form ID: 2 on the contact page
- Restart the dev server if needed: `pnpm dev`

---

## Current Form Configuration

The contact page is configured to use:
- **Form ID**: 2
- **Location**: `/contact` page
- **Component**: `PayloadForm`

To verify or change the form ID, check:
- File: `src/app/(app)/contact/page.tsx`
- Line: `const PAYLOAD_FORM_ID = 2;`

---

## Additional Notes

- All form submissions are automatically saved to the database
- If Google Sheets integration is enabled, submissions will also sync to Google Sheets
- Form validation happens automatically based on field requirements
- The form uses modern styling with floating labels and gold accents

