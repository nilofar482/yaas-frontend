import { useState, useEffect } from 'react';
import axios from 'axios';

function KanduraSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [kandura,aboutkandura]=useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/aboutkandura/")
      .then((res) => aboutkandura(res.data))
      .catch((err) => console.log(err));
  }, []); 
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/kanduraslider/`)
      .then(res => {
        setSlides(res.data);
      })
      .catch(err => {
        console.error("Slider data fetch error:", err);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // Loading state
  if (slides.length === 0) {
    return <div className="loading-state">Loading Slider...</div>;
  }

  const currentProduct = slides[currentIndex];
  

  return (
    <div>
    <div className="split-wrapper">

      {/* LEFT SIDE: VIDEO */}
      <div className="left-video-side">
        <video
          key={currentProduct.bg_video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="main-video"
        >
          <source
            src={`${BASE_URL}${currentProduct.bg_video}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* RIGHT SIDE: SLIDER */}
      <div className="right-slider-side">

        {/* NAV BUTTONS */}
        <button
          className="nav-arrow prev"
          onClick={prevSlide}
          aria-label="Previous"
        >
          &#10229;
        </button>

        <button
          className="nav-arrow next"
          onClick={nextSlide}
          aria-label="Next"
        >
          &#10230;
        </button>

        <div className="slider-content">

          {/* IMAGE */}
          <div className="product-display">
            <img
              src={`${BASE_URL}${currentProduct.product_image}`}
              alt={currentProduct.title}
              className="slide-image-fade"
              key={currentIndex}
            />
          </div>

          {/* TEXT OVERLAY */}
          <div className="text-overlay">
            <h2 className="p-title">{currentProduct.title}</h2>

            {/* COLORS */}
            <div className="color-row">
              {currentProduct.colors &&
                currentProduct.colors.split(',').map((color, i) => {
                  const cleanColor = color.trim();

                  // Skip invalid colors
                  if (!cleanColor.startsWith('#')) return null;

                  return (
                    <span
                      key={i}
                      className="color-dot"
                      style={{ backgroundColor: cleanColor }}
                      title={cleanColor}
                    ></span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* INDICATORS */}
        <div className="indicator-container">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`indicator-line ${
                currentIndex === i ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(i)}
            ></div>
          ))}
        </div>

      </div>
    </div>
    <div>
      {kandura.map((s, index) => (
          <div className="story" key={index}>
            <p className="story-sub">{s.first_heading}</p>
            <h3 className="story-title">{s.main_heading}</h3>
            <p className="story-desc">{s.paragraph}</p>
            <p className='visit_p'>Visit Our Shop</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanduraSlider;