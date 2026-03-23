import { useEffect, useState } from "react";
import { fetchAllPosts, createPost } from "../Services/PostService";
import { logout, getCurrentUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import PostList from "../Components/Forum/PostList";

const ForumView = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setUsername(user.get("username"));
      fetchAllPosts().then(setPosts).catch(console.error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null); // forces login screen
      setPosts([]); //clear forum
      setTitle("");
      setBody("");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(title, body, currentUser);

      setTitle("");
      setBody("");

      const updatedPosts = await fetchAllPosts();
      setPosts(updatedPosts);
    } catch (error) {
      alert("Error saving post: " + error.message);
    }
  };

  // Forum view when user is logged in
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Message Board</h1>
      <button onClick={handleLogout}>Logout</button>
      <form
        onSubmit={handlePostSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>Write a New Post</h3>
        <p>
          {/* Prevents site from crashing when currentUser is null */}
          <strong>Posting as:</strong> {currentUser?.get("username")}{" "}
        </p>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            minHeight: "80px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit Post
        </button>
      </form>

      <PostList posts={posts} />
    </div>
  );
};

export default ForumView;
