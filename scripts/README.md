# Admin User Setup Script

## Usage

To create an admin user, set the following environment variables in your `.env.local` file:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-password
```

Then run:

```bash
npx tsx scripts/create-admin-user.ts
```

## Security Notes

- Never commit credentials to version control
- Use strong passwords for production environments
- Store credentials securely in environment variables
- Update passwords regularly