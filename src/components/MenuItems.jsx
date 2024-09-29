import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

const MenuItems = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <ul className="space-y-2 py-2 dark:text-secondary">
      <li className="">
        <a
          className="hover:bg-muted dark:hover:bg-slate-700 p-2 rounded  block"
          href="/"
        >
          Dashboard
        </a>
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
        <a
          className="dark:hover:bg-slate-700 hover:bg-muted p-2 rounded  block"
          href="/"
        >
          Archieve
        </a>
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
