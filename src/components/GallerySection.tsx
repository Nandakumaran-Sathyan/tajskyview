interface GallerySectionProps {
  openContactModal: () => void;
}

function GallerySection({ openContactModal }: GallerySectionProps) {
  return (
    <div className="bg_white" id="gallery">
      <div className="container margin_80">
        <div className="title col-12 text-center mb-5">
          <small>Luxury Experience</small>
          <h2 className="mb-0">Gallery</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-4">
            <a href={import.meta.env.BASE_URL + "img/gallery/1.webp"} className="with-caption image-link" title="Gallery Images">
              <img src={import.meta.env.BASE_URL + "img/gallery/1.webp"} alt="Gallery 1" className="img-fluid" width="1125" height="750" loading="lazy" />
            </a>
          </div>
          <div className="col-md-3 mb-4">
            <a href={import.meta.env.BASE_URL + "img/gallery/2.webp"} className="with-caption image-link" title="Gallery Images">
              <img src={import.meta.env.BASE_URL + "img/gallery/2.webp"} alt="Gallery 2" className="img-fluid" width="1125" height="750" loading="lazy" />
            </a>
          </div>
          <div className="col-md-3 mb-4">
            <a href={import.meta.env.BASE_URL + "img/gallery/3.webp"} className="with-caption image-link" title="Gallery Images">
              <img src={import.meta.env.BASE_URL + "img/gallery/3.webp"} alt="Gallery 3" className="img-fluid" width="1125" height="750" loading="lazy" />
            </a>
          </div>
          <div className="col-md-3 mb-4">
            <a href={import.meta.env.BASE_URL + "img/gallery/4.webp"} className="with-caption image-link" title="Gallery Images">
              <img src={import.meta.env.BASE_URL + "img/gallery/4.webp"} alt="Gallery 4" className="img-fluid" width="1125" height="750" loading="lazy" />
            </a>
          </div>
          <div className="col-12 text-center">
            <button className="query-btn appbtn gradient" onClick={typeof openContactModal === 'function' ? openContactModal : undefined}>
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GallerySection;
