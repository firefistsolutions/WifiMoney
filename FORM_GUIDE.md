# Payload CMS Form Builder Guide

This guide explains how to create forms in Payload CMS and link them to your frontend to collect form submissions in the database.

## Overview

PayloadCMS has a built-in **Form Builder Plugin** that allows you to:
- Create forms in the admin panel
- Add forms to pages using blocks
- Automatically collect form submissions in the database
- View and manage submissions in the admin panel

## Step-by-Step Guide

### 1. Create a Form in Payload Admin

1. **Access Admin Panel**
   - Go to `http://localhost:3000/admin`
   - Login with: `demo@email.com` / `admin@123`

2. **Navigate to Forms**
   - Click on **"Forms"** in the left sidebar
   - Click **"Create New"** button

3. **Configure Form Settings**
   - **Title**: Enter a descriptive name (e.g., "Contact Form", "Newsletter Signup")
   - **Submit Button Label**: Customize the button text (default: "Submit")

4. **Add Form Fields**
   Click **"Add Field"** and choose from available field types:
   - **Text**: Single-line text input
   - **Textarea**: Multi-line text input
   - **Email**: Email validation
   - **Number**: Numeric input
   - **Select**: Dropdown selection
   - **Checkbox**: Boolean checkbox
   - **Country**: Country selector
   - **State**: State selector
   - **Message**: Static message/heading (not a field)

   For each field, configure:
   - **Name**: Internal field name (auto-generated, can be customized)
   - **Label**: Display label for users
   - **Width**: Field width (50% or 100%)
   - **Required**: Whether field is mandatory
   - **Default Value**: Optional default value
   - **Placeholder**: Optional placeholder text

5. **Configure Confirmation**
   - **Confirmation Type**: Choose either:
     - **Message**: Show a confirmation message after submission
     - **Redirect**: Redirect to a URL after submission
   - **Confirmation Message**: Rich text message (if using message type)
   - **Redirect URL**: URL to redirect to (if using redirect type)

6. **Configure Email Notifications** (Optional)
   - Add email recipients who should receive form submissions
   - Configure email templates

7. **Save the Form**
   - Click **"Save"** to create the form

### 2. Add Form to a Page

1. **Navigate to Pages**
   - Click on **"Pages"** in the left sidebar
   - Either create a new page or edit an existing one

2. **Add Form Block**
   - In the **"Content"** tab, click **"Add Block"**
   - Select **"Form Block"**

3. **Link the Form**
   - In the Form Block settings:
     - **Form**: Select the form you created from the dropdown
     - **Enable Intro Content**: Toggle if you want intro text above the form
     - **Intro Content**: Add rich text content (if enabled)

4. **Publish the Page**
   - Click **"Save"** or **"Publish"** to make the page live
   - The form will now appear on the frontend at the page URL

### 3. View Form Submissions

1. **Access Submissions**
   - Click on **"Form Submissions"** in the left sidebar
   - You'll see all submissions for all forms

2. **Filter Submissions**
   - Use the filters to view submissions by:
     - Specific form
     - Date range
     - Other criteria

3. **View Submission Details**
   - Click on any submission to view:
     - All field values
     - Submission date/time
     - Associated form

4. **Export Data** (if needed)
   - Submissions can be exported or accessed via API

## Example: Creating a Contact Form

### Step 1: Create the Form

1. Go to **Forms** → **Create New**
2. **Title**: "Contact Form"
3. **Submit Button Label**: "Send Message"

4. **Add Fields**:
   - **Text Field**: Name (required, 50% width)
   - **Text Field**: Last Name (required, 50% width)
   - **Email Field**: Email (required, 100% width)
   - **Textarea Field**: Message (required, 100% width)

5. **Confirmation**:
   - Type: Message
   - Message: "Thank you! We'll get back to you soon."

6. **Save**

### Step 2: Add to Page

1. Go to **Pages** → Create or edit a page
2. Add **Form Block**
3. Select "Contact Form" from the dropdown
4. Enable intro if desired
5. **Publish**

### Step 3: Test

1. Visit the page on the frontend
2. Fill out and submit the form
3. Check **Form Submissions** in admin to see the data

## Form Submission Data Structure

Submissions are automatically stored in the `form-submissions` collection with:
- `form`: Reference to the form
- `submissionData`: Array of field-value pairs
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## API Access

You can also access form submissions via the Payload API:

```typescript
// Get all submissions
GET /api/form-submissions

// Get submissions for a specific form
GET /api/form-submissions?where[form][equals]=FORM_ID

// Create submission (usually done automatically by frontend)
POST /api/form-submissions
```

## Frontend Integration

Forms are automatically rendered on pages that include Form Blocks. The form component:
- Handles validation
- Submits to `/api/form-submissions`
- Shows confirmation messages
- Handles redirects
- Displays errors

## Tips

1. **Field Naming**: Use descriptive names (e.g., `full-name` instead of `field1`)
2. **Validation**: Mark required fields appropriately
3. **User Experience**: Add helpful labels and placeholders
4. **Testing**: Always test forms before going live
5. **Privacy**: Be mindful of data collection and GDPR compliance

## Troubleshooting

- **Form not appearing**: Check that the page is published
- **Submissions not saving**: Check database connection
- **Validation errors**: Ensure required fields are filled
- **Email not sending**: Configure email adapter in Payload config

