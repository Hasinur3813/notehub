import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen pt-16 overflow-hidden">
        {isLoggedIn && <SideBar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
