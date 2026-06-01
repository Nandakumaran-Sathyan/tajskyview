interface FloorPlansSectionProps {
  openContactModal: () => void;
}

function FloorPlansSection({ openContactModal }: FloorPlansSectionProps) {
  return (
    <div className="floor-section" id="floor-plans">
      <div className="container margin_80">
        <div className="title text-center mb-5">
          <small data-cue="slideInUp">Floor Plans</small>
          <h2 data-cue="slideInUp" data-delay="100">Spacious & Thoughtfully Designed Floor Plans</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="floor-img position-relative">
              <img src={import.meta.env.BASE_URL + "img/floor-plans/floorplan-min-5.webp"} alt="3 BHK Floor Plan" className="img-fluid rounded blur-sm" loading="lazy" />
              <h4>3 BHK Residences</h4>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="floor-img position-relative">
              <img src={import.meta.env.BASE_URL + "img/floor-plans/floorplan-min-4.webp"} alt="4 BHK Floor Plan" className="img-fluid rounded blur-sm" loading="lazy" />
              <h4>4 BHK Residences</h4>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="floor-img position-relative">
              <img src={import.meta.env.BASE_URL + "img/floor-plans/floorplan-min-4.webp"} alt="Sky Villa Floor Plan" className="img-fluid rounded blur-sm" loading="lazy" />
              <h4>Sky Villas</h4>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="query-btn appbtn gradient" onClick={openContactModal}>Download All Floor Plans</button>
        </div>
      </div>
    </div>
  );
}

export default FloorPlansSection;
