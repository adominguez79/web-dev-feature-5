// src/components/Forum/CommentList.jsx
import { useEffect, useState } from "react";
import { fetchComments, addComment } from "../../Services/ComentService";
import { getCurrentUser } from "../../services/AuthService";
import CommentCard from "./CommentCard";

const CommentList = ({ postId }) => {
  const currentUser = getCurrentUser();
  const [comments, setComments] = useState([]);
  const [newBody, setNewBody] = useState("");

  const loadComments = async () => {
    try {
      const results = await fetchComments(postId);
      setComments(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newBody.trim()) return;

    try {
      await addComment(postId, newBody.trim());
      setNewBody("");
      await loadComments();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* New Comment Form */}
      <div style={{ marginBottom: 12 }}>
        <textarea
          placeholder="Write a comment..."
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          style={{ width: "100%", minHeight: 60 }}
        />

        <button onClick={handleAddComment}>Post Comment</button>
      </div>

      {/* Comment List */}
      {comments.length === 0 ? (
        <p style={{ color: "gray" }}>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            refreshComments={loadComments}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
