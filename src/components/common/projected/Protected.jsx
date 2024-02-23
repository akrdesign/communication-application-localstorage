import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users"));
  if (!loggedInUser?.email || users.length === 0) {
    return <Navigate to="/welcome" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
