import Parse from "parse";

export const getUserById = async (id) => {
  const query = new Parse.Query(Parse.User);
  return await query.get(id);
};

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("password", newUser.password);
  user.set("email", newUser.email);
  user.set("bio", newUser.firstName);
  user.set("interests", newUser.lastName);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password);
    return user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
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

// Update user data
export const updateUser = async (data) => {
  try {
    const user = Parse.User.current();

    if (!user) {
      throw new Error("No logged-in user");
    }

    Object.keys(data).forEach((key) => {
      user.set(key, data[key]);
    });

    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error("Update user error:", error.message);
    throw error;
  }
};
export const saveProfile = async () => {
  try {
    let user = currentUser;
    user.set("username", username);
    user.set("Bio", bio);
    user.set("Interests", interests);
    await user.save();
    alert("Profile Saved!");
  } catch (e) {
    alert(e.message);
  }
};
