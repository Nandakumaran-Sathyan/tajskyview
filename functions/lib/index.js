"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitLead = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const googleapis_1 = require("googleapis");
const cors_1 = __importDefault(require("cors"));
// Initialize Firebase Admin SDK
admin.initializeApp();
// CORS configuration - allow requests from your domain
const corsHandler = (0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
});
/**
 * Validates form submission data
 */
function validateData(data) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        return { valid: false, error: 'Name is required' };
    }
    if (!data.email || typeof data.email !== 'string') {
        return { valid: false, error: 'Valid email is required' };
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { valid: false, error: 'Invalid email format' };
    }
    if (!data.mobile || typeof data.mobile !== 'string' || data.mobile.replace(/\D/g, '').length < 7) {
        return { valid: false, error: 'Valid phone number is required' };
    }
    return { valid: true };
}
/**
 * Appends a row to Google Sheets
 */
async function appendToSheet(row) {
    try {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!sheetId) {
            throw new Error('GOOGLE_SHEET_ID not configured');
        }
        const values = [
            [
                row.timestamp,
                row.name,
                row.email,
                row.countryCode || '+91',
                row.mobile,
                row.message || '',
                row.formType || 'contact',
                row.source || '',
            ],
        ];
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'Sheet1!A:H',
            valueInputOption: 'RAW',
            requestBody: { values },
        });
        return true;
    }
    catch (error) {
        console.error('Error appending to Google Sheets:', error);
        throw error;
    }
}
/**
 * Main HTTP Cloud Function for form submissions
 */
exports.submitLead = functions
    .region('us-central1')
    .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
        try {
            // Handle preflight requests
            if (request.method === 'OPTIONS') {
                response.status(204).send('');
                return;
            }
            if (request.method !== 'POST') {
                response.status(405).json({ status: 'error', message: 'Method not allowed' });
                return;
            }
            const data = request.body;
            // Verify secret token
            const secretToken = process.env.SECRET_TOKEN;
            if (!secretToken || data.token !== secretToken) {
                response.status(403).json({ status: 'error', message: 'Unauthorized' });
                return;
            }
            // Validate form data
            const validation = validateData(data);
            if (!validation.valid) {
                response.status(400).json({
                    status: 'error',
                    message: validation.error || 'Invalid form data',
                });
                return;
            }
            // Extract country code from phone if not provided
            let countryCode = data.countryCode || '+91';
            let mobile = data.mobile;
            // If mobile includes country code, extract it
            if (mobile.startsWith('+') && mobile.length > 10) {
                const match = mobile.match(/^\+\d{1,3}/);
                if (match) {
                    countryCode = match[0];
                    mobile = mobile.replace(countryCode, '').replace(/^\d/, (m) => m);
                }
            }
            // Clean mobile number (remove non-digits)
            mobile = mobile.replace(/\D/g, '');
            if (mobile.length > 10) {
                mobile = mobile.slice(-10);
            }
            // Prepare row for Google Sheets
            const sheetRow = {
                timestamp: new Date().toISOString(),
                name: data.name.trim(),
                email: data.email.trim(),
                countryCode,
                mobile,
                message: (data.message || '').trim(),
                formType: data.formType || 'contact',
                source: request.headers.referer || 'Direct',
            };
            // Append to Google Sheets
            await appendToSheet(sheetRow);
            response.status(200).json({
                status: 'success',
                message: 'Thank you! Your information has been submitted successfully.',
                data: { timestamp: sheetRow.timestamp },
            });
        }
        catch (error) {
            console.error('Error processing form submission:', error);
            response.status(500).json({
                status: 'error',
                message: 'Failed to process submission. Please try again later.',
            });
        }
    });
});
//# sourceMappingURL=index.js.map