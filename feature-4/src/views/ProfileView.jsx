// src/views/ProfileView.jsx
import { useState } from "react";
import { getOrCreateUser, getCurrentUser, logout} from "../Services/UserService";

const ProfileView = () => {
  const currentUser = getCurrentUser();
  const [username, setUsername] = useState(currentUser?.get("username") || "");
  const [bio, setBio] = useState(currentUser?.get("Bio") || ""); // Capital B
  const [interests, setInterests] = useState(currentUser?.get("Interests") || ""); // Capital I

  const saveProfile = async () => {
    try {
      let user = currentUser;
      if (!user) {
        if (!username?.trim()) {
          alert("Please enter a username to create a profile.");
          return;
        }
        user = await getOrCreateUser(username.trim());
      }
      user.set("username", username);
      user.set("Bio", bio);
      user.set("Interests", interests);
      await user.save();
      alert("Profile Saved!");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Your Profile</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" /><br/>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" /><br/>
      <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Interests" /><br/>
      <button onClick={saveProfile}>Save Changes</button>
    </div>
  );
};

export default ProfileView;