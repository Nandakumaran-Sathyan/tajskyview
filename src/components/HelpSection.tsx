interface HelpSectionProps {
  openContactModal: () => void;
}

function HelpSection({ openContactModal }: HelpSectionProps) {
  return (
    <div
      className="more_enquire w-100 float-left py-6 bg-frwd-slas position-relative overflow-hidden location-wrapper location-container desk_view"
      style={{
        backgroundImage: "url('img/slider/banner1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <h3 className="text-capitalize">
                Still unsure about selecting the right home?
              </h3>
              <p className="sub_heading text-capitalize">
                Get answers to all your questions
              </p>
              <div className="about-btn">
                <button
                  className="query-btn appbtn gradient"
                  onClick={openContactModal}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSection;
