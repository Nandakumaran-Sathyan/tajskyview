interface PriceSectionProps {
  openContactModal: () => void;
}

function PriceSection({ openContactModal }: PriceSectionProps) {
  return (
    <section
      id="price"
      className="price-section margin_80 relative"
      style={{
        backgroundImage:
          `linear-gradient(180deg,#fffdf6,transparent),url('${import.meta.env.BASE_URL}img/price-shape.webp')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="title col-12 text-center mb-5">
          <small className="block text-lg text-yellow-700 font-semibold mb-2" data-cue="slideInUp">
            Price List
          </small>
          <h2 className="text-3xl md:text-4xl font-bold" data-cue="slideInUp" data-delay="100">
            Unlock the Door to Affordable Luxury
          </h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {/* 3 BHK */}
          <div className="w-full md:w-1/3 p-2 mb-3">
            <div className="price-box bg-[#F2F2F2] rounded-2xl shadow-lg transition-all duration-800 h-full flex flex-col justify-between hover:bg-[#e2dfdf] px-5 py-12">
              <div className="typology  w-fit mx-auto px-4 py-2 rounded-lg text-base font-semibold mb-4">
                3 BHK Apartments
              </div>
              <div className="price-details text-center pt-5 text-2xl font-bold">
                <span className="rupee text-xl">₹</span> 8.37 Cr*
              </div>
              <div className="size-detail flex justify-around mt-4 mb-2 pb-2 text-base font-medium border-b border-dashed">
                <span>Carpet Area</span>
                <span>On Request</span>
              </div>
              <div className="micro-btn text-center pt-2">
                <button
                  className="query-btn appbtn gradient px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 shadow"
                  onClick={typeof openContactModal === 'function' ? openContactModal : undefined}
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
          {/* 4 BHK */}
          <div className="w-full md:w-1/3 p-2 mb-3">
            <div className="price-box bg-[#F2F2F2] rounded-2xl shadow-lg transition-all duration-800 h-full flex flex-col justify-between hover:bg-[#e2dfdf] px-5 py-12">
              <div className="typology w-fit mx-auto px-4 py-2 rounded-lg text-base font-semibold mb-4">
                4 BHK Apartments
              </div>
              <div className="price-details text-center pt-5 text-2xl font-bold">
                <span className="rupee text-xl">₹</span> On Request
              </div>
              <div className="size-detail flex justify-around mt-4 mb-2 pb-2 text-base font-medium border-b border-dashed">
                <span>Carpet Area</span>
                <span>On Request</span>
              </div>
              <div className="micro-btn text-center pt-2">
                <button
                  className="query-btn appbtn gradient px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 shadow"
                  onClick={typeof openContactModal === 'function' ? openContactModal : undefined}
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
          {/* Skyvilla */}
          <div className="w-full md:w-1/3 p-2 mb-3">
            <div className="price-box bg-[#F2F2F2] rounded-2xl shadow-lg transition-all duration-800 h-full flex flex-col justify-between hover:bg-[#e2dfdf] px-5 py-12">
              <div className="typology w-fit mx-auto px-4 py-2 rounded-lg text-base font-semibold mb-4">
                Skyvilla
              </div>
              <div className="price-details text-center pt-5 text-2xl font-bold">
                <span className="rupee text-xl">₹</span> On Request
              </div>
              <div className="size-detail flex justify-around mt-4 mb-2 pb-2 text-base font-medium border-b border-dashed">
                <span>Carpet Area</span>
                <span>On Request</span>
              </div>
              <div className="micro-btn text-center pt-2">
                <button
                  className="query-btn appbtn gradient px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 shadow"
                  onClick={typeof openContactModal === 'function' ? openContactModal : undefined}
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceSection;
