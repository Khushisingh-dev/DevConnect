// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./PostCard.css";
// import CommentSection from "./CommentSection";

// function PostCard({ post, refresh }) {
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   const likePost = async () => {
//     await axios.put(
//       `http://localhost:5000/api/posts/like/${post._id}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     refresh();
//   };

//   const deletePost = async () => {
//     await axios.delete(
//       `http://localhost:5000/api/posts/${post._id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     refresh();
//   };

//   return (
//     <div className="post-card">
//       {/* USER HEADER */}
//       <div className="post-header">
//         <h4
//           onClick={() =>
//             navigate(`/profile/${post.user._id}`)
//           }
//         >
//           {/* {post.user.username} */}
//           {post.user?.username || "Deleted User"}
//         </h4>

//         <span className="dot">•</span>
//       </div>

//       {/* CONTENT */}
//       <p className="post-content">{post.content}</p>

//  {/* COMMENTS */}
//         <CommentSection postId={post._id} />
        
//       {/* ACTIONS */}
//       <div className="post-actions">
//         <button onClick={likePost}>
//           ❤️ {post.likes.length}
//         </button>

//         <button
//           onClick={() =>
//             navigate(`/profile/${post.user._id}`)
//           }
//         >
//           View
//         </button>

//         <button onClick={deletePost}>
//           Delete
//         </button>

//     </div>
//       </div>
//   );
// }

// export default PostCard;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";
import CommentSection from "./CommentSection";

function PostCard({ post, refresh }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ SAFE USER PARSE
  const loggedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ✅ OWNER CHECK (IMPORTANT FIX)
  const isOwner =
    loggedUser?._id === post.user?._id;

  const likePost = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/like/${post._id}`,
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

  const deletePost = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${post._id}`,
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

  return (
    <div className="post-card">

      {/* USER HEADER */}
      <div className="post-header">
        <h4
          onClick={() =>
            navigate(`/profile/${post.user?._id}`)
          }
        >
          {post.user?.username || "Deleted User"}
        </h4>

        <span className="dot">•</span>
      </div>

      {/* CONTENT */}
      <p className="post-content">{post.content}</p>

      {/* COMMENTS */}
      <CommentSection postId={post._id} />

      {/* ACTIONS */}
      <div className="post-actions">

        {/* LIKE */}
        <button onClick={likePost}>
          ❤️ {post.likes?.length || 0}
        </button>

        {/* VIEW PROFILE */}
        <button
          onClick={() =>
            navigate(`/profile/${post.user?._id}`)
          }
        >
          View
        </button>

        {/* DELETE (ONLY OWNER) */}
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