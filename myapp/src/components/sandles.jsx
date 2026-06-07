import axios from "axios";
import { useEffect, useState } from "react";
// import PopupCart from "./popupcart";
import { useNavigate } from "react-router-dom";

function Sandles() {
  const [product, setproduct] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios
      .get(
        "https://api.yaasgents.com/api/product_data/?category=sandles&trending=true"
      )
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
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

              <div className="product_name">
                {s.name} - {s.colors?.[0]?.color_name || ""}
              </div>

              <div className="price">
                {s.offer_price ? (
                  <>
                  <span className="old-price">
                    AED {s.price}
                  </span>

                  <span className="offer-price">
                    AED {s.offer_price}
                  </span>
                  </>
                ) : (
                <span className="offer-price">
                  AED {s.price}
                </span>
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

      {/* <div className="shop_button">
        <Link to='allsandle'><button>Shop Sandles</button></Link>
      </div> */}

      {/* {selectedProduct && (
        <PopupCart
          close={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )} */}
    </div>
  );
}

export default Sandles;