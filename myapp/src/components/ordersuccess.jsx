import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(state || null);

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const storedData = localStorage.getItem("orderData");

        if (!storedData) return;

        const orderdata = JSON.parse(storedData);

        const res = await axios.post(
          "http://127.0.0.1:8000/api/create_order/",
          {
            ...orderdata,
            payment_status: "paid",
          }
        );

        // ✅ set order for UI display
        setOrder({
          product: orderdata.product,
          total_amount: orderdata.total_amount,
          payment_status: "paid",
          order_id: res.data?.id || res.data?.order_id
        });

        localStorage.removeItem("orderData");

      } catch (error) {
        console.log("Order save error:", error);
      }
    };

    // only run if no state (Stripe redirect case)
    if (!state) {
      saveOrder();
    }
  }, [state]);

  return (
    <div className="success_container">

      <div className="success_card">

        <div className="icon_circle">
          ✔
        </div>

        <h2>Order Placed!</h2>

        <p className="thank_text">THANK YOU FOR YOUR ORDER</p>

        <p className="sub_text">
          Your order has been successfully placed.
        </p>

        {/* <div className="order_box">

          <p>
            <strong>Product:</strong> {order?.product?.name || "N/A"}
          </p>

          <p>
            <strong>Quantity:</strong> {order?.product?.quantity || "1"}
          </p>

          <p>
            <strong>Total Amount:</strong> AED {order?.total_amount || "0"}
          </p>

          <p className="payment_method">
            Payment: {order?.payment_status === "pending" ? "Cash on Delivery" : "Paid"}
          </p>

        </div> */}

        <button
          className="home_btn"
          onClick={() => navigate("/")}
        >
          shop More
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;