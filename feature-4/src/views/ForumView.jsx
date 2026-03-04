// src/views/ForumView.jsx
import { useEffect, useState } from "react";
import Parse from "parse";
import CommentList from "../components/Forum/CommentList";

const ForumView = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const Post = Parse.Object.extend("Post");
      const query = new Parse.Query(Post);
      query.include("Author"); // Capital 'A' as per your column
      query.descending("createdAt");

      try {
        const results = await query.find();
        setPosts(results);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
    <h1 style={{ color: "red" }}>TEST: IF YOU SEE THIS, THE COMPONENT LOADED</h1>
      <h1>Message Board</h1>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "20px" }}>
          <h2>{post.get("Title")}</h2> {/* Capital T */}
          <p>By: <strong>{post.get("Author")?.get("username")}</strong></p>
          <p>{post.get("body")}</p> {/* Lowercase b */}
          
          <hr />
          <h4>Comments</h4>
          <CommentList postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default ForumView;