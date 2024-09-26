import React from "react";

const Category = ({ category, onChange }) => {
  return (
    <div className="">
      <select
        value={category}
        onChange={onChange}
        className="w-full px-4 py-3 border border-muted shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:border focus:border-accent-1 bg-secondary dark:bg-dark-primary dark:text-secondary dark:border dark:border-accent-1"
      >
        <option value="">Select category</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="ideas">Ideas</option>
        <option value="others">Others</option>
      </select>
    </div>
  );
};

export default Category;
