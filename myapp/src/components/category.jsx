import { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [image, setimage] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categoryimage/')
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
              src={`http://127.0.0.1:8000${s.image}`}
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