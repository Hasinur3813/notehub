import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext(false);

export const useSideBar = () => {
  return useContext(SideBarContext);
};

const SideBarProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
