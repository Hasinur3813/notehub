import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

const MenuItems = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [url, setUrl] = useState("");

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
            {currentUser.displayName.length > 10
              ? currentUser.displayName.slice(0, 10)
              : currentUser.displayName}
          </h4>
        </Link>
        <hr />
      </li>
      <li className="">
        <Link
          className="dark:hover:bg-slate-700 hover:bg-muted p-2 rounded  block"
          to="/notes"
        >
          Notes
        </Link>
      </li>
      <li className="">
        <Link
          className="dark:hover:bg-slate-700 hover:bg-muted p-2 rounded  block"
          to="/"
        >
          Archive
        </Link>
      </li>
      <hr className="text-muted rounded" />
      <li className="">
        <button
          onClick={handleLogout}
          type="button"
          className="text-red-400 text-base hover:bg-muted p-2 w-full text-left rounded"
        >
          Logout <LogoutIcon sx={{ fontSize: 20 }} />
        </button>
      </li>
    </ul>
  );
};

export default MenuItems;
