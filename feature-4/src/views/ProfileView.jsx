// src/views/ProfileView.jsx
import { useState } from "react";
import Parse from "parse";

const ProfileView = () => {
  const user = Parse.User.current();
  const [username, setUsername] = useState(user?.get("username") || "");
  const [bio, setBio] = useState(user?.get("Bio") || ""); // Capital B
  const [interests, setInterests] = useState(user?.get("Interests") || ""); // Capital I

  const saveProfile = async () => {
    try {
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