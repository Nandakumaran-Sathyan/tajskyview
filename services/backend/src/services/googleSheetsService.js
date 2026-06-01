import { google } from 'googleapis';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Google Sheets Service
 * Handles all interactions with Google Sheets API
 */
class GoogleSheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.initialize();
  }

  /**
   * Initialize Google Sheets API authentication
   */
  initialize() {
    try {
      const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
      const credentialsPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
      let credentials;

      if (credentialsJson) {
        credentials = JSON.parse(credentialsJson);
      } else if (credentialsPath) {
        credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
      } else {
        const fallbackPath = join(__dirname, '../../config/intelligent-arc-486708-h5-1cd2999b844a.json');
        credentials = JSON.parse(readFileSync(fallbackPath, 'utf8'));
      }

      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      console.log('✅ Google Sheets API initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Google Sheets API:', error.message);
      throw error;
    }
  }

  /**
   * Append form data to Google Sheet
   * @param {Object} formData - Form submission data
   * @returns {Promise<Object>} - Result of the append operation
   */
  async appendFormData(formData) {
    try {
      if (!this.spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID not configured in .env file');
      }

      const { name, email, countryCode, mobile, message, formType, source, submittedAt } = formData;

      // Prepare row data (include Country Code as separate column)
      const values = [
        [
          new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          name,
          email,
          countryCode || '',
          mobile,
          message || '',
          formType || 'contact',
          source || '',
        ],
      ];

      // Append to sheet
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:H', // Adjust sheet name if needed
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values,
        },
      });

      console.log('✅ Data appended to Google Sheets:', response.data);

      return {
        success: true,
        message: 'Data added to Google Sheets',
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Google Sheets error:', error);
      
      // Don't throw error - return failed status but don't break the flow
      return {
        success: false,
        message: error.message || 'Failed to add data to Google Sheets',
        error: error,
      };
    }
  }

  /**
   * Create headers in Google Sheet if not exists
   * @returns {Promise<Object>} - Result of the operation
   */
  async createHeaders() {
    try {
      if (!this.spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID not configured in .env file');
      }

      const headers = [
        ['Timestamp', 'Name', 'Email', 'Country Code', 'Mobile', 'Message', 'Form Type', 'Source'],
      ];

      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:H1',
        valueInputOption: 'RAW',
        resource: {
          values: headers,
        },
      });

      console.log('✅ Headers created in Google Sheets');

      return {
        success: true,
        message: 'Headers created',
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Failed to create headers:', error);
      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  }

  /**
   * Get sheet data (for testing/debugging)
   * @returns {Promise<Array>} - Sheet data
   */
  async getSheetData() {
    try {
      if (!this.spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID not configured in .env file');
      }

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:H',
      });

      return {
        success: true,
        data: response.data.values || [],
      };
    } catch (error) {
      console.error('❌ Failed to get sheet data:', error);
      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  }
}

// Singleton instance
let googleSheetsServiceInstance = null;

/**
 * Get GoogleSheetsService instance
 * @returns {GoogleSheetsService}
 */
export const getGoogleSheetsService = () => {
  if (!googleSheetsServiceInstance) {
    googleSheetsServiceInstance = new GoogleSheetsService();
  }
  return googleSheetsServiceInstance;
};

export default GoogleSheetsService;
