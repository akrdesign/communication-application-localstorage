import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRegister = ({ children }) => {
  const isRegistered = sessionStorage.getItem("isRegistered");
  if (!isRegistered) {
    return <Navigate to="/welcome" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRegister;
