import { useEffect, useState } from "react";
import { fetchAllPosts, createPost } from "../models/Post"; // Adjust import path as needed
import { getOrCreateUser } from "../models/User";
import PostList from "../components/Forum/PostList";

const ForumView = () => {
  const [posts, setPosts] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchAllPosts().then(setPosts).catch(console.error);
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const authorObj = await getOrCreateUser(authorName);
      await createPost(title, body, authorObj);
      
      setAuthorName(""); setTitle(""); setBody("");
      window.location.reload(); 
    } catch (error) {
      alert("Error saving post: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Message Board</h1>
      
      <form onSubmit={handlePostSubmit} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "30px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <h3>Write a New Post</h3>
        <input type="text" placeholder="Your Username" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />
        <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />
        <textarea placeholder="What's on your mind?" value={body} onChange={(e) => setBody(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px", minHeight: "80px", boxSizing: "border-box" }} />
        <button type="submit" style={{ padding: "10px 15px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Submit Post</button>
      </form>
      
      <PostList posts={posts} />
    </div>
  );
};

export default ForumView;