import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormSubmission, type FormData } from '../utils/formHandler';
import PhoneInputWithCountry from './PhoneInputWithCountry';

function ContactUsSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name_contact: '',
    phone_contact: '',
    email_contact: '',
    message_contact: '',
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
      phone_contact: value,
      countryCode: countryData?.dialCode ? `+${countryData.dialCode}` : '+91'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Validate required fields
      const requiredFields = ['name_contact', 'phone_contact', 'email_contact'];
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
      if (!validateEmail(formData.email_contact)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter a valid email address'
        });
        setIsSubmitting(false);
        return;
      }

      // Validate phone format
      if (!validatePhone(formData.phone_contact)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter a valid 10-digit mobile number'
        });
        setIsSubmitting(false);
        return;
      }

      // Map form fields to API format
      const apiFormData: FormData = {
        name: formData.name_contact,
        email: formData.email_contact,
        mobile: formData.phone_contact,
        message: formData.message_contact || '',
        countryCode: formData.countryCode
      };

      // Submit form
      const result = await submitForm(apiFormData, 'contact-us');
      
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
    <div className="container-fluid bg-white" id="contact-us">
      <div className="container margin_80">
        <div className="title text-center contact-head">
          <small>Contact Us</small>
          <h2>We're Here to Help You Find Your Perfect Property</h2>
        </div>
        <div className="row justify-content-between">
          <div className="col-xl-5">
            <div>
              <div className="title">
                <h4>About Developer</h4>
              </div>
              <p className="about-developer">
                Ampa Group, led by Chairman and Managing Director Ampa Palaniappan, is partnering with the Taj Group to introduce the world’s first Taj branded residences in Chennai. This pioneering project, the Taj Sky View, will offer 123 luxury residences alongside 253 hotel rooms. Located on a 3.75-acre greenfield site on Nelson Manickam Road, Aminjikarai, the development aims to cater to the evolving lifestyle of the global Indian community. Palaniappan expressed pride in co-creating a landmark project that would redefine luxury living in Chennai and serve as a symbol of prestige in the city
              </p>
            </div>
          </div>
          <div className="col-xl-5">
            <div style={{ background: "rgba(128,128,128,0.15)", borderRadius: "16px", padding: "32px 24px" }}>
              <form id="contactform" method="POST" onSubmit={handleSubmit} autoComplete="off">
                <h2 className="form-heading">Send A Message!</h2>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb-3">
                      <input 
                        className="form-control" 
                        type="text" 
                        id="name_contact1" 
                        name="name_contact" 
                        placeholder="Name"
                        value={formData.name_contact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb-3">
                      <PhoneInputWithCountry
                        value={formData.phone_contact}
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
                        id="email_contact1" 
                        name="email_contact" 
                        placeholder="Email"
                        value={formData.email_contact}
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
                        id="message_contact1" 
                        name="message_contact"
                        value={formData.message_contact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <p className="footer-submit-btn">
                      <input 
                        className="query-btn appbtn gradient" 
                        type="submit" 
                        value={isSubmitting ? 'Submitting...' : 'Submit Now'} 
                        id="submit-contact1"
                        disabled={isSubmitting}
                      />
                    </p>
                  </div>
                </div>
                {submitStatus.type && (
                  <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                    {submitStatus.message}
                  </div>
                )}
                <div className="inp-box">
                  <input type="checkbox" defaultChecked id="vehicle2" name="vehicle2" value="form-checkbox" required />
                  <label htmlFor="vehicle2" className="inp-txt black">
                    I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsSection;
