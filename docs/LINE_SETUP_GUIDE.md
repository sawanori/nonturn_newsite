# LINE Admin Notification Setup Guide

## Overview
This system sends LINE notifications to administrators when users submit inquiries through the chat feature. It includes a 5-minute cooldown to prevent spam.

## Prerequisites
- LINE Developers Account
- LINE Messaging API Channel
- Vercel deployment (or other hosting with environment variable support)
- Supabase project with chat tables

## Setup Steps

### 1. Create LINE Messaging API Channel

1. Go to [LINE Developers Console](https://developers.line.biz/console/)
2. Create a new provider or select existing one
3. Create a new Messaging API channel
4. Note down:
   - Channel ID
   - Channel Secret (in Basic Settings)
   - Generate and copy Channel Access Token (long-lived) from Messaging API tab

### 2. Configure Environment Variables

Add the following to your `.env.local` or Vercel environment variables:

```env
# LINE Messaging API
LINE_CHANNEL_ID=your_channel_id
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_long_lived_token

# Admin Settings
ADMIN_INBOX_URL=https://foodphoto-pro.com/admin/inbox
ADMIN_NOTIFY_COOLDOWN_MINUTES=5
ADMIN_NOTIFY_ENABLED=true
```

### 3. Deploy and Configure Webhook

1. Deploy your application
2. In LINE Developers Console, go to Messaging API tab
3. Set Webhook URL to: `https://your-domain.com/api/line/webhook`
4. Enable "Use webhook"
5. Click "Verify" to test the connection

### 4. Get Admin Group/User IDs

#### For Group Notifications:
1. Create a LINE group for admin notifications
2. Add your LINE Official Account (bot) to the group
3. Send any message in the group
4. Check your application logs (Vercel Functions logs)
5. Look for: `LINE_ADMIN_GROUP_ID candidate: C...`
6. Copy the group ID and add to environment variables:
   ```env
   LINE_ADMIN_GROUP_ID=Cxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### For Individual User Notifications:
1. Add the bot as a friend
2. Send a message to the bot
3. Check logs for: `LINE_ADMIN_USER_ID candidate: U...`
4. Add user IDs (comma-separated for multiple):
   ```env
   LINE_ADMIN_USER_IDS=Uxxxxxxxxx,Uyyyyyyyyy
   ```

### 5. Test the System

1. Go to your chat interface
2. Send a test message
3. You should receive a LINE notification with:
   - Title: "ユーザーから新着メッセージ"
   - Preview of the message (max 60 chars)
   - Button to open admin inbox

## Notification Logic

- **New conversations**: Always notified
- **Follow-up messages**: Only notified if previous message was from admin
- **Cooldown**: 5-minute window between notifications for same conversation
- **Async**: Notifications are sent asynchronously, won't block chat

## Troubleshooting

### Webhook Not Working
- Check LINE_CHANNEL_SECRET is correct
- Verify webhook URL is HTTPS
- Check Vercel Functions logs for 401 errors

### Notifications Not Received
- Verify LINE_CHANNEL_ACCESS_TOKEN is valid
- Ensure bot is member of target group
- Check LINE_ADMIN_GROUP_ID or LINE_ADMIN_USER_IDS are set
- Look for "LINE push failed" in logs

### Too Many/Few Notifications
- Adjust ADMIN_NOTIFY_COOLDOWN_MINUTES
- Check database function `try_admin_notify` exists
- Verify role detection logic in `/api/chat/send`

## Emergency Controls

### Disable All Notifications
```env
ADMIN_NOTIFY_ENABLED=false
```

### Disable Chat Feature
```env
NEXT_PUBLIC_CHAT_ENABLED=false
```

## Security Notes

- Keep LINE tokens in environment variables only
- Never commit tokens to version control
- Rotate tokens periodically
- Webhook uses signature verification
- Service role key should be server-side only