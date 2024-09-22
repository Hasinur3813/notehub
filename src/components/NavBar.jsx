import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import NavbarEnd from "./NavbarEnd";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [noteHubTheme, setNoteHubTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("noteHubTheme") || "light";
    setNoteHubTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const onThemeChange = () => {
    const newTheme = noteHubTheme === "light" ? "dark" : "light";
    localStorage.setItem("noteHubTheme", newTheme);
    setNoteHubTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="bg-secondary dark:bg-dark-primary shadow-sm fixed top-0 left-0 w-full">
      <nav className="container-fluid mx-auto py-4 px-3 md:px-4 flex justify-between items-center">
        <Link
          to="/"
          className="cursor-pointer flex justify-center items-center gap-2"
        >
          <img className="w-6 md:w-7" src={logo} alt="logo" />
          <span className="text-xl md:text-2xl text-text-light font-semibold dark:text-white">
            Note<span className="text-sky-500">Hub</span>
          </span>
        </Link>

        <NavbarEnd onThemeChange={onThemeChange} noteHubTheme={noteHubTheme} />
      </nav>
    </div>
  );
};

export default NavBar;
