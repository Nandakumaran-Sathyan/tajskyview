# Google Sheets Integration Setup Guide

## 📋 Overview

Your backend now submits form data to **both Sell.do CRM and Google Sheets** automatically.

Every form submission will:
1. ✅ Submit to Sell.do API
2. ✅ Append data to Google Sheets

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: "Taj Skyview Form Submissions" (or any name)
4. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```
   Example: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 2: Share Sheet with Service Account

1. In your Google Sheet, click **Share** button (top right)
2. Add this email address:
   ```
   ampahilife@intelligent-arc-486708-h5.iam.gserviceaccount.com
   ```
3. Set permission to **Editor**
4. Click **Send**

### Step 3: Configure Backend

1. Open `services/backend/.env`
2. Replace `your_sheet_id_here` with your actual Sheet ID:
   ```env
   GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   ```
3. Save the file

### Step 4: Restart Backend Server

```bash
# Stop the current backend (Ctrl+C in backend terminal)
cd services/backend
npm start
```

You should see:
```
🚀 Backend server running on port 5001
📡 Frontend URL: http://localhost:5173
🔑 Sell.do API configured: ✓
📊 Google Sheets configured: ✓
```

### Step 5: Setup Sheet Headers

Run this command once to create headers:
```bash
curl http://localhost:5001/api/forms/sheets/setup
```

Or visit in browser:
```
http://localhost:5001/api/forms/sheets/setup
```

This will create headers in your sheet:
| Timestamp | Name | Email | Mobile | Message | Form Type | Source |
|-----------|------|-------|--------|---------|-----------|--------|

---

## 🧪 Testing

### Test API Directly

```bash
curl -X POST http://localhost:5001/api/forms/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "9876543210",
    "message": "Testing dual submission",
    "formType": "test"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you! Your information has been submitted successfully...",
  "data": {...},
  "sellDoResponse": {...},
  "googleSheetsResponse": {
    "success": true,
    "message": "Data added to Google Sheets"
  }
}
```

### Check Results

1. **Sell.do Dashboard**: Log in to see new lead
2. **Google Sheet**: Refresh to see new row added

### Test Connection

```bash
curl http://localhost:5001/api/forms/sheets/test
```

This will show how many rows are in your sheet.

---

## 📊 Google Sheet Structure

Your sheet will have these columns:

| Column | Description | Example |
|--------|-------------|---------|
| **Timestamp** | When form was submitted | 07/02/2026, 2:30:45 PM |
| **Name** | User's full name | John Doe |
| **Email** | User's email address | john@example.com |
| **Mobile** | Phone number with country code | 919876543210 |
| **Message** | Optional message from user | I'm interested in 3 BHK |
| **Form Type** | Which form was submitted | book-visit, contact |
| **Source** | URL where form was submitted | http://localhost:5173/ |

---

## 🔧 Troubleshooting

### Sheet ID Not Found Error

**Error:** `The caller does not have permission`

**Solution:**
1. Make sure you shared the sheet with the service account email
2. Verify the Sheet ID is correct
3. Check the service account has "Editor" permission

### Headers Not Created

**Solution:**
1. Visit `http://localhost:5001/api/forms/sheets/setup`
2. Check response for errors
3. Verify sheet is shared with service account

### Data Not Appearing in Sheet

**Check:**
1. Backend console logs - look for "✅ Data submitted to Google Sheets"
2. Sheet name is "Sheet1" (or update code if different)
3. Service account has Editor permission, not just Viewer

### Google Sheets API Not Initialized

**Error:** `Failed to initialize Google Sheets API`

**Solution:**
1. Verify `config/intelligent-arc-486708-h5-1cd2999b844a.json` exists
2. Check file has valid JSON
3. Restart backend server

---

## 🌐 API Endpoints

### Form Submission
```
POST /api/forms/submit
```
Submits to both Sell.do and Google Sheets.

### Setup Headers (One-time)
```
GET /api/forms/sheets/setup
```
Creates column headers in your Google Sheet.

### Test Connection
```
GET /api/forms/sheets/test
```
Verifies Google Sheets connection and shows row count.

### Health Check
```
GET /api/health
```
Server status with configuration info.

---

## 📝 Environment Variables

Add to `services/backend/.env`:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_actual_sheet_id_here

# Google Service Account (Already configured)
GOOGLE_SERVICE_ACCOUNT_PATH=./config/intelligent-arc-486708-h5-1cd2999b844a.json
```

---

## 🔒 Security Notes

1. ✅ Service account credentials stored in backend only
2. ✅ Never exposed to frontend
3. ✅ Google Sheet can be private (only service account needs access)
4. ✅ Sheet ID is not sensitive, but keep service account JSON secure

---

## 🚀 Production Deployment

### Backend
1. Upload `config/intelligent-arc-486708-h5-1cd2999b844a.json` to your server
2. Set environment variable:
   ```
   GOOGLE_SHEET_ID=your_sheet_id
   ```
3. Ensure service account JSON path is correct on production

### Google Sheet
1. Use the same sheet for production, OR
2. Create a separate production sheet and update `GOOGLE_SHEET_ID`

---

## 📈 Monitoring

### Backend Console Logs

**Successful submission:**
```
📤 Submitting lead to Sell.do: {...}
✅ Lead submitted successfully to Sell.do
📊 Submitting data to Google Sheets...
✅ Data submitted to Google Sheets
```

**Google Sheets failure (non-breaking):**
```
✅ Lead submitted successfully to Sell.do
📊 Submitting data to Google Sheets...
⚠️  Google Sheets submission failed: [reason]
```

Note: If Google Sheets fails, Sell.do submission still succeeds and user gets success message.

---

## 🎯 Next Steps

1. ✅ Create Google Sheet
2. ✅ Share with service account
3. ✅ Update `GOOGLE_SHEET_ID` in services/backend/.env
4. ✅ Restart backend
5. ✅ Run `/api/forms/sheets/setup` to create headers
6. ✅ Test with a form submission
7. ✅ Check both Sell.do and Google Sheet for data

---

## 💡 Tips

**Multiple Sheets:**
- Use different sheets for different environments (dev/production)
- Or use different tabs in the same sheet (update range in code)

**Custom Columns:**
- Edit `googleSheetsService.js` to add more columns
- Update header array and values array

**Auto-Notifications:**
- Use Google Sheets built-in notifications
- Or set up Google Apps Script to send email on new row

**Data Analysis:**
- Use Google Sheets formulas and charts
- Export to Excel or Google Data Studio

---

## 📞 Support

**Issues with Google Sheets API:**
- Check service account has correct permissions
- Verify Sheet ID is correct
- Check backend console logs for detailed errors

**Issues with credentials:**
- Ensure `config/intelligent-arc-486708-h5-1cd2999b844a.json` exists
- Verify JSON is valid
- Check file path is correct

---

**Your forms now submit to both Sell.do AND Google Sheets!** 🎉📊
