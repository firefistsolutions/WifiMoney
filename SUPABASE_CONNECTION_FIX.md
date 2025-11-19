# Supabase Connection Error Fix

## Error: `getaddrinfo ENOTFOUND db.njncxzzmiesmwfoxqbka.supabase.co`

This error means the DNS lookup is failing for your Supabase database hostname.

## Solutions

### Option 1: Use Supabase Connection Pooler (Recommended for Vercel)

Vercel serverless functions work better with Supabase's connection pooler. Update your `DATABASE_URI`:

**Instead of:**
```
postgresql://postgres:password@db.njncxzzmiesmwfoxqbka.supabase.co:5432/postgres?sslmode=require
```

**Use the Pooler connection string:**
```
postgresql://postgres.njncxzzmiesmwfoxqbka:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**How to get the pooler connection string:**
1. Go to Supabase Dashboard
2. Project Settings → Database
3. Scroll to "Connection string"
4. Select "Connection pooling" tab
5. Choose "Transaction" mode
6. Copy the connection string
7. Replace `[YOUR-PASSWORD]` with your actual password

### Option 2: Verify Direct Connection String

If you want to use the direct connection:

1. **Check the hostname** in Supabase Dashboard:
   - Project Settings → Database
   - Look for "Connection string" → "Direct connection"
   - Verify the hostname matches: `db.njncxzzmiesmwfoxqbka.supabase.co`

2. **Check if the project is paused:**
   - Supabase free tier pauses projects after inactivity
   - Go to Supabase Dashboard and check project status
   - If paused, click "Restore" to wake it up

3. **Verify the connection string format:**
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
   ```
   - Replace `[PASSWORD]` with your actual password (URL-encoded if it contains special characters)
   - Replace `[PROJECT-REF]` with your project reference (njncxzzmiesmwfoxqbka)

### Option 3: Check Network/Firewall

1. **Supabase IP Allowlist:**
   - Supabase Dashboard → Settings → Database
   - Check if there's an IP allowlist enabled
   - Vercel uses dynamic IPs, so you may need to disable IP restrictions

2. **Vercel Network:**
   - Vercel serverless functions should be able to reach Supabase
   - If using Vercel Pro, check if there are any network restrictions

### Option 4: Use Environment Variable with Pooler

Update your `.env` or Vercel environment variables:

```bash
# Use pooler connection (recommended for serverless)
DATABASE_URI=postgresql://postgres.njncxzzmiesmwfoxqbka:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Important:**
- Port `6543` is for transaction mode (recommended)
- Port `5432` is for session mode
- Always include `?sslmode=require` for SSL

## Quick Fix Steps

1. **Get Pooler Connection String:**
   - Supabase Dashboard → Settings → Database → Connection pooling
   - Copy the "Transaction" mode connection string

2. **Update Vercel Environment Variable:**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `DATABASE_URI` with the pooler connection string
   - Make sure to URL-encode special characters in password

3. **Redeploy:**
   - The change will take effect on the next deployment
   - Or trigger a redeploy manually

## Password URL Encoding

If your password contains special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

Example:
```
Password: Firefist@9689#SupaBase
Encoded: Firefist%409689%23SupaBase
```

## Testing

After updating, test the connection:
1. Visit: `https://wifimoney.ai/api/test-payload`
2. Should show: `"success": true` if connection works
3. If still failing, check the error message for details

