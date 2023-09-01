import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AllowedUserTypes = ({ allowedUserTypes, children }) => {
  const auth = useAuth();

  if (!allowedUserTypes.includes(auth.user?.userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
