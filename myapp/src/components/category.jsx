import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Category() {
  const [image, setimage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/categoryimage/")
      .then((res) => {
        setimage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategory = (category) => {
    const name = category.toLowerCase();

    if (name.includes("sand")) {
      navigate("/allsandle");
    } else if (name.includes("perfume")) {
      navigate("/allperfume");
    } else if (name.includes("kandura")) {
      navigate("/kandura");
    }
  };

  return (
    <div className="category_container">
      <div className="cat_heading">Our Collections</div>

      <div className="category_main">
        {image.map((s, index) => (
          <div className="first_category" key={index}>
            <img
              src={`https://api.yaasgents.com${s.image}`}
              alt={s.image_title}
            />

            <div className="category_overlay"></div>

            <div className="category_text">
              <span className="category_name">
                {s.image_title}
              </span>

              <span className="category_sub">
                Crafted with elegance
              </span>

              <span className="category_shop">
                <button onClick={() => handleCategory(s.image_title)}>
                  Shop Now
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;