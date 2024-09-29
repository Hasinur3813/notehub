import React from "react";

const FetchingNotes = () => {
  return (
    <h3 className="text-lg md:text-2xl font-semibold flex items-center justify-center col-span-3 gap-3 text-gray-700">
      <span className="loading loading-spinner loading:sm lg:loading-lg animate-spin text-accent-1"></span>
      <span className="text-accent-1">Fetching Notes...</span>
    </h3>
  );
};

export default FetchingNotes;
