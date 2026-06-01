import dotenv from 'dotenv';
import { getGoogleSheetsService } from '../services/googleSheetsService.js';

dotenv.config();


/**
 * Submit form data to Google Sheets.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const submitFormToGoogleSheets = async (req, res) => {
  try {
    const { name, email, mobile, message, formType, countryCode } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and mobile are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const digitsOnly = mobile.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number. Must be at least 10 digits'
      });
    }

    const submittedAt = new Date().toISOString();
    const source = req.headers.referer || 'Direct';

    const googleSheetsService = getGoogleSheetsService();
    const sheetsResult = await googleSheetsService.appendFormData({
      name,
      email,
      countryCode: countryCode || '',
      mobile,
      message: message || '',
      formType: formType || 'contact',
      source,
      submittedAt
    });

    if (!sheetsResult.success) {
      return res.status(500).json({
        success: false,
        message: sheetsResult.message || 'Failed to submit form. Please try again later.'
      });
    }

    // Email is handled client-side via FormSubmit to avoid SMTP blocking issues on Render
    console.log('✅ Form data logged to Google Sheets. Email will be sent via FormSubmit (client-side).');

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your information has been submitted successfully. Our team will contact you shortly.',
      data: {
        name,
        email,
        countryCode: countryCode || '',
        mobile,
        formType: formType || 'contact',
        submittedAt
      }
    });
  } catch (error) {
    console.error('❌ Form submission error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit form. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
