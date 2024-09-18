import React from "react";

const Note = () => {
  return (
    <div class="bg-secondary shadow-sm border border-muted rounded-lg p-6 transition-colors duration-100">
      <div class="flex flex-col sm:flex-row justify-between md:items-center mb-4">
        <h2 class="text-lg md:text-xl font-bold text-gray-800 md:w-1/2 mb-3 md:mb-0">
          My personal note
        </h2>
        <span class="text-sm text-gray-500">Created: Sep 14, 2024</span>
      </div>
      <p class="text-gray-600 mb-4">
        This is a sample note content for logged-in user...
      </p>
      <a
        href="./page/viewNote.html"
        class="mt-4 px-4 py-2 bg-accent-1 text-white font-semibold rounded hover:bg-blue-500"
      >
        View Note
      </a>
    </div>
  );
};

export default Note;
