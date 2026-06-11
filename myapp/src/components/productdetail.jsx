import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

useEffect(() => {
  axios
    .get(`https://api.yaasgents.com/api/product/${id}/`)
    .then((res) => {
      setProduct(res.data);

      if (res.data.colors?.length > 0) {
        const firstColor = res.data.colors[0];

        setSelectedColor(firstColor);
        setActiveImage(firstColor?.images?.[0]?.image || "");

        // ✅ SAFE: set default size AFTER color is ready
        if (res.data.category_name?.toLowerCase().includes("perfume")) {
          setSelectedSize(firstColor?.sizes?.[0]?.size || null);
        }
      }
    })
    .catch((err) => console.log(err));
}, [id]);

  if (!product) return <div>Loading...</div>;

  const images = selectedColor?.images || [];

  const isPerfume = product.category_name?.toLowerCase().includes("perfume");

  return (
    <div className="product-page">

      {/* LEFT SIDE */}
      <div className="left">
        <div className="thumbs">
          {images.map((img) => (
            <img
              key={img.id}
              src={`https://api.yaasgents.com${img.image}`}
              alt={product.name}
              onClick={() => setActiveImage(img.image)}
            />
          ))}
        </div>

        <div className="main-img">
          <img
            src={`https://api.yaasgents.com${activeImage}`}
            alt={product.name}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">

        <h1 className="title">{product.name}</h1>
        <div className="price">
  {product.offer_price ? (
    <>
      <span className="old-price">
        AED {product.price}
      </span>

      <span className="offer-price">
        AED {product.offer_price}
      </span>
    </>
  ) : (
    <span className="offer-price">
      AED {product.price}
    </span>
  )}
</div>

        {product.description && (
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        )}

        {product.features?.length > 0 && (
          <div className="product-features">
            <h3>Features</h3>

            <ul>
              {product.features.map((item) => (
                <li key={item.id}>{item.feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* COLOR */}
        {!isPerfume && (
          <div className="color-section">
            <p>Color: {selectedColor?.color_name}</p>

            <div className="color-options">
              {product.colors?.map((c) => (
                <div
                  key={c.id}
                  className={`color-box ${
                    selectedColor?.id === c.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedColor(c);
                    setSelectedSize(null);
                    setActiveImage(
                      c.images?.[0]?.image || ""
                    );
                  }}
                >
                  <img
                    src={`https://api.yaasgents.com${c.images?.[0]?.image}`}
                    alt={c.color_name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

<div className="size-section">
  <p>Size:</p>

  <div className="sizes">
    {(isPerfume
      ? selectedColor?.sizes
      : selectedColor?.sizes
    )?.map((s) => (
      <div
        key={s.id}
        className={`size-box ${
          selectedSize === s.size ? "active" : ""
        }`}
        onClick={() => setSelectedSize(s.size)}
      >
        {s.size} ml
      </div>
    ))}
  </div>
</div>

        <div className="qty-section">
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
            -
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>

        <button
          className="buy-btn"
          onClick={() => {
            if (!selectedSize && selectedSize !== 0) {
              setShowErrorPopup(true);
              return;
            }

            let token = localStorage.getItem("access_token");

            if (!token) {
              setShowLoginPopup(true);
              return;
            }

            navigate("/checkout", {
              state: {
                product: product,
                image:
                  selectedColor?.images?.[0]?.image || null,
                checkoutData: {
                  quantity: qty,
                  color_id: selectedColor?.id || null,
                  size_id:
                    selectedColor?.sizes?.find(
                      (s) => s.size === selectedSize
                    )?.id || null,
                },
              },
            });
          }}
        >
          Buy Now
        </button>

      </div>

      {showErrorPopup && (
        <div
          className="login_popup_overlay"
          onClick={() => setShowErrorPopup(false)}
        >
          <div
            className="login_popup"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Please select a size</p>
            <button onClick={() => setShowErrorPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div
          className="login_popup_overlay"
          onClick={() => setShowLoginPopup(false)}
        >
          <div
            className="login_popup"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Please login to continue</p>
            <button onClick={() => navigate("/login")}>
              Login
            </button>
            <button onClick={() => setShowLoginPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;