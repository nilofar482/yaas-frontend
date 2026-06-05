import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Perfumes() {
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.yaasgents.com/api/product_data/?category=perfumes&trending=true"
      )
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="product_list">
      {product.map((s) => {
        const totalStock = s.colors?.reduce((total, color) => {
          return (
            total +
            (color.sizes?.reduce(
              (sum, size) => sum + (size.stock || 0),
              0
            ) || 0)
          );
        }, 0);

        return (
          <div key={s.id} className="product-card1">
            <div className="img-box">
              {s.colors && s.colors.length > 0 ? (
                <>
                  <img
                    src={`https://api.yaasgents.com${s.colors[0].image1}`}
                    alt={s.name}
                  />
                  {s.colors[0].image2 && (
                    <img
                      src={`https://api.yaasgents.com${s.colors[0].image2}`}
                      alt={s.name}
                      className="hover-img"
                    />
                  )}
                </>
              ) : (
                <p>No Image</p>
              )}
            </div>

            {totalStock === 0 && (
              <div className="sold_out">Out of Stock</div>
            )}

            <div className="product_name">{s.name}</div>
            <div className="price">AED {s.price}</div>

            {s.description && (
              <div className="product-description">
                <h3>Description</h3>
                <p>{s.description}</p>
              </div>
            )}

            {s.features?.length > 0 && (
              <div className="product-features">
                <h3>Features</h3>

                {s.features.map((item) => (
                  <div key={item.id} className="feature-item">
                    ✓ {item.feature}
                  </div>
                ))}
              </div>
            )}

            <div className="carticon">
              <button onClick={() => navigate(`/product/${s.id}`)}>
                view product
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Perfumes;