import { useState } from "react";
import axios from "axios";

function Signup({ onSignupSuccess }) {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://api.yaasgents.com/api/signup_user/", signupData)
      .then((res) => {
        setMessage(res.data.message);

        setSignupData({ username: "", email: "", password: "" });

        setTimeout(() => {
          onSignupSuccess();
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data.error) {
          setMessage(err.response.data.error);
        } else {
          setMessage("Error in signup");
        }
      });
  };

  return (
    <div className="signup_div">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={signupData.username}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={signupData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Signup;