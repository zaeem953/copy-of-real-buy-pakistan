import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// Private component to hide other componenet if user is not logged in
const PrivateComponenet = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateComponenet;
