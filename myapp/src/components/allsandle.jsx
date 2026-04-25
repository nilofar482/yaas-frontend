import axios from "axios";
import { useEffect, useState } from "react";
import PopupCart from "./popupcart";

function Allsandle() {
  const [product, setproduct] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSort, setShowSort] = useState(false);

  const [minPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    let url = `https://api.yaasgents.com/api/product_list/?category=sandles`;

    if (minPrice) url += `&min_price=${minPrice}`;
    if (maxPrice) url += `&max_price=${maxPrice}`;
    if (selectedColor) url += `&color=${selectedColor}`;
    if (selectedSize) url += `&size=${selectedSize}`;

    axios.get(url)
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  }, [minPrice, maxPrice, selectedColor, selectedSize]);

  useEffect(() => {
    axios.get("https://api.yaasgents.com/api/product_list/?category=sandles")
      .then((res) => {
        const allColors = res.data.flatMap(p =>
          p.colors ? p.colors.map(c => c.color_name) : []
        );
        setColors([...new Set(allColors)]);

        const allSizes = res.data.flatMap(p =>
          p.colors
            ? p.colors.flatMap(c =>
                c.sizes ? c.sizes.map(s => s.size) : []
              )
            : []
        );
        const uniqueSizes = [...new Set(allSizes)];
        setSizes(uniqueSizes.sort((a, b) => a - b));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSort = (type) => {
    let url = `https://api.yaasgents.com/api/product_list/?category=sandles&sort=${type}`;

    if (minPrice) url += `&min_price=${minPrice}`;
    if (maxPrice) url += `&max_price=${maxPrice}`;
    if (selectedColor) url += `&color=${selectedColor}`;
    if (selectedSize) url += `&size=${selectedSize}`;

    axios.get(url)
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));

    setShowSort(false);
  };

  return (
    <div>
      <div className="page_title">
        <p>Sandles</p>
      </div>

      <div className="sort_by">
        <div className="sortby_first"></div>
        <div><p>Products</p></div>

        <div className="sort_main" onClick={() => setShowSort(!showSort)}>
          <p>Sort by</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </div>

        {showSort && (
          <div className="sort_dropdown">
            <p onClick={() => handleSort("low")}>Price: Low to High</p>
            <p onClick={() => handleSort("high")}>Price: High to Low</p>
            <p onClick={() => handleSort("az")}>A-Z</p>
            <p onClick={() => handleSort("za")}>Z-A</p>
          </div>
        )}
      </div>

      <div className="filter">
        <div className="filter_main">

          <h3>Price</h3>
          <div className="slider_container">
            <div className="price_labels">
              <span>AED {minPrice}</span>
              <span>AED {maxPrice}</span>
            </div>

            <input type="range" min="0" max="500" value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > minPrice) setMaxPrice(value);
              }}
              className="slider"
            />
          </div>

          <h3>Color</h3>
          {colors.map((c) => (
            <p
              key={c}
              onClick={() => setSelectedColor(c)}
              style={{
                color: selectedColor === c ? "red" : "black",
                cursor: "pointer"
              }}
            >
              {c}
            </p>
          ))}

          <h3>Size</h3>
          {sizes.map((s) => (
            <p
              key={s}
              onClick={() => setSelectedSize(s)}
              style={{
                color: selectedSize === s ? "red" : "black",
                cursor: "pointer"
              }}
            >
              {s}
            </p>
          ))}

        </div>

        <div className="product_list2">
          {product.map((s) => {

            const totalStock = s.colors?.reduce((total, color) => {
              return total + (color.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0);
            }, 0);

            return (
              <div key={s.id} className="product-cardsandle">

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
                  <div className="sold_out">
                     Sold Out
                  </div>
                )}

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

                <div className="product_name">
                  {s.name} - {s.colors?.[0]?.color_name}
                </div>
                <div className="price">AED {s.price}</div>

              </div>
            );
          })}
        </div>
      </div>

      {selectedProduct && (
        <PopupCart
          close={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}

      <div className="whatsapp">
        <button className="whatsapp_btn"
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

export default Allsandle;