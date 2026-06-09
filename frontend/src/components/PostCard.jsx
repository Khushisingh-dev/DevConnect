import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";
import CommentSection from "./CommentSection";

function PostCard({ post, refresh }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const loggedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isOwner = loggedUser?._id === post?.user?._id;

  // =========================
  // LIKE POST
  // =========================
  const likePost = async () => {
    try {
      await axios.put(
        `https://devconnect-ztj7.onrender.com/api/posts/like/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE POST
  // =========================
  const deletePost = async () => {
    try {
      await axios.delete(
        `https://devconnect-ztj7.onrender.com/api/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refresh();
    } catch (err) {
      console.log(err);
      alert("Failed to delete post");
    }
  };

  // =========================
  // PROFILE IMAGE LOGIC
  // =========================
  const profileImage =
    post?.user?.profilePic ||
    `https://ui-avatars.com/api/?name=${
      post?.user?.username || "User"
    }&background=6b7280&color=fff&rounded=true`;

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

  return (
    <div className="post-card">

      {/* USER HEADER */}
      <div className="post-header">

        {/* AVATAR */}
        <img
          src={profileImage}
          alt="profile"
          className="post-avatar"
          onClick={() =>
            navigate(`/profile/${post?.user?._id}`)
          }
        />

        {/* USERNAME */}
        <h4
          onClick={() =>
            navigate(`/profile/${post?.user?._id}`)
          }
        >
          {post?.user?.username || "Deleted User"}
        </h4>

        <span className="dot">•</span>
      </div>

      {/* CONTENT */}
      <p className="post-content">{post?.content}</p>

      {/* DATE & TIME */}
      <p className="post-time">
        {post?.createdAt && formatDate(post.createdAt)}
      </p>

      {/* COMMENTS */}
      <CommentSection postId={post?._id} />

      {/* ACTIONS */}
      <div className="post-actions">

        <button onClick={likePost}>
          ❤️ {post?.likes?.length || 0}
        </button>

        {/* <button
          onClick={() =>
            navigate(`/profile/${post?.user?._id}`)
          }
        >
          View
        </button> */}

        {isOwner && (
          <button onClick={deletePost}>
            Delete
          </button>
        )}

      </div>

    </div>
  );
}

export default PostCard;