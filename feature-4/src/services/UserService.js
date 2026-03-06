import Parse from "parse";


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
  await Parse.User.logIn(username, "dummy_pass_123");
  return user;
};

//Logout user
export const logout = async () => {
  await Parse.User.logOut();
};

// Get current logged in user
export const getCurrentUser = () => {
  return Parse.User.current();
};