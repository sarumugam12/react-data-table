import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Welcome</h1>
        <p>Please login or create an account</p>

        <button onClick={() => navigate("/login")}>
          Login
        </button>

        <button onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
}
