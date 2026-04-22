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
    axios.get(`http://127.0.0.1:8000/api/product/${id}/`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.colors?.length > 0) {
          setSelectedColor(res.data.colors[0]);
          setActiveImage(res.data.colors[0].image1);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const images = selectedColor
    ? [selectedColor.image1, selectedColor.image2].filter(Boolean)
    : [];

  const isPerfume = product.category_name?.toLowerCase().includes("perfume");

  return (
    <div className="product-page">

      {/* LEFT SIDE */}
      <div className="left">
        <div className="thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={`http://127.0.0.1:8000${img}`}
              alt={`${product.name} ${i}`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>

        <div className="main-img">
          <img
            src={`http://127.0.0.1:8000${activeImage}`}
            alt={product.name}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">

        <h1 className="title">{product.name}</h1>
        <p className="price">AED {product.price}</p>

        {/* COLOR */}
        {!isPerfume && (
          <div className="color-section">
            <p>Color: {selectedColor?.color_name}</p>

            <div className="color-options">
              {product.colors?.map((c) => (
                <div
                  key={c.id}
                  className={`color-box ${selectedColor?.id === c.id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedColor(c);
                    setActiveImage(c.image1);
                    setSelectedSize(null);
                  }}
                >
                  <img
                    src={`http://127.0.0.1:8000${c.image1}`}
                    alt={c.color_name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isPerfume && (
          <div className="size-section">
            <p>Size:</p>

            <div className="sizes">
              {selectedColor?.sizes.map((s) => (
                <div
                  key={s.id}
                  className={`size-box ${selectedSize === s.size ? "active" : ""}`}
                  onClick={() => setSelectedSize(s.size)}
                >
                  {s.size}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="qty-section">
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <button
          className="buy-btn"
          onClick={() => {
            if (!isPerfume && !selectedSize) {
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
                image: selectedColor?.image1 || null,
                checkoutData: {
                  quantity: qty,
                  color_id: selectedColor?.id || null,
                  size_id: selectedColor?.sizes?.find(
                    s => s.size === selectedSize
                  )?.id || null
                }
              }
            });
          }}
        >
          Buy Now
        </button>

      </div>

      {showErrorPopup && (
        <div className="login_popup_overlay" onClick={() => setShowErrorPopup(false)}>
          <div className="login_popup" onClick={(e) => e.stopPropagation()}>
            <p>Please select a size</p>
            <button onClick={() => setShowErrorPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div className="login_popup_overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="login_popup" onClick={(e) => e.stopPropagation()}>
            <p>Please login to continue</p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => setShowLoginPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;