import React from 'react';

const DesktopActionButtons: React.FC = () => {
  const whatsappNumber = '+919952012346'; // Updated WhatsApp number
  const phoneNumber = '+919952012346';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="desktop-action-buttons">
      {/* Phone button - Left side */}
      <button 
        className="desktop-action-btn phone-btn"
        onClick={handleCallClick}
        aria-label="Call Now"
      >
        <img 
          src={import.meta.env.BASE_URL + "img/phone.png"} 
          alt="Call Now" 
          width="60"
          height="60"
        />
      </button>

      {/* WhatsApp button - Right side */}
      <button 
        className="desktop-action-btn whatsapp-btn"
        onClick={handleWhatsAppClick}
        aria-label="WhatsApp Us"
      >
        <img 
          src={import.meta.env.BASE_URL + "img/what.png"} 
          alt="WhatsApp Us" 
          width="60"
          height="60"
        />
      </button>
    </div>
  );
};

export default DesktopActionButtons;
