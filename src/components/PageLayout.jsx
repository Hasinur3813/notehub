import React, { useContext, useEffect } from "react";
import { useSideBar } from "../context/SideBar";
import { AuthContext } from "../context/authContext";

const PageLayout = ({ children, className }) => {
  const { isSideBarOpen, setIsSideBarOpen } = useSideBar();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const screenSize = window.innerWidth;

      // Check if the click is outside the sidebar and if the sidebar is open
      if (
        isSideBarOpen &&
        !event.target.closest(".sidebar") &&
        screenSize < "768"
      ) {
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
    <section
      className={`page-container transition-all duration-200 ease-out overflow-y-auto w-full ${className} px-4 ${
        isSideBarOpen && "md:ms-52"
      }`}
    >
      {children}
    </section>
  );
};

export default PageLayout;
