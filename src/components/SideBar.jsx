import React, { useContext } from "react";
import Hamburger from "./Hamburger";
import MenuItems from "./MenuItems";
import { SideBarContext } from "../context/SideBar";

const SideBar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);

  return (
    <div
      className={`w-52 h-full transition-all duration-200 ease-out ${
        !isSideBarOpen && "-translate-x-full"
      } fixed top-16 left-0 bg-secondary dark:bg-dark-primary z-10 lg:mt-px`}
    >
      <Hamburger
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-text-light dark:text-text-dark">
            Menu
          </h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 cursor-pointer hover:rotate-90 duration-200 transition-transform"
            onClick={() => setIsSideBarOpen(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <hr />

        <MenuItems />
      </div>
    </div>
  );
};

export default SideBar;
