// src/components/Forum/CommentList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchComments, addComment, editComment, removeComment } from "../../Services/ComentService"; 

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newBody, setNewBody] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingBody, setEditingBody] = useState("");

  useEffect(() => {
    fetchComments(postId).then((posts) => {setComments(posts)});











  }, [postId]);

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <textarea
          placeholder="Write a comment..."
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          style={{ width: "100%", minHeight: 60 }}
        />
        <button
          onClick={async () => {
            if (!newBody.trim()) return;
            try {
              await addComment(postId, newBody.trim());
              const updated = await fetchComments(postId);
              setComments(updated);
              setNewBody("");
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          Post Comment
        </button>
      </div>

      {comments.length === 0 ? (
        <p style={{ color: "gray" }}>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px", fontSize: "0.9rem" }}>
            {editingId === c.id ? (
              <div>
                <textarea
                  value={editingBody}
                  onChange={(e) => setEditingBody(e.target.value)}
                  style={{ width: "100%", minHeight: 60 }}
                />
                <button
                  onClick={async () => {
                    try {
                      await editComment(c.id, editingBody);
                      const updated = await fetchComments(postId);
                      setComments(updated);
                      setEditingId(null);
                      setEditingBody("");
                    } catch (e) {
                      alert(e.message);
                    }
                  }}
                >
                  Save
                </button>
                <button onClick={() => { setEditingId(null); setEditingBody(""); }}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{c.get("body")} — </span>
                {/* Constraint 3: Clickable author taking you to their profile */}
                <Link to={`/author/${c.get("author")?.id}`} style={{ fontWeight: "bold" }}>
                  {c.get("author")?.get("username")}
                </Link>
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => { setEditingId(c.id); setEditingBody(c.get("body") || ""); }}>Edit</button>
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this comment?")) return;
                      try {
                        await removeComment(c.id);
                        setComments((prev) => prev.filter((p) => p.id !== c.id));
                      } catch (e) {
                        alert(e.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
