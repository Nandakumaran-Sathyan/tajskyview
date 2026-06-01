import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormSubmission, type FormData } from '../utils/formHandler';
import PhoneInputWithCountry from './PhoneInputWithCountry';

function MobileBookVisitForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    message: '',
    countryCode: '+91'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const { submitForm, validateForm, validateEmail, validatePhone } = useFormSubmission();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (value: string, countryData?: any) => {
    setFormData({
      ...formData,
      mobile: value,
      countryCode: countryData?.dialCode ? `+${countryData.dialCode}` : '+91'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Validate required fields
      const requiredFields = ['name', 'mobile', 'email'];
      const validation = validateForm(formData, requiredFields);
      
      if (!validation.isValid) {
        setSubmitStatus({
          type: 'error',
          message: `Please fill in all required fields: ${validation.missingFields.join(', ')}`
        });
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      if (!validateEmail(formData.email)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter a valid email address'
        });
        setIsSubmitting(false);
        return;
      }

      // Validate phone format
      if (!validatePhone(formData.mobile)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter a valid 10-digit mobile number'
        });
        setIsSubmitting(false);
        return;
      }

      // Submit form
      const result = await submitForm(formData, 'book-visit-mobile');
      
      if (result.success) {
        // Redirect to thank you page
        navigate('/thank-you');
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-visit-form-mobile d-block d-lg-none">
      <div className="mobile-form-section">
        <div className="container">
          <h3 className="mobile-form-title">Book A Site Visit</h3>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="form-control mobile-input"
                required
              />
            </div>
            <div className="mb-3">
              <PhoneInputWithCountry
                value={formData.mobile}
                onChange={handlePhoneChange}
                inputClass="form-control mobile-input"
                placeholder="Mobile"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mobile-input"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="form-control mobile-input"
                rows={3}
              />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="mobile-consent"
                  className="form-check-input"
                  required
                />
                <label htmlFor="mobile-consent" className="form-check-label mobile-consent-text">
                  I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                </label>
              </div>
            </div>
            <button type="submit" className="btn submit-btn w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            
            {submitStatus.type && (
              <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default MobileBookVisitForm;
