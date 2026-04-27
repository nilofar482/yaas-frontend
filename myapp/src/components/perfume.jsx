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

                {/* ✅ IMAGE + HOVER */}
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

                {/* ✅ SVG ICON (same as sandles) */}
                <div className="carticon">
                  <button onClick={() => setSelectedProduct(s)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                  </button>
                </div>

                {/* NAME */}
                <div className="product_name">{s.name}</div>

                {/* PRICE */}
                <div className="price">AED {s.price}</div>

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