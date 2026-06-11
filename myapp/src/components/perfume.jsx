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
  {s.colors?.[0]?.images?.[0]?.image ? (
    <img
      src={`https://api.yaasgents.com${s.colors[0].images[0].image}`}
      alt={s.name}
    />
  ) : (
    <p>No Image</p>
  )}
</div>

            {totalStock === 0 && (
              <div className="sold_out">Out of Stock</div>
            )}

            <div className="product_name">{s.name}</div>
            <div className="price">
              {s.offer_price ? (
                <>
                <span className="old-price">AED {s.price}</span>
                <span className="offer-price">AED {s.offer_price}</span>
                </>
                ) : (
                <>AED {s.price}</>
                )}
                </div>

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