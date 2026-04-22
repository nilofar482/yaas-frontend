import { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [image, setimage] = useState([]);

  useEffect(() => {
    axios.get('https://api.yaasgents.com/api/categoryimage/')
      .then((res) => {
        setimage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="category_container">
      <div className="heading">Our Collections</div>
      <div className="category_main">
        {image.map((s, index) => (
          <div className="first_category" key={index}>
            <img
              src={`https://api.yaasgents.com${s.image}`}
              alt={s.image_title}
            />
            <div className="category_text">
              {s.image_title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;