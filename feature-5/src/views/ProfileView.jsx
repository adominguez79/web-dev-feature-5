import { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "../services/AuthService";

const ProfileView = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser();

      if (user) {
        setCurrentUser(user);
        setUsername(user.get("username") || "");
        setBio(user.get("Bio") || "");
        setInterests(user.get("Interests") || "");
      }
    };

    loadUser();
  }, []);

  const saveProfile = async () => {
    try {
      const updatedUser = await updateUser({
        username,
        Bio: bio,
        Interests: interests,
      });

      setCurrentUser(updatedUser);
      alert("Profile Saved!");
    } catch (e) {
      alert(e.message);
    }
  };

  // 🚨 Prevent rendering before user loads
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Your Profile</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <br />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />
      <br />
      <input
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="Interests"
      />
      <br />
      <button onClick={saveProfile}>Save Changes</button>
    </div>
  );
};

export default ProfileView;
