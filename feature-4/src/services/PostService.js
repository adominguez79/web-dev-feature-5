import { getCommentsByPost, createComment, updateComment, deleteComment } from "../models/Comment";

export const fetchComments = async (postId) => {
  return await getCommentsByPost(postId);
};

export const addComment = async (postId, body) => {
  return await createComment(postId, body);
};

export const editComment = async (commentId, body) => {
  return await updateComment(commentId, body);
};

export const removeComment = async (commentId) => {
  return await deleteComment(commentId);
};
