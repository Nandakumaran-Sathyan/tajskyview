import dotenv from 'dotenv';
import { URLSearchParams } from 'url';

dotenv.config();

/**
 * FormSubmit.co Service
 * Sends form submission notifications via FormSubmit
 * Works on any domain (no verification needed when sent from backend)
 * Documentation: https://formsubmit.co/
 */
class FormSubmitService {
  constructor() {
    this.email = process.env.FORMSUBMIT_EMAIL || 'revahestates@gmail.com';
    this.baseUrl = 'https://formsubmit.co';
    console.log('✅ FormSubmit service initialized');
  }

  /**
   * Send form submission via FormSubmit
   * @param {Object} formData - Form submission data
   * @returns {Promise<Object>} - Submission result
   */
  async sendSubmission(formData) {
    try {
      const { name, email, countryCode, mobile, message, formType, submittedAt } = formData;

      // Use URLSearchParams for form-encoded submission
      const params = new URLSearchParams();
      params.append('name', name);
      params.append('email', email);
      params.append('countryCode', countryCode || 'N/A');
      params.append('mobile', mobile);
      params.append('message', message || 'No message provided');
      params.append('formType', formType || 'contact');
      params.append('submittedAt', new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      params.append('_subject', `New Taj Skyview Form Submission: ${formType || 'contact'}`);

      const response = await fetch(`${this.baseUrl}/${encodeURIComponent(this.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      const text = await response.text();
      console.log(`📤 FormSubmit submission response (${response.status}):`, text.substring(0, 100));

      if (response.ok || response.status === 200) {
        console.log(`✉️  FormSubmit email sent successfully to ${this.email}`);
        return {
          success: true,
          message: 'Email sent successfully',
          status: response.status
        };
      } else {
        console.error(`❌ FormSubmit error: ${response.status}`, text);
        return {
          success: false,
          message: `FormSubmit error: ${response.status}`
        };
      }
    } catch (error) {
      console.error('❌ Failed to send FormSubmit email:', error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

// Singleton instance
let formSubmitServiceInstance = null;

/**
 * Get FormSubmitService instance
 * @returns {FormSubmitService}
 */
export const getFormSubmitService = () => {
  if (!formSubmitServiceInstance) {
    formSubmitServiceInstance = new FormSubmitService();
  }
  return formSubmitServiceInstance;
};

export default FormSubmitService;
