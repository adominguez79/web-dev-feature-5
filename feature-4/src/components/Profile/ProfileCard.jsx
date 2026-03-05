const ProfileCard = ({ user }) => {
  if (!user) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

  // Safely grab the data from your Parse User object
  const username = user.get("username") || "Unknown User";
  const bio = user.get("Bio") || "This user hasn't written a bio yet.";
  const interests = user.get("Interests") || "No interests listed.";

  return (
    <div style={{ border: "1px solid #ddd", padding: "30px", borderRadius: "8px", background: "#f9f9f9", maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif" }}>
      
      <h2 style={{ margin: "0 0 5px 0", textAlign: "center", fontSize: "2rem" }}>
        {username}
      </h2>
      <p style={{ color: "gray", textAlign: "center", marginBottom: "20px" }}>
        Message Board Member
      </p>
      
      <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #ddd" }} />
      
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>About Me</h4>
        <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
          {bio}
        </p>
      </div>
      
      <div>
        <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>Interests</h4>
        <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
          {interests}
        </p>
      </div>
      
    </div>
  );
};

export default ProfileCard;