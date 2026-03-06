import { Link } from "react-router-dom";
import { getCurrentUser } from "../../Services/UserService";

const NavBar = () => {
  return (
    <nav
      style={{
        padding: "15px",
        background: "#333",
        color: "white",
        marginBottom: "20px",
      }}
    >
      <Link
        to="/forum"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
          marginRight: "20px",
        }}
      >
        Message Board
      </Link>

      <Link
        to="/profile"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
          marginRight: "20px",
        }}
      >
        My Profile
      </Link>
    </nav>
  );
};

export default NavBar;
