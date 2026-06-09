import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";
import { Pencil } from "lucide-react";

function EditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || ""); // 🔥 FIX ADDED
  const [loading, setLoading] = useState(false);

  // =========================
  // 🔥 UPDATE PROFILE
  // =========================
  const updateProfile = async () => {
    if (!username.trim()) return alert("Username required");

    setLoading(true);

    try {
      await axios.put(
        "https://devconnect-ztj7.onrender.com/api/users/profile/update",
        {
          username,
          bio,
          profilePic, // 🔥 IMPORTANT FIX
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update localStorage instantly
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          username,
          bio,
          profilePic, // 🔥 IMPORTANT FIX
        })
      );

      alert("Profile Updated 🚀");

      navigate(`/profile/${user._id}`);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔥 DELETE ACCOUNT
  // =========================
  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        "https://devconnect-ztj7.onrender.com/api/users/profile/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();

      alert("Account Deleted 💀");

      navigate("/register");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">

        <h2>
          Edit Profile <Pencil size={18} />
        </h2>

        {/* USERNAME */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        {/* BIO */}
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

        {/* PROFILE IMAGE URL */}
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile Image URL"
        />

        {/* PREVIEW */}
        {profilePic && (
          <img
            src={profilePic}
            alt="preview"
            className="profile-preview"
          />
        )}

        {/* BUTTONS */}
        <div className="btn-group">
          <button
            className="update-btn"
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            className="delete-btn"
            onClick={deleteAccount}
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProfile;