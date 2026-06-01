import { useState } from "react";


function DisclaimerSection() {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="footer-bottom" id="footer-bottom" style={{
      background: `linear-gradient(rgba(0,0,0,0.5, rgba(0,0,0,0.5)), url('${import.meta.env.BASE_URL}img/footer-bg1.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      color: "#fff",
      padding: "40px 0"
    }}>
      <div className="container">
        <div className="row">
          <div className="dis text-center">
            <p className="rera-no mb-1">
              Project Rera: TN/Agent/0115/2023 dated 19.06.2023
            </p>
            {showMore && (
              <div className="text-left1 text-center moretext">
                <p className="btm-foot">
                 Disclaimer: This website is the official landing page of an Authorized Builder of Taj Sky View, a prestigious residential project developed by AMPA HOME BUILD. We are legally authorized to market and facilitate the sale of units in this development. All project information, visuals, pricing, and plans presented on this page are intended solely for informational purposes and are subject to change at the sole discretion of the developer, AMPA HOME BUILD. We strive to ensure the accuracy of the content provided. However, for the latest updates and official documentation, we encourage prospective buyers to verify details directly with us or the developer.

For further information or to confirm our authorized status, please contact us via the details provided on this page.
<br></br>
TN/Agent/0115/2023 | DATED 19.06.2023
                </p>
              </div>
            )}
            <h6
              className="moreless-button"
              style={{ fontSize: 14, color: "#fff", cursor: "pointer" }}
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "Read less" : "Read more"}
            </h6>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="disclaimer.html" style={{color: "#fff", textDecoration: "underline"}}>
                Disclaimer & Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisclaimerSection;
