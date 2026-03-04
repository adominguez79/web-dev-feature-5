// src/components/Forum/CommentList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const Comment = Parse.Object.extend("Comment");
      const query = new Parse.Query(Comment);
      
      // Create a pointer to the specific post
      const postPointer = new Parse.Object("Post");
      postPointer.id = postId;

      query.equalTo("parentPost", postPointer);
      query.include("author"); // Ensure we get the latest username!
      
      const results = await query.find();
      setComments(results);
    }
    fetchComments();
  }, [postId]);

  return (
    <div>
      {comments.length === 0 ? <p style={{color: 'gray'}}>No comments yet.</p> : 
        comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px", fontSize: "0.9rem" }}>
            <span>{c.get("body")} — </span>
            {/* Constraint 3: Clickable author taking you to their profile */}
            <Link to={`/author/${c.get("author")?.id}`} style={{ fontWeight: "bold" }}>
              {c.get("author")?.get("username")}
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default CommentList;