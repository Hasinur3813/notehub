import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen pt-14 overflow-hidden">
        {isLoggedIn && <SideBar />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
