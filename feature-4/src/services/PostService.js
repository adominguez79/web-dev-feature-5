
import Parse from "parse";

export const fetchAllPosts = async () => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);
  query.include("author");
  query.descending("createdAt");
  try {
    return await query.find();
  } catch (e) {
    // If the stored session token is invalid (e.g. user deleted from backend),
    // clear the current user and retry once without a session token.
    const msg = (e && (e.message || ""));
    const code = e && e.code;
    if (msg.toLowerCase().includes("invalid session token") || code === 209) {
      try {
        await Parse.User.logOut();
      } catch (ee) {
        // ignore logout errors
      }
      return await query.find();
    }
    throw e;
  }
};

export const createPost = async (title, body, authorObj) => {
  const Post = Parse.Object.extend("Post");
  const newPost = new Post();
  newPost.set("Title", title);
  newPost.set("body", body);
  newPost.set("author", authorObj);
  return await newPost.save();
};
