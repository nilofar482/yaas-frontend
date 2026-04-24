import { useState, useEffect } from "react";
import api from "./api";

function Profile() { 
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [orders, setOrders] = useState([]);

  const [profile, setProfile] = useState({
    phone: "",
    address: "",
    city: "",
    pincode: "",
    country: ""
  });

  const fetchOrders = async (email) => {
    try {
      const res = await api.get(`/api/my_orders/?email=${email}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/user_profile/");

        const userData = {
          name: res.data.name,
          email: res.data.email,
        };

        setUser(userData);

        setProfile({
          phone: res.data.phone || "",
          address: res.data.address || "",
          city: res.data.city || "",
          pincode: res.data.pincode || "",
          country: res.data.country || "",
        });

        if (res.data.phone || res.data.address) {
          setViewMode(true);
        }

        if (userData.email) {
          fetchOrders(userData.email);
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await api.post("/api/user_profile/", profile);
      setViewMode(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile_container">

      {/* LEFT SIDE */}
      <div className="main_profile">

        {!viewMode ? (
          <div>
            <div className="profile_form_card">
              <div className="form_group">
                <label>Name</label>
                <input type="text" value={user?.name || ""} readOnly />
              </div>

              <div className="form_group">
                <label>Email</label>
                <input type="email" value={user?.email || ""} readOnly />
              </div>

              <div className="form_group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="profile_form_card">
              <h3>Delivery Address</h3>

              <div className="form_group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form_row">
                <div className="form_group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form_group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={profile.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form_group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="profile_actions">
              <button className="save_btn" onClick={handleSave}>
                Save Details
              </button>
            </div>
          </div>
        ) : (
          <div className="profile_card1">
            <h2>Personal Info</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>

            <h3>Delivery Address</h3>
            <p>{profile.address}</p>
            <p>{profile.city}</p>
            <p>{profile.pincode}</p>
            <p>{profile.country}</p>

            <button onClick={() => setViewMode(false)}>Edit</button>
          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="main_profile">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => {

            // ✅ FIXED IMAGE HANDLING
            const imageUrl = order.image || "";

            return (
              <div className="order_card" key={order.id}>
                {imageUrl && (
                  <img src={imageUrl} alt={order.product_name} />
                )}

                <div>
                  <h4>{order.product_name}</h4>
                  <p>Price: AED {order.price}</p>
                  <p>Qty: {order.quantity}</p>
                  <p>Status: {order.status}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* WHATSAPP */}
      <div className="whatsapp">
        <button
          className="whatsapp_btn"
          onClick={() => {
            const message = encodeURIComponent("Hi, I am interested in your product");
            window.open(`https://wa.me/971568160153?text=${message}`, "_blank");
          }}
        >
          <img src="/whatsapp.png" alt="" />
        </button>
      </div>

    </div>
  );
}

export default Profile;