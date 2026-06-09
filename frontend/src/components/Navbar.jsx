import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import {User} from "lucide-react";

function Navbar({ page = "" }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    const confirmLogout = window.confirm(
      "🚪 Logout from DevConnect?"
    );

    if (!confirmLogout) return;

    localStorage.clear();
    navigate("/login");
  };

  const myProfile = () => {
    if (user?._id) {
      navigate(`/profile/${user._id}`);
    } else {
      console.log("User not found");
    }
  };

  const goHome = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <h2 className="logo" onClick={goHome}>
        DevConnect
      </h2>

      <div className="nav-right">
        {/* LANDING PAGE GUEST BUTTONS */}
        {!token && page === "landing" && (
          <>
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="nav-btn signup-btn"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        )}

        {/* LOGGED IN USER */}
        {token && (
          <>
            <button
              className="profile-btn"
              onClick={myProfile}
              title="My Profile"
            >
              <User/>
            </button>

            <button
              className="nav-btn logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;