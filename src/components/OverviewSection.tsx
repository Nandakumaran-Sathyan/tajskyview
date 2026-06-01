interface OverviewSectionProps {
  openContactModal: () => void;
}

function OverviewSection({ openContactModal }: OverviewSectionProps) {
  return (
    <section className="bg_white" id="overview">
      <div className="container margin_80">
        <div className="row justify-content-between flex-lg-row-reverse align-items-center">
          <div className="col-lg-5">
            <div className="parallax_wrapper">
              <img src={import.meta.env.BASE_URL + "img/overview.webp"} alt="" width="526px" height="658px" className="img-fluid rounded-img" loading="lazy" />
              <div data-cue="slideInUp" className="img_over">
                <span data-jarallax-element="-30">
                  <img src={import.meta.env.BASE_URL + "img/overview2.webp"} alt="" width="526px" height="658px" className="rounded-img" loading="lazy" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="intro">
              <div className="title">
                <small>About us</small>
                <h2>Taj Skyview Residences </h2>
              </div>
              <p style={{ textAlign: 'justify' }}>
                Welcome to Taj Skyview Residences Aminjikarai, Chennai, the city’s most iconic address for luxury 3 BHK & 4 BHK Apartments and Sky Villa located on Nelson Manickam Road, opposite MGM Healthcare and behind Ampa Skyone Mall. Spanning 3.75 acres with 23 floors of premium living, this exclusive development offers a host of world-class amenities, including a 3500 sq. ft. club lounge, rooftop party hall, aqua gym, J wellness circle, and a 6500 sq. ft. fitness centre. Sports lovers can enjoy facilities like a professional squash court, tennis court, and an air-conditioned badminton court, while those seeking relaxation can unwind in rooftop cabanas, steam & sauna rooms, or the half Olympic-sized swimming pool.
              </p>
              <button className="appbtn gradient query-btn" onClick={typeof openContactModal === 'function' ? openContactModal : undefined}>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
