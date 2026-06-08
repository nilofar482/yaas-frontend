import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import Category from "./category";
import KanduraSlider from "./kandurasec";
import { Link } from "react-router-dom";

function Home() {
  const [media, setMedia] = useState([]);

  const [index, setIndex] = useState(0);
  const [indexChanging, setIndexChanging] = useState(false);

  const [story, setstory] = useState([]);


  // 🔥 FETCH MEDIA
  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/homemedia/")
      .then((res) => setMedia(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 CAROUSEL AUTO CHANGE
  useEffect(() => {
    if (media.length === 0) return;

    const interval = setInterval(() => {
      setIndexChanging(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % media.length);
        setIndexChanging(false);
      }, 500);

    }, 4000);

    return () => clearInterval(interval);
  }, [media]);

  // 🔥 FETCH STORY
  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/story_data/")
      .then((res) => setstory(res.data))
      .catch((err) => console.log(err));
  }, []); 

  return (
    <>
      <div className="hero-container">
        {media.map((item, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: i === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          >
            {item.type === "video" ? (
              <video
                src={`https://api.yaasgents.com${item.file}`}
                autoPlay
                muted
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            ) : (
              <img
                src={`https://api.yaasgents.com${item.file}`}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            )}
          </div>
        ))}

        {/* 🔥 BLACK FADE */}
        <div className={`fade-overlay ${indexChanging ? "active" : ""}`}></div>

        {/* 🔥 DYNAMIC TEXT */}
        <div className="content">
          {media[index] && (
            <>
              <p className="stylish">{media[index].heading}</p>
              <Link to={media[index]?.link || "#"} className="homebutton">{media[index]?.button_text}</Link>
            </>
          )}
        </div>
      </div>

      <div className="features-container">

  <div className="feature-item">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 4v4h-7z" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="18.5" r="2" />
    </svg>

    <div>
      <h3>Free Shipping</h3>
      <p>For order above AED200</p>
    </div>
  </div>

  <div className="feature-item">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 11h11l2-8H7" />
    </svg>

    <div>
      <h3>Cash on Delivery</h3>
      <p>For selected products only</p>
    </div>
  </div>

  <div className="feature-item">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>

    <div>
      <h3>Money Back Guarantee</h3>
      <p>Refund within 7 days</p>
    </div>
  </div>

  <div className="feature-item">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72l.34 2.27a2 2 0 0 1-.57 1.73l-1.2 1.2a16 16 0 0 0 6.37 6.37l1.2-1.2a2 2 0 0 1 1.73-.57l2.27.34A2 2 0 0 1 22 16.92z" />
    </svg>

    <div>
      <h3>24/7 Support</h3>
      <p>Answer all your questions</p>
    </div>
  </div>

</div>

      <Product />

      <div>
        {story.map((s, index) => (
          <div className="story" key={index}>
            <p className="story-sub">{s.first_heading}</p>
            <h3 className="story-title">{s.main_heading}</h3>
            <p className="story-desc">{s.paragraph}</p>
          </div>
        ))}
      </div>


      {/* <div className="secmain">
        <div className="secound">
          <p className="sec-sub">Elegance for the Whole Family</p>
          <h2 className="sec-title">Ramadan 2026 Collection</h2>
          <p className="sec-brand">by Prestige</p>
          <p className="sec-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button className="sec-btn">Shop Now</button>
        </div>
      </div> */}

      <div className="line"></div>

      <Category />

      <div className="line"></div>


      <div className="line"></div>

      <KanduraSlider/>

      <div className="whatsapp">
        <button className="whatsapp_btn"
        onClick={() => {
        const message = encodeURIComponent(
        "Hi, I am interested in your product"
      );

      window.open(
        `https://wa.me/971568160153?text=${message}`,
        "_blank"
      );
    }}
    >
    <img src="/whatsapp.png" alt="" />
    </button>
    </div>
    </>
    
  );
}

export default Home;