import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://devconnect-ztj7.onrender.com/api/posts"
      );

      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
    <Navbar />
    <div className="home-container">

      {/* 🔥 GLOBAL NAVBAR */}

      <div className="home-feed">

        <h2 className="title">Home Feed</h2>

        {/* CREATE POST */}
        <CreatePost refresh={fetchPosts} />

        {/* STATES */}
        {loading ? (
          <p className="loading">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="empty">No posts yet</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              refresh={fetchPosts}
            />
          ))
        )}

      </div>
    </div>
    </div>
  );
  
}

export default Home;