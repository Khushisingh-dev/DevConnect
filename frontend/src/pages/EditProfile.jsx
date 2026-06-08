import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  // 🔥 UPDATE PROFILE
  const updateProfile = async () => {
    if (!username) return alert("Username required");

    setLoading(true);

    try {
      await axios.put(
        "http://localhost:5000/api/users/profile/update",
        { username, bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          username,
          bio,
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

  // 🔥 DELETE ACCOUNT
  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        "http://localhost:5000/api/users/profile/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();

      alert("Account Deleted");

      navigate("/register");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="edit-container">

      <div className="edit-card">

        <h2>Edit Profile ✏️</h2>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

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