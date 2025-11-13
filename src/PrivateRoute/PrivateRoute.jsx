import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Outlet, Navigate } from "react-router";
import Loading from "../components/Loading";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
