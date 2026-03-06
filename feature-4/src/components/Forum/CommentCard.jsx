import { useState } from "react";
import { Link } from "react-router-dom";
import { editComment, removeComment } from "../../Services/ComentService";

const CommentCard = ({ comment, currentUser, refreshComments }) => {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(comment.get("body"));

  const author = comment.get("author");
  const isAuthor = currentUser && author && author.id === currentUser.id;

  const handleSave = async () => {
    await editComment(comment.id, body);
    setEditing(false);
    refreshComments();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;

    try {
      await removeComment(comment.id);
      refreshComments();
    } catch (e) {
      alert("You don't have permission to delete this comment.");
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {editing ? (
        <>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{comment.get("body")} — </span>

          <Link to={`/author/${author?.id}`}>{author?.get("username")}</Link>

          {isAuthor && (
            <div>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentCard;
