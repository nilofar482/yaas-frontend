import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "./api";

function Checkout() {

    const { state } = useLocation();
    const product = state?.product;
    const image = state?.image;
    const checkoutData = state?.checkoutData;
    const [loading, setloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isPerfume =
        product?.category_name?.toLowerCase() === "perfume";

    const imageUrl = image
        ? `https://api.yaasgents.com${image}`
        : `https://api.yaasgents.com${product?.colors?.[0]?.image1}`;

    const qty = checkoutData?.quantity || 1;
    const total = product?.price * qty;

    const selectedColorObj = product?.colors?.find(
        c => String(c.id) === String(checkoutData?.color_id)
    );

    const selectedSize = selectedColorObj?.sizes?.find(
        s => String(s.id) === String(checkoutData?.size_id)
    );

    const selectedColor = selectedColorObj;

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        area: "",
        building: "",
        flat: "",
        landmark: "",
        pincode: "",
        country: "UAE"
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/api/user_profile/");

                setForm((prev) => ({
                    ...prev,
                    name: res.data.name || "",
                    email: res.data.email || "",
                    phone: res.data.phone || ""
                }));

            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handlePayment = async () => {

        if (!form.name) return setErrorMessage("Name is required");
        if (!form.email) return setErrorMessage("Email is required");
        if (!form.area) return setErrorMessage("Area is required");
        if (!form.building) return setErrorMessage("Building is required");
        if (!form.flat) return setErrorMessage("Flat / Villa No is required");

        if (form.country !== "UAE") {
            return setErrorMessage("Delivery available only in UAE");
        }

        setloading(true);

        try {

            localStorage.setItem("orderData", JSON.stringify({
                user: {
                    name: form.name,
                    email: form.email,
                    phone: form.phone
                },
                product: {
                    id: product?.id,
                    name: product?.name,
                    price: product?.price,
                    quantity: qty,
                    size: isPerfume ? null : selectedSize?.size,
                    size_id: isPerfume ? null : selectedSize?.id,
                    color: isPerfume ? null : selectedColor?.color_name,
                    image: isPerfume ? null : selectedColorObj?.image1
                },
                total_amount: total,
                country: form.country,

                area: form.area || "",
                building: form.building || "",
                flat: form.flat || "",
                landmark: form.landmark || "",
                pincode: form.pincode || ""
            }));

            const res = await axios.post(
  "https://api.yaasgents.com/api/create-checkout-session/",
  {
    user: {
      name: form.name,
      email: form.email,
      phone: form.phone
    },

    product: {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity: qty,

      ...(isPerfume
        ? {
            image: product?.image || imageUrl
          }
        : {
            size: selectedSize?.size || "",
            color: selectedColor?.color_name || "",
            image: selectedColorObj?.image1 || selectedColor?.image1
          })
    },

    quantity: qty,
    price: product?.price,
    total_amount: total,

    area: form.area,
    building: form.building,
    flat: form.flat,
    landmark: form.landmark,
    pincode: form.pincode,
    country: form.country
  }
);

            window.location.href = res.data.url;

        } catch (error) {
            console.log(error);
            alert("Payment error");
        }

        setloading(false);
    };

    return (
        <div>

            {errorMessage && (
                <div className="login_popup_overlay" onClick={() => setErrorMessage("")}>
                    <div className="login_popup" onClick={(e) => e.stopPropagation()}>
                        <p>{errorMessage}</p>
                        <button onClick={() => setErrorMessage("")}>OK</button>
                    </div>
                </div>
            )}

            <div className="checkout_top">
                <div className="check">
                    <img src="/logoyaas.png" alt="logo" />
                </div>
                <div className="name">Yaas_gents</div>
            </div>

            <div className="checkout_main">

                <div className="check_left">
                    <h2>Order Summary</h2>

                    <div className="summary_card">

                        <div className="summary_item">
                            <div className="img_box">
                                <img src={imageUrl} alt="" />
                                <div className="qty_badge">{qty}</div>
                            </div>

                            <div className="details">
                                <h4>{product?.name}</h4>

                                {!isPerfume && selectedSize && selectedColor && (
                                    <p className="variant">
                                        Size: {selectedSize?.size} |
                                        Color: {selectedColor?.color_name}
                                    </p>
                                )}

                                {isPerfume && (
                                    <p className="variant">Perfume</p>
                                )}
                            </div>

                            <div className="price">
                                AED {product?.price}
                            </div>
                        </div>

                        <div className="summary_calc">
                            <div className="row">
                                <div>Subtotal ({qty} item)</div>
                                <div>AED {total}</div>
                            </div>

                            <div className="total_row">
                                <div>Total</div>
                                <div>AED {total}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="check_right">
                    <h2>Delivery Details</h2>

                    <p style={{ color: "red", marginBottom: "10px" }}>
                        Delivery available only within UAE
                    </p>

                    <input name="name" value={form.name} onChange={handleChange} />
                    <input name="email" value={form.email} hidden />
                    <input name="phone" value={form.phone} onChange={handleChange} />

                    <input
                        name="country"
                        value="United Arab Emirates"
                        readOnly
                    />

                    <div className="row_2">
                        <input name="area" placeholder="Area" onChange={handleChange} />
                        <input name="pincode" placeholder="Pincode (optional)" onChange={handleChange} />
                    </div>

                    <input name="building" placeholder="Building Name" onChange={handleChange} />
                    <input name="flat" placeholder="Flat / Villa No" onChange={handleChange} />
                    <input name="landmark" placeholder="Landmark (optional)" onChange={handleChange} />

                    <h2>Payment</h2>

                    <button onClick={handlePayment} disabled={loading}>
                        {loading ? "Processing..." : "Proceed to Payment"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Checkout;