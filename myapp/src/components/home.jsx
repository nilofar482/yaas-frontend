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
      {/* 🔥 CAROUSEL */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          position: "relative"
        }}
      >
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

      <Product />

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