import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔥 SAFE PARSE (IMPORTANT FIX)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    const confirmLogout = window.confirm(
      "🚪 Logout from DevConnect?"
    );

    if (!confirmLogout) return;

    localStorage.clear();
    navigate("/login");
  };

  const myProfile = () => {
    if (token && user && user._id) {
      navigate(`/profile/${user._id}`);
    } else {
      console.log("User not found in localStorage");
    }
  };

  return (
    <div className="navbar">

      {/* LOGO */}
      <h2 className="logo" onClick={() => navigate("/home")}>
        DevConnect
      </h2>

      <div className="nav-right">

        {/* GUEST */}
        {!token && (
          <>
            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </>
        )}

        {/* LOGGED IN */}
        {token && (
          <>
            <button className="profile-btn" onClick={myProfile}>
              👤
            </button>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;