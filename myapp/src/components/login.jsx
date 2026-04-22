import { useState } from "react";
import axios from "axios";
import Signup from "./signup";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call Django backend login
      const res = await axios.post("http://127.0.0.1:8000/api/login_user/", {
        username: email,
        password: password,
      });

      // ✅ Save tokens
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // ✅ Save user (fallback if API fails later)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.username,
          email: res.data.email,
        })
      );

      // ✅ Redirect
      navigate("/home");

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showSignup ? (
        <Signup onSignupSuccess={() => setShowSignup(false)} />
      ) : (
        <div className="login-container">
          <div className="login">
            <form onSubmit={handleLogin}>
              <h2>Login here</h2>

              {error && <p className="error-msg">{error}</p>}

              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p>
                Don't have an account?{" "}
                <span className="loginp" onClick={() => setShowSignup(true)}>
                  signup
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;