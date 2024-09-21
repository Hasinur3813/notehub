import React from "react";

const SearchInput = () => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      className="input border-2 border-muted w-full max-w-md focus:outline-none focus:border-accent-1 text-base"
    />
  );
};

export default SearchInput;
