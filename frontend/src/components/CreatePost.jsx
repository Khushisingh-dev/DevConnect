import { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

function CreatePost({ refresh }) {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-post">
      <h3>✨ Create Post</h3>

      <textarea
        value={content}
        placeholder="What's on your mind?"
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;