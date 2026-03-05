import Parse from "../services/ParseConfig";

export const getCommentsByPost = async (PostId) =>
{
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);

    //Creating pointer to specific forum
    const postPointer = new Parse.Object("Post");
    postPointer.id = PostId;

    //Many to One relationship
    query.equalTo("parentPost", postPointer);

    query.include("author");

    return await query.find();

};

export const createComment = async (PostId, body) => {
    const Comment = Parse.Object.extend("Comment");
    const comment = new Comment();

    // set body
    comment.set("body", body);

    // parent post pointer
    const postPointer = new Parse.Object("Post");
    postPointer.id = PostId;
    comment.set("parentPost", postPointer);

    // set author to current user
    const current = Parse.User.current();
    if (current) comment.set("author", current);

    // set public ACL so others can read
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(current, true);
    comment.setACL(acl);

    return await comment.save();
}

export const updateComment = async (commentId, body) => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);
    const comment = await query.get(commentId);
    comment.set("body", body);
    return await comment.save();
}

export const deleteComment = async (commentId) => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);
    const comment = await query.get(commentId);
    return await comment.destroy();
}