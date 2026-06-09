import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";

import "./Profile.css";
import { House, UserPen, Trash } from "lucide-react";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isOwner = loggedUser?._id === id;

  // =========================
  // FETCH USER + POSTS
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://devconnect-ztj7.onrender.com/api/users/${id}`
        );

        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // =========================
  // DELETE POST
  // =========================
  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `https://devconnect-ztj7.onrender.com/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prev) =>
        prev.filter((post) => post._id !== postId)
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete post");
    }
  };

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (!user) {
    return <div className="profile-loading">User not found</div>;
  }

  return (
    <div className="profile-container">

      <Navbar />

      {/* OWNER ACTIONS */}
      {isOwner && (
        <div className="owner-actions">

          <button
            className="home-btn"
            onClick={() => navigate("/home")}
          >
            <House size={20} /> Go To Home
          </button>

          <button
            className="edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            <UserPen size={20} /> Edit Profile
          </button>

        </div>
      )}

      <div className="profile-content">

        <ProfileHeader user={user} />

        <h3 className="posts-title">
          Posts ({posts.length})
        </h3>

        {posts.length === 0 ? (
          <p className="no-posts">No posts yet</p>
        ) : (
          <div className="posts-grid">

            {posts.map((post) => (
              <div key={post._id} className="post-card">

                {/* CONTENT */}
                <p className="post-content">
                  {post.content}
                </p>

                {/* DATE & TIME */}
                <p className="post-time">
                  {post.createdAt &&
                    formatDate(post.createdAt)}
                </p>

                {/* DELETE BUTTON */}
                {isOwner && (
                  <button
                    className="post-delete-btn"
                    onClick={() => deletePost(post._id)}
                  >
                    <Trash size={18} /> Delete Post
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;