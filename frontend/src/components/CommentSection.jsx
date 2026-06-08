import { useEffect, useState } from "react";
import axios from "axios";
import "./CommentSection.css";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${postId}`
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async () => {
    if (!text.trim()) return;

    await axios.post(
      `http://localhost:5000/api/comments/${postId}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("");
    fetchComments();
  };

  const deleteComment = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchComments();
  };

  return (
    <div className="comment-section">
      <h4>💬 Comments</h4>

      <div className="comment-input-box">
        <input
          className="comment-input"
          value={text}
          placeholder="Write a comment..."
          onChange={(e) => setText(e.target.value)}
        />

        <button className="comment-add-btn" onClick={addComment}>
          Post
        </button>
      </div>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="comment">
              <div className="comment-text">
                <b>{c.user.username}</b>
                <span>{c.text}</span>
              </div>

              <button
                className="comment-delete-btn"
                onClick={() => deleteComment(c._id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;