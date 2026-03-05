import Parse from "../services/ParseConfig";

// Fetches a user for the AuthorView
export const getUserById = async (id) => {
  const query = new Parse.Query(Parse.User);
  return await query.get(id);
};

export const getOrCreateUser = async (username) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("username", username);
  let user = await query.first();

  if (!user) {
    user = new Parse.User();
    user.set("username", username);
    user.set("password", "dummy_pass_123");

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    user.setACL(acl);

    try {
      await user.signUp();
    } catch (e) {
      // On any signUp error, attempt to fetch an existing user with that username
      const reQuery = new Parse.Query(Parse.User);
      reQuery.equalTo("username", username);
      user = await reQuery.first();
      if (user) return user;
      throw e;
    }
  }
  return user;
};