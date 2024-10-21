import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { useSideBar } from "../context/SideBar";

const MenuItems = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const { setIsSideBarOpen } = useSideBar();
  const [url, setUrl] = useState("");
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    const screenSize = window.innerWidth;

    setActiveLink(link);

    // close the sidebar after moving another page
    if (screenSize < "768") {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-between items-center ">
      <ul className="space-y-2 py-2 dark:text-secondary">
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
              {currentUser.displayName.length > 15
                ? currentUser.displayName.slice(0, 15)
                : currentUser.displayName}
            </h4>
          </Link>
          <hr />
        </li>
        <li className="">
          <Link
            onClick={() => handleLinkClick("notes")}
            className={`${
              activeLink === "notes" ? "text-accent-1" : "text-secondaryColor"
            } dark:hover:bg-slate-700 hover:bg-muted hover:translate-x-1 transition-all duration-150 ease-linear p-2 rounded  block`}
            to="/notes"
          >
            Notes
          </Link>
        </li>
        <li className="">
          <Link
            onClick={() => handleLinkClick("archive")}
            className={`${
              activeLink === "archive" ? "text-accent-1" : "text-secondaryColor"
            } dark:hover:bg-slate-700 hover:bg-muted hover:translate-x-1 transition-all duration-150 ease-linear p-2 rounded  block`}
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
