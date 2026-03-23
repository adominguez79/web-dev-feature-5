import React, { useState } from "react";
import { loginUser } from "../../services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await loginUser(user.email, user.password);

      navigate("/forum");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <AuthForm
        user={user}
        onChange={onChangeHandler}
        onSubmit={handleLogin}
        mode={"login"}
      />
    </div>
  );
};

export default AuthLogin;
