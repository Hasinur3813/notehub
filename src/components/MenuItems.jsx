import React from "react";

const MenuItems = () => {
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
        <a
          className="dark:hover:bg-slate-700 hover:bg-muted p-2 rounded  block"
          href="/"
        >
          Notes
        </a>
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
        <a
          className="dark:hover:bg-slate-700 hover:bg-muted p-2 rounded  block"
          href="/"
        >
          Logout
        </a>
      </li>
    </ul>
  );
};

export default MenuItems;
