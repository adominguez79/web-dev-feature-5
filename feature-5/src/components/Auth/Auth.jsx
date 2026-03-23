import React from "react";
import { Link } from "react-router-dom";
import AuthLogin from "./AuthLogin";

const AuthModule = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* The Login Form Component */}
      <AuthLogin />

      <div style={{ marginTop: "20px", fontFamily: "sans-serif" }}>
        <p style={{ color: "#666" }}>New to the Message Board?</p>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "8px 20px",
              background: "transparent",
              color: "#007bff",
              border: "2px solid #007bff",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Create an Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthModule;