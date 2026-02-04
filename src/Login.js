import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password
    });

    if (res.data.message === "Login success") {
      window.location = "/table";
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <p className="subtitle">
          Welcome back or{" "}
          <span onClick={() => (window.location = "/signup")}>
            Create account
          </span>
        </p>

        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="login-btn" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
