# Database Migration Guide

## ⚠️ Important Warning

**NEVER run `migrate:fresh` on a production database!** It will **DELETE ALL YOUR DATA** including:
- All forms and form configurations
- All form submissions
- All pages and content
- All users (except what's recreated by seed)

## What Happened?

The `dev` script was automatically running `migrate:fresh` every time you started the development server. This is **dangerous** and has been removed.

## Available Commands

### Safe Commands (Use These)

```bash
# Start development server (NO migrations)
pnpm dev

# Run pending migrations (safe - only adds new changes)
pnpm migrate

# Create a new migration file
pnpm migrate:create
```

### Dangerous Commands (Use with Caution)

```bash
# ⚠️ DANGER: Drops database and re-runs ALL migrations
# Only use on empty/development databases!
pnpm seed
# or
npm run payload migrate:fresh
```

## When to Use Each Command

### `pnpm dev` (Most Common)
- **Use this** for normal development
- Starts the Next.js server
- Does NOT run migrations
- Safe to use anytime

### `pnpm migrate`
- **Use this** when you have new migrations to apply
- Only runs pending migrations
- Does NOT delete existing data
- Safe for production (after testing)

### `pnpm migrate:create`
- **Use this** to create a new migration file
- Generates a new migration template
- Safe to use anytime

### `pnpm seed` (⚠️ DANGER)
- **Only use** when you want to:
  - Reset your entire database
  - Start fresh with seed data
  - Test migrations from scratch
- **NEVER use** on production or when you have important data!

## Current Situation

If you see the warning:
```
WARNING: This will drop your database and run all migrations. Are you sure you want to proceed? » (y/N)
```

**Answer: N (No)** unless you intentionally want to delete all your data!

## What Was Fixed

The `dev` script has been updated to:
- ✅ Start the development server
- ❌ NOT automatically run migrations
- ❌ NOT drop the database

## If You Need to Reset (Development Only)

If you're in development and want to reset everything:

1. **Make sure you're okay losing all data**
2. Run: `pnpm seed`
3. Answer `y` when prompted
4. Your database will be reset with seed data

## If You Have New Migrations

If you've created new migrations and need to apply them:

1. Run: `pnpm migrate`
2. This will apply only the new migrations
3. Your existing data will be preserved

## Production Deployment

For production:
- **Never** run `migrate:fresh`
- **Only** run `migrate` to apply new migrations
- Always backup your database before migrations
- Test migrations on staging first

## Troubleshooting

### "Migration already applied" error
- This is normal if the migration was already run
- You can safely ignore it

### "Table doesn't exist" error
- You may need to run migrations: `pnpm migrate`
- Or if starting fresh: `pnpm seed` (⚠️ deletes everything)

### Want to check migration status
```bash
npm run payload migrate:status
```

---

**Remember:** The `dev` script no longer runs migrations automatically. You're safe to run `pnpm dev` without worrying about data loss!

