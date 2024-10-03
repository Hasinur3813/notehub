import React from "react";
import { useSideBar } from "../context/SideBar";

const PageLayout = ({ children, className }) => {
  const { isSideBarOpen } = useSideBar();
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
