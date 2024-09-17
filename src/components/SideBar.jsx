import React, { useState } from "react";
import Hamburger from "./Hamburger";
import MenuItems from "./MenuItems";

const SideBar = () => {
  const [close, setClose] = useState(false);

  return (
    <div
      className={`w-52 h-full transition-all duration-200 ease-in ${
        close && "-translate-x-full"
      } fixed top-16 left-0 bg-white z-10 lg:mt-px`}
    >
      <Hamburger close={close} setClose={setClose} />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-text-light">Menu</h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 cursor-pointer hover:rotate-90 duration-200 transition-transform"
            onClick={() => setClose(true)}
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
