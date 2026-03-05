import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  if (posts.length === 0) return <p>No posts yet. Be the first!</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;