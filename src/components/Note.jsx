import React from "react";
import { Link } from "react-router-dom";

const Note = ({ id, title, description, createdAt }) => {
  return (
    <div className="bg-secondary dark:bg-dark-primary shadow-sm border border-muted dark:border-accent-1 rounded-lg p-4 md:p-6 transition-colors duration-100">
      <div className="mb-4">
        <p className="text-sm flex text-gray-500 mb-2">
          <span className="ms-auto">Created: {createdAt}</span>
        </p>
        <h2 className="dark:text-secondary text-lg  font-bold text-gray-800 ">
          {title}
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-500 mb-4">{description}</p>
      <Link
        to={`/notes/note/${id}`}
        className="w-full block text-center mt-7 px-4 py-2 bg-accent-1 dark:bg-dark-secondary text-white dark:text-accent-1 font-semibold rounded hover:bg-accent-2"
      >
        View Note
      </Link>
    </div>
  );
};

export default Note;
