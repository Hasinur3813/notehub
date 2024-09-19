import React from "react";

const Note = () => {
  return (
    <div className="bg-secondary dark:bg-dark-primary shadow-sm border border-muted dark:border-accent-1 rounded-lg p-4 md:p-6 transition-colors duration-100">
      <div className="mb-4">
        <p className="text-sm flex text-gray-500 mb-2">
          <span className="ms-auto">Created: Sep 14, 2024</span>
        </p>
        <h2 class="dark:text-secondary text-lg md:text-xl font-bold text-gray-800 ">
          My personal note
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-500 mb-4">
        This is a sample note content for logged-in user and this sis my fie...
      </p>
      <a
        href="/"
        className="w-full block text-center mt-7 px-4 py-2 bg-accent-1 dark:bg-dark-secondary text-white dark:text-accent-1 font-semibold rounded hover:bg-blue-500"
      >
        View Note
      </a>
    </div>
  );
};

export default Note;
