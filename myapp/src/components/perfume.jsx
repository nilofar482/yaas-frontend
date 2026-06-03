import axios from "axios";
import { useEffect, useState, useRef } from "react";
import PopupCart from "./popupcart";

function Perfumes() {
  const [product, setproduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    axios
      .get("https://api.yaasgents.com/api/product_data/?category=perfumes&trending=true")
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div>
      <div className="scroll_wrapper">

        <button className="scroll_btn left" onClick={scrollLeft}>‹</button>

        <div className="product_list" ref={scrollRef}>
          {product.map((s) => {

            const totalStock = s.colors?.reduce((total, color) => {
              return total + (color.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0);
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

                {/* SOLD OUT */}
                {totalStock === 0 && (
                  <div className="sold_out">Out of Stock</div>
                )}


                <div className="product_name">{s.name}</div>

                <div className="price">AED {s.price}</div>
                <div className="carticon">
                  <button onClick={() => setSelectedProduct(s)}>
                    buy now
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <button className="scroll_btn right" onClick={scrollRight}>›</button>
      </div>

      {selectedProduct && (
        <PopupCart
          close={() => setSelectedProduct(null)}
          product={{ ...selectedProduct, category: "perfumes" }}
        />
      )}
    </div>
  );
}

export default Perfumes;