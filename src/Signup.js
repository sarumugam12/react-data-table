import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [f, setF] = useState({
    name: "",
    phone: "",
    age: "",
    city: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/signup", f);
    alert("Signup successful");
    window.location = "/login";
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Sign up</h1>

        <p className="subtitle">
          Create an account or{" "}
          <span onClick={() => (window.location = "/login")}>
            Sign in
          </span>
        </p>

        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setF({ ...f, email: e.target.value })}
        />

        <label>Name</label>
        <input
          placeholder="Enter name"
          onChange={(e) => setF({ ...f, name: e.target.value })}
        />

        <label>Phone</label>
        <input
          placeholder="Enter phone"
          onChange={(e) => setF({ ...f, phone: e.target.value })}
        />

        <label>Age</label>
        <input
          type="number"
          placeholder="Enter age"
          onChange={(e) => setF({ ...f, age: e.target.value })}
        />

        <label>City</label>
        <input
          placeholder="Enter city"
          onChange={(e) => setF({ ...f, city: e.target.value })}
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            onChange={(e) =>
              setF({ ...f, password: e.target.value })
            }
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="signup-btn" onClick={submit}>
          Sign up
        </button>

        <p className="terms">
          By signing up, you agree to our <b>terms</b> and{" "}
          <b>privacy policy</b>.
        </p>
      </div>
    </div>
  );
}
