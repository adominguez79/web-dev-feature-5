import Parse from "parse";

export const fetchComments = async (postId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);

  //Creating pointer to specific forum
  const postPointer = new Parse.Object("Post");
  postPointer.id = postId;

  //Many to One relationship
  query.equalTo("parentPost", postPointer);

  query.include("author");

  return await query.find();
};

export const addComment = async (postId, body) => {
  const Comment = Parse.Object.extend("Comment");
  const comment = new Comment();

  // set body
  comment.set("body", body);

  // parent post pointer
  const postPointer = new Parse.Object("Post");
  postPointer.id = postId;
  comment.set("parentPost", postPointer);

  // set author to current user
  const current = Parse.User.current();
  if (current) comment.set("author", current);

  // set public ACL so others can read
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  if (current) {
    acl.setWriteAccess(current, true);
  }
  comment.setACL(acl);

  try {
    return await comment.save();
  } catch (error) {
    console.error("Parse Save Error:", error);
    throw error;
  }
};

export const editComment = async (commentId, body) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  const comment = await query.get(commentId);
  comment.set("body", body);
  return await comment.save();
};

export const removeComment = async (commentId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  const comment = await query.get(commentId);
  try {
    return await comment.destroy();
  } catch (error) {
    console.error("Parse Delete Error:", error);
    throw error;
  }
};
