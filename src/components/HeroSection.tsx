import BookVisitForm from './BookVisitForm';
import MobileBookVisitForm from './MobileBookVisitForm';

function HeroSection() {
  return (
    <main>
      <div id="carousel-home">
        <div className="container banner-text">
          <div className="row justify-content-center justify-content-md-start">
            <div className="col-lg-6 static">
              <div className="slide-text white">
                <small className="owl-slide-animated owl-slide-title">At Aminjikarai, Chennai</small>
                <h2 className="owl-slide-animated owl-slide-title-2 banner-head">Taj Skyview Residences </h2>
                <p className="banner-high mb-1 d-flex align-items-center"><img className="check-icon me-2" src={import.meta.env.BASE_URL + "img/check-mark.webp"} alt="" width="20px" height="16px" />A majestic blend of a 5-star Taj Hotel</p>
                <p className="banner-high mb-1 d-flex align-items-center"><img className="check-icon me-2" src={import.meta.env.BASE_URL + "img/check-mark.webp"} alt="" width="16px" height="16px" />123 Taj-branded residences</p>
                <p className="banner-high mb-1 d-flex align-items-center"><img className="check-icon me-2" src={import.meta.env.BASE_URL + "img/check-mark.webp"} alt="" width="16px" height="16px" />36 boutique office spaces</p>
                <p className="banner-high mb-1 d-flex align-items-center"><img className="check-icon me-2" src={import.meta.env.BASE_URL + "img/check-mark.webp"} alt="" width="16px" height="16px" />The prestigious Ampa Sishya School</p>
                <div className="banner-typology">
                  <span className="banner-typology-detail">3, 4 BHK Residences & Sky Villas</span>
                </div>
                <div className="banner-price ">
                  <span className="banner-price-detail appbtn gradient">Starting Price : ₹ <span>8.37 Cr*</span></span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <BookVisitForm />
            </div>
          </div>
        </div>
        <div id="demo" className="banner-dule carousel slide carousel-fade" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" className="active"></li>
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={import.meta.env.BASE_URL + "img/slider/banner1.webp"} width="1902px" height="923px" alt="Banner 1 - Desktop" className="img-fluid destop-show" loading="eager" />
              <img src={import.meta.env.BASE_URL + "img/slider/banner1-sm.webp"} width="390px" height="500px" alt="Banner 1 - Mobile" className="img-fluid mobile-show" loading="eager" />
            </div>
          </div>
          {/* Carousel arrows removed as requested */}
        </div>
        <div className="header_rera_no"></div>
      </div>
      <MobileBookVisitForm />
    </main>
  );
}

export default HeroSection;
