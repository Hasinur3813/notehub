import React, { useContext } from "react";
import { SideBarContext } from "../context/SideBar";

const PageLayout = ({ children, className }) => {
  const { isSideBarOpen } = useContext(SideBarContext);
  return (
    <section
      className={` transition-all duration-200 ease-out overflow-y-auto w-full ${className} px-4 ${
        isSideBarOpen && "lg:ms-52"
      }`}
    >
      {children}
    </section>
  );
};

export default PageLayout;
