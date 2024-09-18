import React, { createContext, useState } from "react";

export const SideBarContext = createContext(false);

const SideBarProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
