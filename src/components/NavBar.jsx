import React from "react";
import logo from "../assets/logo.png";
import NavbarEnd from "./NavbarEnd";

const NavBar = () => {
  return (
    <div className="bg-secondary shadow-sm fixed top-0 left-0 w-full">
      <nav className="container-fluid mx-auto py-3 px-3 md:px-4 flex justify-between items-center">
        <a
          href="/"
          className="cursor-pointer flex justify-center items-center gap-2"
        >
          <img className="w-5 md:w-7" src={logo} alt="logo" />
          <span className="text-lg md:text-2xl text-text-light font-semibold">
            NoteHub
          </span>
        </a>

        <NavbarEnd />
      </nav>
    </div>
  );
};

export default NavBar;
