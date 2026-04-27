import { useState, useEffect } from 'react';
import axios from 'axios';

function KanduraSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [kandura, aboutkandura] = useState([]);

  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/aboutkandura/")
      .then((res) => aboutkandura(res.data))
      .catch((err) => console.log(err));
  }, []);

  const BASE_URL = "https://api.yaasgents.com";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/kanduraslider/`)
      .then(res => setSlides(res.data))
      .catch(err => console.error("Slider data fetch error:", err));
  }, []);

  const nextSlide = () => {
    setVideoLoaded(false); // reset when slide changes
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setVideoLoaded(false);
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  if (slides.length === 0) {
    return <div className="loading-state">Loading Slider...</div>;
  }

  const currentProduct = slides[currentIndex];

  return (
    <div>
      <div className="split-wrapper">
        <p className='top-sales'>Premium Kandura Collection</p>

        {/* LEFT SIDE: VIDEO */}
        <div className="left-video-side">

          {/* 🔥 Show loader until video loads */}
          {!videoLoaded && (
            <div className="video-loader">Loading video...</div>
          )}

          <video
            key={currentProduct.bg_video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"   // ✅ FIXED
            className="main-video"
            onLoadedData={() => setVideoLoaded(true)}
            style={{ display: videoLoaded ? "block" : "none" }}
          >
            <source
              src={`${BASE_URL}${currentProduct.bg_video}`}
              type="video/mp4"
            />
          </video>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-slider-side">

          <button className="nav-arrow prev" onClick={prevSlide}>
            &#10229;
          </button>

          <button className="nav-arrow next" onClick={nextSlide}>
            &#10230;
          </button>

          <div className="slider-content">

            <div className="product-display">
              <img
                src={`${BASE_URL}${currentProduct.product_image}`}
                alt={currentProduct.title}
                className="slide-image-fade"
                key={currentIndex}
              />
            </div>

            <div className="text-overlay">
              <h2 className="p-title">{currentProduct.title}</h2>

              <div className="color-row">
                {currentProduct.colors &&
                  currentProduct.colors.split(',').map((color, i) => {
                    const cleanColor = color.trim();
                    if (!cleanColor.startsWith('#')) return null;

                    return (
                      <span
                        key={i}
                        className="color-dot"
                        style={{ backgroundColor: cleanColor }}
                      ></span>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="indicator-container">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`indicator-line ${currentIndex === i ? 'active' : ''}`}
                onClick={() => {
                  setVideoLoaded(false);
                  setCurrentIndex(i);
                }}
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