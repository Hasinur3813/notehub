import React from "react";
import { Link } from "react-router-dom";

const ForEmptyNotes = () => {
  return (
    <div className="col-span-3 flex flex-col items-center justify-center p-10 rounded-lg space-y-4">
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
        Empty!
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
        Create your first note to get started.
      </p>
      <Link
        to="/create-note"
        className="bg-accent-1 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 hover:bg-accent-2 hover:shadow-xl"
      >
        Create Note
      </Link>
    </div>
  );
};

export default ForEmptyNotes;
