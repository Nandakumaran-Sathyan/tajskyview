import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Email Service using Gmail
 * Sends form submission notifications via Gmail
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  /**
   * Initialize Gmail transporter
   */
  initialize() {
    try {
      const emailUser = process.env.GMAIL_EMAIL;
      const emailPass = process.env.GMAIL_APP_PASSWORD;

      if (!emailUser || !emailPass) {
        console.warn('⚠️  Gmail credentials not configured. Email notifications disabled.');
        this.transporter = null;
        return;
      }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      console.log('✅ Email service initialized with Gmail');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error.message);
      this.transporter = null;
    }
  }

  /**
   * Send form submission email
   * @param {Object} formData - Form submission data
   * @returns {Promise<Object>} - Email send result
   */
  async sendSubmissionEmail(formData) {
    try {
      if (!this.transporter) {
        return {
          success: false,
          message: 'Email service not configured'
        };
      }

      const { name, email, countryCode, mobile, message, formType, submittedAt } = formData;
      const recipientEmail = process.env.RECIPIENT_EMAIL || 'revahestates@gmail.com';

      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: recipientEmail,
        subject: `New Form Submission: ${formType || 'contact'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Form Submission</h2>
            <p><strong>Form Type:</strong> ${formType}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Country Code:</strong> ${countryCode || 'N/A'}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f5f5f5; padding: 10px; border-left: 3px solid #007bff;">
              ${message || 'No message provided'}
            </p>
            <p><strong>Submitted At:</strong> ${new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">
              This is an automated email from Taj Skyview Residences form submission system.
            </p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✉️  Email sent successfully to ${recipientEmail}: ${result.messageId}`);

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId
      };
    } catch (error) {
      console.error('❌ Failed to send email:', error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

// Singleton instance
let emailServiceInstance = null;

/**
 * Get EmailService instance
 * @returns {EmailService}
 */
export const getEmailService = () => {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService();
  }
  return emailServiceInstance;
};

export default EmailService;
