import { logger, sanitizeForLog } from './logger';

export interface FormData {
  [key: string]: string | undefined;
  countryCode?: string;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: FormData;
}

export class FormHandler {
  private static instance: FormHandler;
  private apiEndpoint: string;

  private constructor() {
    // Point to backend API for form submissions (uses Google Sheets)
    this.apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:5002/api/forms/submit';
    logger.info('Form Handler initialized - Using backend API at ' + this.apiEndpoint);
  }

  public static getInstance(): FormHandler {
    if (!FormHandler.instance) {
      FormHandler.instance = new FormHandler();
    }
    return FormHandler.instance;
  }

  private submitToFormSubmit(formData: FormData, formType: string): Promise<void> {
    // Client-side submit to FormSubmit for email notifications
    // Using the standard FormData approach (form-encoded) for better compatibility
    const formBody = new FormData();
    formBody.append('name', formData.name || '');
    formBody.append('email', formData.email || '');
    formBody.append('_replyto', formData.email || '');
    formBody.append('phone', `${formData.countryCode || ''}${formData.mobile || ''}`.trim());
    formBody.append('message', formData.message || '');
    formBody.append('formType', formType);
    formBody.append('_subject', `New Taj Skyview submission: ${formType}`);
    formBody.append('_captcha', 'false');
    formBody.append('_next', window.location.href);

    // Debug logging
    console.log('📤 [DEBUG] FormSubmit form-encoded payload:');
    for (const [key, value] of formBody.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    return fetch('https://formsubmit.co/revahestates@gmail.com', {
      method: 'POST',
      body: formBody
      // Note: Do NOT set Content-Type header; browser will set it with boundary for multipart/form-data
    })
      .then(async response => {
        console.log('📨 [DEBUG] FormSubmit response status:', response.status);
        
        const responseText = await response.text();
        console.log('📨 [DEBUG] FormSubmit response body:', responseText.substring(0, 500));

        if (!response.ok && response.status !== 200) {
          const errMsg = `FormSubmit returned ${response.status}`;
          console.error('❌ [DEBUG] FormSubmit error:', errMsg);
          throw new Error(errMsg);
        }

        console.log('✅ [DEBUG] FormSubmit request successful');
        logger.log('✅ FormSubmit email request sent');
      })
      .catch(error => {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error('❌ [DEBUG] FormSubmit request caught error:', errMsg);
        logger.warn('⚠️ FormSubmit request failed (non-critical)', { 
          error: errMsg
        });
      });
  }

  public async submitForm(formData: FormData, formType: string = 'contact'): Promise<FormSubmissionResponse> {
    try {
      logger.log('Submitting form:', sanitizeForLog({
        formType,
        hasName: !!formData.name,
        hasEmail: !!formData.email,
        hasMobile: !!formData.mobile
      }));

      // Extract mobile number (remove country code prefix)
      const extractMobileNumber = (phone: string): string => {
        const cleaned = phone.replace(/[^\d+]/g, '');
        if (formData.countryCode) {
          const code = formData.countryCode.replace(/\D/g, '');
          if (cleaned.startsWith(code)) {
            return cleaned.substring(code.length);
          }
        }
        return cleaned.replace(/^\+/, '');
      };

      const mobile = extractMobileNumber(formData.mobile || '');

      // Prepare form data for backend API (Google Sheets)
      const submissionData = {
        name: formData.name || '',
        email: formData.email || '',
        mobile: mobile,
        countryCode: formData.countryCode || '',
        message: formData.message || '',
        formType: formType,
      };

      // Submit to both backend (Google Sheets) and FormSubmit (email) in parallel
      const backendSubmit = fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const emailSubmit = this.submitToFormSubmit(formData, formType);

      // Wait for backend response (critical path)
      const response = await backendSubmit;
      
      // Fire-and-forget email submission (non-blocking)
      emailSubmit.catch(err => logger.error('Email submission failed', err));

      const responseText = await response.text();
      let result: any = null;

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = null;
        }
      }

      if (!response.ok || !result.success) {
        throw new Error(result?.message || responseText || 'Failed to submit form');
      }

      logger.log('Form submitted successfully (backend logged, email sent)');

      return {
        success: true,
        message: result.message || 'Thank you! Your information has been submitted successfully. Our team will contact you shortly.',
        data: formData
      };

    } catch (error) {
      logger.error('Form submission failed');
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      };
    }
  }

  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public validatePhone(phone: string): boolean {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Accept phone numbers with 10+ digits (to account for country code)
    // For India: 919876543210 (12 digits) or just 9876543210 (10 digits)
    return digitsOnly.length >= 10;
  }

  public validateRequired(formData: FormData, requiredFields: string[]): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];
    
    requiredFields.forEach(field => {
      const value = formData[field];

      if (!value || value.trim() === '') {
        missingFields.push(field);
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }
}

// React hook for easy form handling
export const useFormSubmission = () => {
  const formHandler = FormHandler.getInstance();
  
  const submitForm = async (formData: FormData, formType: string = 'contact') => {
    return await formHandler.submitForm(formData, formType);
  };

  const validateForm = (formData: FormData, requiredFields: string[]) => {
    return formHandler.validateRequired(formData, requiredFields);
  };

  const validateEmail = (email: string) => {
    return formHandler.validateEmail(email);
  };

  const validatePhone = (phone: string) => {
    return formHandler.validatePhone(phone);
  };

  return {
    submitForm,
    validateForm,
    validateEmail,
    validatePhone
  };
};
