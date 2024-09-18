import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen pt-14 overflow-hidden">
        {isLoggedIn && <SideBar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
