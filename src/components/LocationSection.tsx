import React from "react";

function LocationSection() {
  return (
    <div className="location" id="location" style={{ backgroundColor: "#f2f2f2", padding: "80px 0" }}>
      <div className="container margin_80">
        <div className="row justify-content-center d-flex align-items-center">
          <div className="col-lg-6">
            <div className="title">
              <small>Location Advantages</small>
              <h2>Discover Your Perfect Place in the Perfect Location</h2>
              <div className="high-details">
                <span>
                  <img className="location-icon" src="img/amenities/location.webp" alt="" width="20" height="20" loading="lazy" />
                </span>
                <p>MGM Healthcare : 230 m</p>
              </div>
              <div className="high-details">
                <span>
                  <img className="location-icon" src="img/amenities/location.webp" alt="" width="20" height="20" loading="lazy" />
                </span>
                <p>MCC Public School : 2.3 km</p>
              </div>
              <div className="high-details">
                <span>
                  <img className="location-icon" src="img/amenities/location.webp" alt="" width="20" height="20" loading="lazy" />
                </span>
                <p>SRM University : 4.7 km</p>
              </div>
              <div className="high-details">
                <span>
                  <img className="location-icon" src="img/amenities/location.webp" alt="" width="20" height="20" loading="lazy" />
                </span>
                <p>Nungambakkam Railway Station : 1.4 Km</p>
              </div>
              <div className="high-details">
                <span>
                  <img className="location-icon" src="img/amenities/location.webp" alt="" width="20" height="20" loading="lazy" />
                </span>
                <p>Chennai International Airport : 13.5 km</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="location-image">
              <a href="img/location-map.webp" className="with-caption image-link" title="Location">
                <img src="img/location-map-SM.webp" alt="Floor Plan" className="img-fluid" loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationSection;
