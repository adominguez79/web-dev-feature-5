import React from "react";

const AuthForm = ({ user, onChange, onSubmit, mode }) => {
  const isRegister = mode === "register";

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>{isRegister ? "Create an Account" : "Login to Message Board"}</h2>

      <form onSubmit={onSubmit}>
        {/* Registration Only Fields */}
        {isRegister && (
          <>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName || ""}
                onChange={onChange}
                placeholder="first name"
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName || ""}
                onChange={onChange}
                placeholder="last name"
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="username"
                name="username"
                value={user.username}
                onChange={onChange}
                placeholder="username"
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
          </>
        )}

        {/* Common Fields */}

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            placeholder="email"
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            placeholder="password"
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%", // Made full width for better look
            fontSize: "16px"
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;