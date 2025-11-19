# Production Admin Panel 500 Error - Troubleshooting Guide

If you're getting a 500 Internal Server Error when accessing the admin panel in production, follow these steps:

## Common Causes

### 1. Missing Environment Variables ⚠️ MOST COMMON

**Required environment variables:**
- `PAYLOAD_SECRET` - Must be set and match between builds
- `DATABASE_URI` - Your PostgreSQL connection string
- `NEXT_PUBLIC_PAYLOAD_URL` - Your production URL (optional but recommended)

**How to check:**
1. Check your hosting platform's environment variables
2. Ensure `PAYLOAD_SECRET` is set (should be a long random string)
3. Ensure `DATABASE_URI` is set correctly with your Supabase connection string

**Fix:**
```bash
# In your production environment, set:
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URI=postgresql://user:password@host:port/database?sslmode=require
NEXT_PUBLIC_PAYLOAD_URL=https://your-domain.com
```

### 2. Database Connection Issues

**Symptoms:**
- 500 error when loading admin
- Timeout errors
- Connection refused errors

**How to check:**
1. Verify your `DATABASE_URI` is correct
2. Check if your database allows connections from your production server IP
3. Ensure SSL is configured correctly for Supabase

**Fix:**
- For Supabase, ensure your connection string includes `?sslmode=require`
- Check Supabase dashboard → Settings → Database → Connection string
- Verify your database is running and accessible

### 3. ImportMap Not Generated

**Symptoms:**
- Admin panel fails to load
- Missing module errors

**Fix:**
```bash
# Regenerate the importMap
pnpm generate:importmap

# Then rebuild
pnpm build
```

### 4. CORS Configuration

**Symptoms:**
- Admin loads but API calls fail
- CORS errors in browser console

**Fix:**
- Ensure `NEXT_PUBLIC_PAYLOAD_URL` is set to your production domain
- Check `payload.config.ts` CORS settings

### 5. Build Issues

**Symptoms:**
- Admin panel not found
- Missing files

**Fix:**
```bash
# Clean build
rm -rf .next
pnpm build
```

## Step-by-Step Debugging

### Step 1: Check Server Logs

Look at your production server logs for the actual error message. Common errors:
- `PAYLOAD_SECRET environment variable is required`
- `DATABASE_URI environment variable is required`
- `Cannot connect to database`
- `Module not found`

### Step 2: Verify Environment Variables

In your production environment, verify:
```bash
echo $PAYLOAD_SECRET  # Should output your secret
echo $DATABASE_URI    # Should output your database connection string
```

### Step 3: Test Database Connection

If possible, test the database connection from your production server:
```bash
# Using psql (if available)
psql $DATABASE_URI -c "SELECT 1;"
```

### Step 4: Regenerate ImportMap

```bash
pnpm generate:importmap
pnpm build
```

### Step 5: Check File Permissions

Ensure all files are readable:
```bash
chmod -R 755 .next
```

## Quick Fix Checklist

- [ ] `PAYLOAD_SECRET` is set in production environment
- [ ] `DATABASE_URI` is set and correct
- [ ] Database is accessible from production server
- [ ] ImportMap is generated (`pnpm generate:importmap`)
- [ ] Build completed successfully (`pnpm build`)
- [ ] All environment variables match between dev and production
- [ ] CORS is configured correctly
- [ ] Server has proper file permissions

## Still Not Working?

1. **Check the actual error** in your production server logs
2. **Compare with development** - does it work locally?
3. **Verify database** - can you connect to it from production?
4. **Check Payload CMS version** - ensure it matches between dev and prod
5. **Review hosting platform docs** - some platforms need special configuration

## Common Hosting Platform Issues

### Vercel
- Ensure environment variables are set in Vercel dashboard
- Check build logs for errors
- Verify Node.js version matches

### Netlify
- Set environment variables in Netlify dashboard
- Check build settings
- Verify Node.js version

### Self-Hosted
- Check server logs
- Verify Node.js version (18.20.2+ or 20.9.0+)
- Check file permissions
- Verify database firewall rules

