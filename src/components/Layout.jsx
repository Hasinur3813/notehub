import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useSideBar } from "../context/SideBar";

const Layout = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen pt-14 overflow-hidden">
        {currentUser && <SideBar />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
