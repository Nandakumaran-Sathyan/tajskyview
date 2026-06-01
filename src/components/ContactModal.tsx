import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PhoneInputWithCountry from './PhoneInputWithCountry';
import { useFormSubmission, type FormData } from '../utils/formHandler';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const result = await submitForm(formData, 'contact-modal');
      
      if (result.success) {
        // Close modal and redirect to thank you page
        onClose();
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

  if (!isOpen) return null;
  return (
    <div className="contact-modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.7)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="contact-modal-content" style={{
        background: "#fff",
        borderRadius: "18px",
        maxWidth: "600px",
        width: "95%",
        padding: "32px 24px",
        position: "relative"
      }}>
        {/* Logo at the top center */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img 
            src={import.meta.env.BASE_URL + "Sky View Hotels and Residences_page-0001 (1).webp"} 
            alt="Taj Skyview Logo" 
            style={{ maxWidth: '160px', height: 'auto' }} 
          />
        </div>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 28,
            cursor: "pointer"
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <form id="contactform-modal" method="POST" onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-3">
                <input 
                  className="form-control" 
                  type="text" 
                  id="name_contact2" 
                  name="name" 
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="mb-3">
                <PhoneInputWithCountry
                  value={formData.mobile}
                  onChange={handlePhoneChange}
                  inputClass="form-control"
                  placeholder="Mobile"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-3">
                <input 
                  className="form-control" 
                  type="email" 
                  id="email_contact2" 
                  name="email" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="mb-3">
                <input 
                  className="form-control" 
                  placeholder="Message" 
                  id="message_contact2" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-2">
              <p className="footer-submit-btn">
                <input 
                  className="btn_1 appbtn gradient" 
                  type="submit" 
                  value={isSubmitting ? 'Submitting...' : 'Submit Now'} 
                  id="submit-contact2"
                  disabled={isSubmitting}
                />
              </p>
            </div>
            {submitStatus.type && (
              <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mt-2`}>
                {submitStatus.message}
              </div>
            )}
            <div className="inp-box">
              <input type="checkbox" defaultChecked id="vehicle2" name="vehicle2" value="form-checkbox" required />
              <label htmlFor="vehicle2" className="inp-txt black">
                I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
