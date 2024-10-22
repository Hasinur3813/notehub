import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import avatar from "../assets/avatar.png";

const MenuItems = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-between items-start ">
      <ul className="space-y-2 py-2 dark:text-secondary w-full">
        <li className="">
          <Link
            to="/profile"
            className="hover:bg-muted flex gap-2 dark:hover:bg-slate-700 p-2 rounded"
          >
            <div className="w-7 h-7">
              <img
                className="rounded-full w-full h-full object-cover ring-1 ring-offset-1"
                alt="profile_photo"
                src={url ? url : avatar}
              />
            </div>

            <h4 className=" text-gray-500 text-base">
              {currentUser && currentUser.displayName
                ? currentUser.displayName.length > 15
                  ? currentUser.displayName.slice(0, 15)
                  : currentUser.displayName
                : "Anonymous"}
            </h4>
          </Link>
          <hr />
        </li>
        <li className="">
          <Link
            className={`${
              pathname === "/notes" ? "text-accent-1" : "text-secondaryColor"
            }
             dark:hover:bg-slate-700 hover:bg-muted hover:translate-x-1 transition-all duration-150 ease-linear p-2 rounded  block`}
            to="/notes"
          >
            Notes
          </Link>
        </li>
        <li className="">
          <Link
            className={`${
              pathname === "/archive" ? "text-accent-1" : "text-secondaryColor"
            }
             dark:hover:bg-slate-700 hover:bg-muted hover:translate-x-1 transition-all duration-150 ease-linear p-2 rounded  block`}
            to="/archive"
          >
            Archive
          </Link>
        </li>
        <hr className="text-muted rounded" />
      </ul>

      <div className=" w-full">
        <ul>
          <li className="">
            <button
              onClick={handleLogout}
              type="button"
              className="dark:hover:bg-slate-700 text-red-400 text-base hover:bg-muted p-2 w-full text-left rounded"
            >
              Logout <LogoutIcon sx={{ fontSize: 20 }} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuItems;
