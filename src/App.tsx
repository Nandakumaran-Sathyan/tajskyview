import LocationSection from './components/LocationSection';
import DisclaimerSection from './components/DisclaimerSection';
import HelpSection from './components/HelpSection';
import ContactUsSection from './components/ContactUsSection';
import ContactModal from './components/ContactModal';
import MobileActionButtons from './components/MobileActionButtons';
import DesktopActionButtons from './components/DesktopActionButtons';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import HighlightsSection from './components/HighlightsSection';
import PriceSection from './components/PriceSection';
import AmenitiesSection from './components/AmenitiesSection';
import FloorPlansSection from './components/FloorPlansSection';
import GallerySection from './components/GallerySection';
import ThankYouPage from './components/ThankYouPage';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function HomePage() {
  const [showContactModal, setShowContactModal] = useState(false);

  // Pass this handler to all relevant buttons
  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  // Auto-open modal after 2 seconds (only once per session)
  useEffect(() => {
    // Check if modal was already shown in this session
    const modalShown = sessionStorage.getItem('contactModalShown');
    
    if (!modalShown) {
      const timer = setTimeout(() => {
        setShowContactModal(true);
        sessionStorage.setItem('contactModalShown', 'true');
      }, 2000); // 2 seconds

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="bg_white min-h-screen">
      <Navbar />
      <HeroSection />
      {/* OverviewSection with modal handler */}
      <OverviewSection openContactModal={openContactModal} />
      <HighlightsSection openContactModal={openContactModal} />
      <PriceSection openContactModal={openContactModal} />
      <AmenitiesSection openContactModal={openContactModal} />
      <FloorPlansSection openContactModal={openContactModal} />
      <GallerySection openContactModal={openContactModal} />
      <HelpSection openContactModal={openContactModal} />
      <LocationSection />
      <ContactUsSection />
      <DisclaimerSection />
      <ContactModal isOpen={showContactModal} onClose={closeContactModal} />
      <DesktopActionButtons />
      <MobileActionButtons onEnquireClick={openContactModal} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
