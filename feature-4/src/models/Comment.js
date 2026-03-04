import Parse from "parse";

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