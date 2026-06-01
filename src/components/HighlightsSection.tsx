interface HighlightsSectionProps {
  openContactModal: () => void;
}

function HighlightsSection({ openContactModal }: HighlightsSectionProps) {
  return (
    <div className="bg_white" id="highlights">
      <div className="container margin_80">
        <div className="row justify-content-between d-flex align-items-center">
          <div className="col-lg-6">
            <div className="pinned-image rounded_container pinned-image--small mb-4">
              <div className="pinned-image__container">
                <img src={import.meta.env.BASE_URL + "img/highlights.webp"} alt="Highlights" width="636px" height="317px" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="title">
              <small data-cue="slideInUp">Highlights </small>
              <h2 data-cue="slideInUp" data-delay="100">Discover the Finest Features and Finishes</h2>
              <div className="high-details">
                <span><img className="icon-high" src={import.meta.env.BASE_URL + "img/icon.webp"} alt="icon" loading="lazy" /></span>
                <p>The trusted Taj brand ensures the highest standards of quality, service, and hospitality.</p>
              </div>
              <div className="high-details">
                <span><img className="icon-high" src={import.meta.env.BASE_URL + "img/icon.webp"} alt="icon" loading="lazy" /></span>
                <p>Taj Skyview Residences is Chennai's most coveted address, delivering a unique living experience.</p>
              </div>
              <div className="high-details">
                <span><img className="icon-high" src={import.meta.env.BASE_URL + "img/icon.webp"} alt="icon" loading="lazy" /></span>
                <p>Luxury 3, 4 BHK Residences & Sky Villas in Chennai with premium finishes and world-class specifications</p>
              </div>
              <div className="high-details">
                <span><img className="icon-high" src={import.meta.env.BASE_URL + "img/icon.webp"} alt="icon" loading="lazy" /></span>
                <p>Taj Sky View Residences Chennai is designed for those who want to live above the ordinary - literally and figuratively.</p>
              </div>
            </div>
            <div>
              <button className="query-btn appbtn gradient" onClick={typeof openContactModal === 'function' ? openContactModal : undefined}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightsSection;
