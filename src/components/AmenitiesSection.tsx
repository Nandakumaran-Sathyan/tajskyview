interface AmenitiesSectionProps {
  openContactModal: () => void;
}

function AmenitiesSection({ openContactModal }: AmenitiesSectionProps) {
  return (
    <div className="bg_white" id="amenities">
      <div className="container margin_80">
        <div className="title title-amenities text-center amenities-section" id="amenities">
          <small>Amenities</small>
          <h2>Amenities that Define Excellence</h2>
        </div>
        <div className="row">
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/barbeque-deck.webp"}
                alt="Barbeque Deck"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Barbeque Deck</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/club-lounge.webp"}
                alt="Club Lounge"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Club Lounge</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/Guest-lobby.webp"}
                alt="Grand Lobby"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Grand Lobby</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/karaokeroom.webp"}
                alt="Karaoke Room"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Karaoke Room</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/rooftop-party-hall.webp"}
                alt="Rooftop Party Hall"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Rooftop Party Hall</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/theatre.webp"}
                alt="Taj Spectre Theatre"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Taj Spectre Theatre</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/swimming pool.jpg"}
                alt="Swimming Pool"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Swimming Pool</h5>
            </div>
          </div>
          <div className="col-6 col-xl-3 col-md-6 col-sm-6 mb-3">
            <div className="box_facilities">
              <img
                className="icon-img"
                src={import.meta.env.BASE_URL + "img/amenities/tenniscourt.jpg"}
                alt="Tennis Court"
                width="266"
                height="266"
                loading="lazy"
              />
              <h5>Tennis Court</h5>
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              className="query-btn appbtn gradient"
              onClick={typeof openContactModal === 'function' ? openContactModal : undefined}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmenitiesSection;
