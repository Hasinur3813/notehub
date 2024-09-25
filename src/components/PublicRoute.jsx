import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PublicRoute = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return !currentUser && <Outlet />;
};

export default PublicRoute;
