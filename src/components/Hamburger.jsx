import React from "react";

const Hamburger = ({ close, setClose }) => {
  return (
    <div
      className={`${
        !close && "opacity-0 pointer-events-none"
      } transition-all duration-700`}
    >
      <button
        type="button"
        onClick={() => setClose(!close)}
        className="flex bg-muted absolute -right-24 p-x py-2 text-base font-semibold rounded ps-2 justify-between items-center cursor-pointer hover:bg-slate-300 duration-200"
      >
        Menu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
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
