import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    // Prevent back button from going to form
    window.history.pushState(null, "", window.location.href);
    
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e3e8f0 100%)'
      }}>
        <div style={{
          maxWidth: '700px',
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          padding: '60px 50px',
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          {/* Logo */}
          <img 
            src="img/taj-logo.png" 
            alt="Taj Skyview Residences" 
            style={{ width: '220px', maxWidth: '80%', marginBottom: '40px' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          {/* Success Icon */}
          <div style={{
            width: '90px',
            height: '90px',
            margin: '0 auto 30px',
            background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(40, 167, 69, 0.2)'
          }}>
            <svg viewBox="0 0 24 24" style={{ width: '55px', height: '55px', stroke: '#28a745', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 style={{ fontSize: '2.8em', color: '#2c3e50', marginBottom: '20px', fontWeight: 700 }}>Thank You!</h1>
          <p style={{ fontSize: '1.2em', color: '#555', lineHeight: 1.8, marginBottom: '40px' }}>
            Thanks for your valuable time.<br />
            Our relationship manager will get in touch with you shortly.
          </p>

          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 45px',
              background: 'linear-gradient(135deg, #b4975a 0%, #9d8349 100%)',
              color: 'white',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.15em',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(180, 151, 90, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #9d8349 0%, #8a7340 100%)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(180, 151, 90, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #b4975a 0%, #9d8349 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(180, 151, 90, 0.3)';
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Return to Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: '#e0e0e0', padding: '50px 20px 30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            {/* Company Info */}
            <div>
                 {/* Footer Logo */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <img 
              src="img/taj-skyview-footer-logo.webp" 
              alt="Taj Skyview Residences" 
              style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
              onError={(e) => { 
                // Fallback if image not found
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <h3 style={{ color: '#b4975a', fontSize: '1.2em', marginBottom: '15px', fontWeight: 600 }}>Address</h3>
              <p style={{ color: '#c0c0c0', lineHeight: 1.8, fontSize: '0.95em' }}>
                New No. 33, Nelson Manickam Road,<br />
                Aminjikarai, Chennai - 29.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ color: '#b4975a', fontSize: '1.3em', marginBottom: '20px', fontWeight: 600 }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="/" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>HOME</a>
                <a href="/#amenities" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>AMENITIES</a>
                <a href="/#location" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>Location</a>
                <a href="/#overview" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>Residences</a>
                <a href="https://www.tajhotels.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>Taj Hotels</a>
                <a href="/#contact" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>Contact</a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 style={{ color: '#b4975a', fontSize: '1.3em', marginBottom: '20px', fontWeight: 600 }}>Contact</h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '15px' }}>
                <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: '#b4975a', fill: 'none', strokeWidth: 2, flexShrink: 0, marginTop: '3px' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+13653786652" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em' }}>+1 (365) 378-6652</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: '#b4975a', fill: 'none', strokeWidth: 2, flexShrink: 0, marginTop: '3px' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:contactus@tajskyviewresidences.co.in" style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.95em', wordBreak: 'break-word' }}>contactus@tajskyviewresidences.co.in</a>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '30px', borderTop: '1px solid #333', textAlign: 'center' }}>
            {/* Keywords */}
            <div style={{ color: '#666', fontSize: '0.85em', lineHeight: 1.6, marginBottom: '20px' }}>
              Taj Skyview Residences Chennai | Taj Sky View Residences | Taj Sky View Residences Chennai | Luxury 3 BHK Apartments Chennai | Luxury 4 BHK Apartments Chennai | Taj Apartments Chennai | Taj Skyview Luxury Homes | Taj Signature Living Chennai | Taj Skyview Residences
            </div>

            {/* Social Media */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px' }}>
              <a href="https://www.facebook.com/profile.php?id=61558281113281" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#2a2a2a', color: '#c0c0c0', transition: 'all 0.3s ease' }}>
                <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', fill: 'currentColor' }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/tajskyviewresidences" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#2a2a2a', color: '#c0c0c0', transition: 'all 0.3s ease' }}>
                <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', fill: 'currentColor' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/taj-sky-view-residences/" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#2a2a2a', color: '#c0c0c0', transition: 'all 0.3s ease' }}>
                <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', fill: 'currentColor' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p style={{ color: '#777', fontSize: '0.9em', marginTop: '20px' }}>
              &copy; 2026 Taj Skyview Residences. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </div>
  );
}

export default ThankYouPage;
