import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import avatar from "../assets/avatar.png";

const NavbarEnd = ({ onThemeChange, noteHubTheme }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // get the profile photo if any
    if (currentUser && currentUser.photoURL) {
      setUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center gap-x-3">
      {/* navbar logo start */}
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          onChange={onThemeChange}
          checked={noteHubTheme === "dark"}
          value={noteHubTheme}
        />

        {/* sun icon */}
        <svg
          className="swap-off h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-on h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      {currentUser ? (
        <div className="flex justify-center items-center gap-3 sm:gap-5">
          <Link
            className="  lg:text-lg rounded-md text-accent-1"
            to="/create-note"
          >
            <CreateIcon />
          </Link>
          <div className="hidden sm:flex justify-center items-center gap-1">
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-7 h-7">
                <img
                  className="rounded-full w-full h-full object-cover ring-1 ring-offset-1"
                  alt="profile_photo"
                  src={url ? url : avatar}
                />
              </div>

              <h4 className=" text-gray-500 text-base">
                {currentUser.displayName}
              </h4>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            type="button"
            title="Logout"
            className="hidden sm:flex bg-slate-100 border border-accent-1 font-medium text-red-400 rounded px-3  py-1 items-center"
          >
            <LogoutIcon sx={{ fontSize: 20 }} />
          </button>

          <div className="dropdown dropdown-end sm:hidden">
            <div tabIndex={0} role="button" className="px-2">
              <div className="flex flex-col gap-[1px]">
                <div className="w-7 h-7">
                  <img
                    className="rounded-full w-full h-full object-cover ring-1 ring-offset-1"
                    alt="profile_photo"
                    src={url ? url : avatar}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-[1] min-w-52 mt-7 text-center p-2 shadow"
            >
              <li>
                <Link className="text-base" to="/profile">
                  User Profile
                </Link>
              </li>

              <li>
                <Link className="text-base" to="/notes">
                  Notes
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-red-500 text-base"
                >
                  Logout <LogoutIcon sx={{ fontSize: 20 }} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <Link
            to="/signup"
            className="lg:ms-4 bg-accent-1 text-white rounded px-4 lg:text-lg hover:bg-accent-2 py-1 hidden sm:block"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="bg-slate-100 border border-accent-1 lg:text-lg text-accent-1 font-medium hover:bg-slate-200 transition duration-200 rounded px-4  py-1"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarEnd;
