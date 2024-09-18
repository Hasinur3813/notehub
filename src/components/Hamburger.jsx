import React from "react";

const Hamburger = ({ isSideBarOpen, setIsSideBarOpen }) => {
  return (
    <div
      className={`${
        isSideBarOpen && "opacity-0 pointer-events-none"
      } transition-all duration-700`}
    >
      <button
        type="button"
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className="flex bg-muted dark:bg-dark-primary dark:text-primary absolute -right-[30px] md:-right-[80px] px-2 py-2 text-base font-semibold rounded ps-2 justify-between items-center cursor-pointer hover:bg-slate-300 duration-200"
      >
        <span className="hidden md:block">Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="size-5 text-accent-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hamburger;
