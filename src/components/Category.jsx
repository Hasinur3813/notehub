import React from "react";

const Category = ({ category, onChange, className }) => {
  return (
    <div>
      <select
        value={category}
        onChange={onChange}
        className={`${className}  w-full px-4 py-3 border border-muted shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:border focus:border-accent-1 bg-secondary dark:bg-dark-primary dark:text-secondary dark:border dark:border-accent-1`}
      >
        <option value="">Select category</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Ideas">Ideas</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default Category;
