import { Link } from "react-router-dom";
import { logout, getCurrentUser } from "../../Services/UserService";

const NavBar = () => {

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleShowUser = () => {
    const user = getCurrentUser();
    console.log("Current user:", user);
  };

  return (
    <nav style={{ padding: "15px", background: "#333", color: "white", marginBottom: "20px" }}>
      
      <Link 
        to="/forum" 
        style={{ color: "white", textDecoration: "none", fontWeight: "bold", marginRight: "20px" }}
      >
        Message Board
      </Link>

      <Link 
        to="/profile" 
        style={{ color: "white", textDecoration: "none", fontWeight: "bold", marginRight: "20px" }}
      >
        My Profile
      </Link>

      <button 
        onClick={handleShowUser}
        style={{ marginRight: "10px" }}
      >
        Show Current User
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>

    </nav>
  );
};

export default NavBar;