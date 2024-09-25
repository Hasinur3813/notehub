import React, { useContext } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
