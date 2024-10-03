import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useSideBar } from "../context/SideBar";

const Layout = () => {
  const { currentUser } = useContext(AuthContext);
  const { isSideBarOpen, setIsSideBarOpen } = useSideBar();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the sidebar and if the sidebar is open
      if (isSideBarOpen && !event.target.closest(".sidebar")) {
        setIsSideBarOpen(false);
      }
    };

    // Attach the click event listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen, setIsSideBarOpen]);

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
