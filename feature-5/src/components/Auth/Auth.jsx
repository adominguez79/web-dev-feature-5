import React from "react";
import { Link } from "react-router-dom";
import AuthLogin from "./AuthLogin";

const AuthModule = () => {
  return (
    <div>
      <AuthLogin />
      <br />
      <br />
      {/* TODO: Add registration button that links to register form */}
    </div>
  );
};

export default AuthModule;
