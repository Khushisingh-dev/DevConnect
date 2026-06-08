import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <div className="landing-container">

      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero">
        <h1>
          Connect With <span>Developers</span>
        </h1>

        <p>
          Share posts, build network, and grow your skills with DevConnect.
        </p>

        {/* SMART CTA BUTTON */}
        <button
          className="cta"
          onClick={() =>
            navigate(token ? "/home" : "/register")
          }
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Landing;