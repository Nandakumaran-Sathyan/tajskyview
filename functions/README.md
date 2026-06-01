# Firebase Cloud Functions

This directory contains the serverless backend for Taj Skyview form submissions.

## Structure

```
functions/
├── src/
│   └── index.ts           # Main Cloud Function handler
├── lib/                   # Compiled JavaScript (generated)
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## What It Does

The `submitLead` Cloud Function:

1. **Validates** form data (name, email, phone)
2. **Authenticates** using a secret token
3. **Processes** phone number (extracts country code)
4. **Appends** submission to Google Sheets
5. **Returns** success/error response to frontend

## Environment Variables

Configure these in Firebase Console or via `.env.local`:

```
SECRET_TOKEN=your-secret-token-here
GOOGLE_SHEET_ID=your-sheet-id-here
CORS_ORIGIN=https://yourdomain.com
```

## Building

```bash
cd functions
npm install
npm run build       # Compile TypeScript to JavaScript
```

## Local Development

### Firebase Emulator

```bash
# From project root
firebase emulators:start --only functions
```

This runs the function on `http://localhost:5001`

### Testing Locally

```bash
curl -X POST http://localhost:5001/submitLead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "9876543210",
    "countryCode": "+91",
    "token": "your-secret-token"
  }'
```

## Deployment

```bash
# From project root
firebase deploy --only functions
```

## Google Sheets Integration

The function uses Google Cloud's default service account to authenticate with Google Sheets.

### Setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Sheets API for your project
3. The Firebase service account automatically has credentials
4. Share your Google Sheet with the service account email

### Service Account Email:

```
your-project@appspot.gserviceaccount.com
```

Or view in Firebase Console:
- Project Settings → Service Accounts → Generate new private key

## Rate Limiting

Current implementation has no built-in rate limiting. To add:

1. Use Cloud Firestore to track submissions per IP
2. Increment counter on POST
3. Check counter before processing

Example:
```typescript
const clientIp = request.ip;
const dayKey = `submissions:${clientIp}:${new Date().toDateString()}`;
// Check and update counter in Firestore
```

## Monitoring

### View Logs

```bash
firebase functions:log

# Or in Firebase Console:
# - Functions → submitLead → Logs
```

### Error Handling

Errors are logged and visible in:
- Firebase Console → Functions → Logs
- Cloud Functions → Runtime Logs

## Scaling

Cloud Functions automatically scales based on traffic.

- Default timeout: 60 seconds
- Memory: 256 MB (configurable)
- Concurrent executions: 1000 (configurable)

To increase resources, edit firebase.json:

```json
{
  "functions": {
    "memory": "512MB",
    "timeout": "300s"
  }
}
```

## Security

- Only POST requests are accepted
- CORS is configured to your domain
- Secret token is required for all submissions
- All input is validated

## Troubleshooting

### 403 Unauthorized
- Check `SECRET_TOKEN` matches frontend's `VITE_SECRET_TOKEN`
- Verify token is set in Firebase Console

### 500 Error
- Check Google Sheets API is enabled
- Verify service account has access to sheet
- Check GOOGLE_SHEET_ID is correct
- Review logs: `firebase functions:log`

### Timeout
- Check Google Sheets API responsiveness
- Increase timeout in firebase.json
- Check network connectivity

## Next Steps

1. Set environment variables in Firebase Console
2. Set up Google Sheets and share with service account
3. Deploy: `firebase deploy --only functions`
4. Test form submission on your site
5. Monitor logs in Firebase Console
