import React from "react";

const Category = () => {
  return (
    <select className="select dark:bg-dark-primary bg-muted border border-accent-1 focus:border-accent-1 focus:outline-none text-base">
      <option selected>All Categories</option>
      <option>Work</option>
      <option>Personal</option>
      <option>Others</option>
    </select>
  );
};

export default Category;
