import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../Services/UserService";
import ProfileCard from "../Components/Profile/ProfileCard";

const AuthorView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(id).then(setUser).catch(console.error);
  }, [id]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer" }}>
        ← Back
      </button>
      <ProfileCard user={user} />
    </div>
  );
};

export default AuthorView;