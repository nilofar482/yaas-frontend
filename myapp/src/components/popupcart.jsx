import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PopupCart({ close, product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();

  const images = selectedColor
    ? [selectedColor.image1, selectedColor.image2].filter(Boolean)
    : [];

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const isPerfume = product.category === "perfumes";

  const handleBuyNow = async () => {
    if (!isPerfume && !selectedSize) {
      setShowErrorPopup(true);
      return;
    }

    let token = localStorage.getItem("access_token");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    const checkoutData = {
      product_id: product.id,
      color_id: selectedColor?.id || null,
      size_id: selectedSize?.id || null,
      quantity: qty,
    };

    try {
      await axios.post(
        "https://api.yaasgents.com/api/checkout/init/",
        checkoutData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.log("Buy Now Error:", err);
    }

    navigate("/checkout", {
      state: {
        product: product,
        checkoutData: checkoutData,
        image: selectedColor?.image1
      },
    });

    close();
  };

  return (
    <div className="overlay" onClick={close}>
      <div className="popupcart" onClick={(e) => e.stopPropagation()}>
        <button className="remove2" onClick={close}>✖</button>

        <div className="popmain">
          <div className="popimage">
            {images.length > 0 ? (
              <img src={`https://api.yaasgents.com${images[index]}`} alt={product.name} />
            ) : (
              <p>No Image</p>
            )}

            {images.length > 1 && (
              <>
                <button className="prev" onClick={prevImage}>‹</button>
                <button className="next" onClick={nextImage}>›</button>
              </>
            )}
          </div>

          <div className="popdetails">
            <h2>{product.name}</h2>
            <p className="pop_price">AED {product.price}</p>

            <div className="line"></div>

            {!isPerfume && (
              <>
                <div className="color_var">Color: {selectedColor?.color_name}</div>
                <div className="color_box">
                  {product.colors?.map((color) => (
                    <div
                      key={color.id}
                      className={`color_item ${selectedColor?.id === color.id ? "active" : ""}`}
                      style={{ backgroundColor: color.color_name }}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize(null);
                        setIndex(0);
                      }}
                    ></div>
                  ))}
                </div>

                <div className="size_var">
                  Size: {selectedSize ? selectedSize.size : "Select Size"}
                </div>
                <div className="size_box">
                  {selectedColor?.sizes?.map((s) => (
                    <button
                      key={s.id}
                      className={`size_item ${selectedSize?.id === s.id ? "active" : ""}`}
                      disabled={s.stock === 0}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="quantity-section">
              <button className="qty_bn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
              <span>{qty}</span>
              <button className="qty_bn" onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <div className="popup_btns">
              <button className="buy_now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
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

export default PopupCart;