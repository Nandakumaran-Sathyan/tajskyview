import express from 'express';
import { submitFormToGoogleSheets } from '../controllers/formController.js';
import { getGoogleSheetsService } from '../services/googleSheetsService.js';

const router = express.Router();

// POST /api/forms/submit - Submit form to Google Sheets
router.post('/submit', submitFormToGoogleSheets);

// GET /api/forms/sheets/setup - Setup Google Sheets headers (one-time setup)
router.get('/sheets/setup', async (req, res) => {
  try {
    const googleSheetsService = getGoogleSheetsService();
    const result = await googleSheetsService.createHeaders();
    
    res.json({
      success: result.success,
      message: result.success 
        ? 'Google Sheets headers created successfully' 
        : 'Failed to create headers',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
});

// GET /api/forms/sheets/test - Test Google Sheets connection
router.get('/sheets/test', async (req, res) => {
  try {
    const googleSheetsService = getGoogleSheetsService();
    const result = await googleSheetsService.getSheetData();
    
    res.json({
      success: result.success,
      message: result.success 
        ? 'Google Sheets connection successful' 
        : 'Failed to connect to Google Sheets',
      rowCount: result.data ? result.data.length : 0,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
});

export default router;
