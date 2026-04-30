import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

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
          Shop More
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;