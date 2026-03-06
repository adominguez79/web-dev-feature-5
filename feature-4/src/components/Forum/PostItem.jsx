import { Link } from "react-router-dom";
import CommentList from "./CommentList";

const PostItem = ({ post }) => {
  const authorObj = post.get("author");
  const authorName = authorObj ? authorObj.get("username") : "Unknown Author";
  const authorId = authorObj ? authorObj.id : "";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>{post.get("Title")}</h2>
      <p>
        By:{" "}
        <Link
          to={`/Author/${authorId}`}
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          {authorName}
        </Link>
      </p>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.get("body")}</p>
      <hr style={{ margin: "15px 0" }} />
      <h4>Comments</h4>
      <CommentList postId={post.id} />
    </div>
  );
};

export default PostItem;
