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
          overflow: "hidden",
          position: "relative"
        }}
      >
        {media.map((item, i) => (
          <div
            key={i}
            style={{
              display: i === index ? "block" : "none"
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
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            ) : (
              <img
                src={`https://api.yaasgents.com${item.file}`}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            )}
          </div>
        ))}

        {/* 🔥 FADE */}
        <div className={`fade-overlay ${indexChanging ? "active" : ""}`}></div>

        {/* 🔥 TEXT */}
        <div className="content">
          {media[index] && (
            <>
              <p className="stylish">{media[index].heading}</p>
              <Link to={media[index]?.link || "#"} className="homebutton">
                {media[index]?.button_text}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* STORY */}
      <div>
        {story.map((s, index) => (
          <div className="story" key={index}>
            <p className="story-sub">{s.first_heading}</p>
            <h3 className="story-title">{s.main_heading}</h3>
            <p className="story-desc">{s.paragraph}</p>
          </div>
        ))}
      </div>

      <div className="line"></div>

      <Category />

      <div className="line"></div>

      <Product />

      <div className="line"></div>

      <KanduraSlider />

      {/* WHATSAPP */}
      <div className="whatsapp">
        <button
          className="whatsapp_btn"
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