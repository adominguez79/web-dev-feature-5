import React, { useState } from "react";
import { createUser } from "../../services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    interests: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const userCreated = await createUser(newUser);

      alert(`${userCreated.get("firstName")}, you successfully registered!`);

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try a different email.");
    }
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        mode="register"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AuthRegister;
