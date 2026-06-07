import axios from "axios";
import { useEffect, useState } from "react";
// import PopupCart from "./popupcart";
import { useNavigate } from "react-router-dom";

function Allperfume(){
  const navigate = useNavigate();
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: "Perfumes Collection",
        content_category: "Perfumes"
      });
    }
  }, []);

  const [product, setproduct] = useState([]);
  const [minPrice] = useState(0); 
  const [maxPrice] = useState(500); 

  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    let url = `https://api.yaasgents.com/api/product_list/?category=perfumes`;

    if (minPrice) url += `&min_price=${minPrice}`;
    if (maxPrice) url += `&max_price=${maxPrice}`;

    axios.get(url)
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  }, [minPrice, maxPrice]);

  const handleSort = (type) => {
    let url = `https://api.yaasgents.com/api/product_list/?category=perfumes&sort=${type}`;
    if (minPrice) url += `&min_price=${minPrice}`;
    if (maxPrice) url += `&max_price=${maxPrice}`;

    axios.get(url)
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));

    setShowSort(false);
  };

  return (
    <div>
      <div className="page_title">
        <p>perfumes</p>
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
            <p onClick={() => handleSort("newest")}>Newest</p>
            <p onClick={() => handleSort("low")}>Price: Low to High</p>
            <p onClick={() => handleSort("high")}>Price: High to Low</p>
            <p onClick={() => handleSort("az")}>A-Z</p>
            <p onClick={() => handleSort("za")}>Z-A</p>
          </div>
        )}
      </div>

      <div className="filter">

        {/* FILTER SECTION COMMENTED (unchanged) */}
        {/*
        <div className="filter_main">

          <h3>Price</h3>

          <div className="slider_container">
            <div className="price_labels">
              <span>AED {minPrice}</span>
              <span>AED {maxPrice}</span>
            </div>

            <input
              type="range"
              min="0"
              max="500"
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > minPrice) setMaxPrice(value);
              }}
              className="slider"
            />
          </div>

        </div>
        */}

<div className="product_list2">
  {product.map((s) => {

    const totalStock = s.colors?.reduce((total, color) => {
      return total + (color.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0);
    }, 0);

    return (
      <div key={s.id} className="product-card">

        <div className="img-box">
          {s.colors?.[0]?.images?.length > 0 ? (
            <>
              <img
                src={`https://api.yaasgents.com${s.colors[0].images[0].image}`}
                alt={s.name}
              />

              {s.colors[0].images[1]?.image && (
                <img
                  src={`https://api.yaasgents.com${s.colors[0].images[1].image}`}
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
            Out of Stock
          </div>
        )}

        <div className="product_name">
          {s.name}
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
          <button
            onClick={() => {
              if (window.fbq) {
                window.fbq('track', 'ViewContent', {
                  content_name: s.name,
                  content_ids: [s.id],
                  value: Number(s.price),
                  currency: "AED"
                });
              }
              navigate(`/product/${s.id}`);
            }}
          >
            view product
          </button>
        </div>

      </div>
    );
  })}
</div>
      </div>

      {/* {selectedProduct && (
        <PopupCart
          close={() => setSelectedProduct(null)}
          product={{ ...selectedProduct, category: "perfumes" }}
        />
      )} */}

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

export default Allperfume;