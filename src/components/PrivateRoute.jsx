import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isUserSigned, setIsUserSigned] = useState(true);
  useEffect(() => {
    if (!isUserSigned) {
      navigate("/login");
    }
  }, [isUserSigned, navigate]);

  return isUserSigned ? <Outlet /> : null;
};

export default PrivateRoute;
