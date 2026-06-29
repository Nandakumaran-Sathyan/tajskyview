import React from 'react';

interface MobileActionButtonsProps {
  onEnquireClick: () => void;
}

const MobileActionButtons: React.FC<MobileActionButtonsProps> = ({ onEnquireClick }) => {
  const whatsappNumber = '+13653786652'; // Updated WhatsApp number
  const phoneNumber = '+13653786652';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div 
      className="mobile-action-buttons"
      style={{
        display: 'none',
      }}
    >
      <button 
        className="mobile-action-btn enquire-btn"
        onClick={onEnquireClick}
      >
        Enquire Now
      </button>
      <button 
        className="mobile-action-btn whatsapp-btn"
        onClick={handleWhatsAppClick}
      >
        Whatsapp Us
      </button>
      <button 
        className="mobile-action-btn call-btn"
        onClick={handleCallClick}
      >
        Call Now
      </button>
    </div>
  );
};

export default MobileActionButtons;
