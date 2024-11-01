import React from "react";
import { Link } from "react-router-dom";

const Note = ({ id, title, description, createdAt }) => {
  return (
    <Link to={`/notes/note/${id}`}>
      <div className="note hover:scale-90 bg-secondary dark:bg-dark-primary shadow-sm border border-muted dark:border-accent-1 rounded-2xl p-4 transition-all duration-200 relative">
        <div>
          <p className="text-sm flex text-gray-500 mb-2">
            <span className="ms-auto">Created: {createdAt}</span>
          </p>
          <h2 className="dark:text-secondary text-lg  font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {title}
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Note;
