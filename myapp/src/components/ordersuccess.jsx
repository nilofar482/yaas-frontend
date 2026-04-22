import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

useEffect(() => {
  const saveOrder = async () => {
    try {
      const storedData = localStorage.getItem("orderData");

      if (!storedData) {
        console.log("NO ORDER DATA FOUND");
        return;
      }

      const orderdata = JSON.parse(storedData);

      console.log("SENDING ORDER DATA:", orderdata);

      await axios.post(
        "https://api.yaasgents.com/api/create_order/",
        {
          ...orderdata,
          payment_status: "paid",
        }
      );

      localStorage.removeItem("orderData");

    } catch (error) {
      console.log("Order save error:", error);
    }
  };

  saveOrder();   // ❌ remove state condition
}, []);

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