import { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/about/")
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  if (data.length === 0) return <div className="loading">Loading...</div>;

  return (
    <div className="about-page">
      <div className="about-intro">
        <span className="about-sub">{data[0].subtitle}</span>
        <h2 className="about-title">{data[0].title}</h2>
        <p className="about-desc">{data[0].description}</p>
      </div>

      <div className="line"></div>

      {data.slice(1).map((item, index) => {
        return (
          <div
            key={index}
            className={`about-section ${index % 2 === 0 ? 'left-img' : 'right-img'}`}
          >
            <div className="about-image">
              <img
                src={`https://api.yaasgents.com${item.image}`}
                alt={item.title}
              />
            </div>

            <div className="about-info">
              <span className="about-sub">{item.subtitle}</span>
              <h1>{item.title}</h1>
              <p>{item.description}</p>

              {item.shop_location && (
                <div className="shop-location">
                  <h3>Our Shop Location</h3>
                  <p>{item.shop_location}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

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
    </div>
  );
}

export default About;