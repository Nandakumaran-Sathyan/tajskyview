import React, { useEffect, useRef, useState } from "react";

function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;
      if (window.scrollY > 10) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false); // Close menu after navigation on mobile
    }
  };

  // Toggle menu open/close
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  return (
    <header ref={headerRef} className="fixed_header menu_v1 submenu_version">
      <div className={`layer${menuOpen ? " layer-is-visible" : ""}`}></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-2 col-2 d-flex align-items-center">
            <a href="#" className="logo logo-white">
              <img src={import.meta.env.BASE_URL + "Sky View Hotels and Residences_page-0001 (1).webp"} alt="Taj Skyview Logo" className="img-fluid" width="138px" height="72px" />
            </a>
          </div>
          <div className="col-md-10 col-10">
            <div className={`main-menu${menuOpen ? " show" : ""}`}>
              <a href="#" className="closebt open_close_menu" style={{ fontSize: 28 }} onClick={handleMenuToggle}>&#x292B;</a>
              <div className="logo_panel">
                <img src={import.meta.env.BASE_URL + "Sky View Hotels and Residences_page-0001 (1).webp"} width="300px" height="150px" alt="" className="img-fluid" />
              </div>
              <nav id="mainNav">
                <ul>
                  <li className="my-custom"><a href="#" className="nav-link-custom">Home</a></li>
                  <li><a href="#overview" className="nav-link-custom my-custom" onClick={handleNavClick}>Overview</a></li>
                  <li><a href="#highlights" className="nav-link-custom my-custom" onClick={handleNavClick}>Highlights</a></li>
                  <li><a href="#price" className="nav-link-custom my-custom" onClick={handleNavClick}>Price</a></li>
                  <li><a href="#amenities" className="nav-link-custom my-custom" onClick={handleNavClick}>Amenities</a></li>
                  <li><a href="#floor-plans" className="nav-link-custom my-custom" onClick={handleNavClick}>Floor Plans</a></li>
                  <li><a href="#gallery" className="nav-link-custom my-custom" onClick={handleNavClick}>Gallery</a></li>
                  <li><a href="#location" className="nav-link-custom my-custom" onClick={handleNavClick}>Location</a></li>
                  <li><a href="tel:+919952012346" className="head-call appbtn gradient">+91 9952012346</a></li>
                  {/* PT logo removed as requested */}
                </ul>
              </nav>
            </div>
            <div className="hamburger_2 open_close_menu float-end" onClick={handleMenuToggle}>
              <div className="hamburger__box">
                <div className="hamburger__inner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
