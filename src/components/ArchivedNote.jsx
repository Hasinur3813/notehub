/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete"; // MUI delete icon
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

const ArchivedNote = ({ note, onDelete, onRestore, handleSelectedNote }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isNoteClicked, setIsNoteClicked] = useState(false);

  useEffect(() => {
    isChecked
      ? handleSelectedNote(note.id, "selected")
      : handleSelectedNote(note.id, "notSelected");
  }, [isChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setIsNoteClicked(false);
  };

  const handleNoteClick = () => {
    setIsNoteClicked(true); // Show the checkbox when note is clicked
    setIsChecked(true);
  };

  return (
    <div
      onClick={handleNoteClick} // Handle note click
      className={` ${
        isChecked ? "border-red-500" : "border-gray-300"
      } className=" bg-secondary dark:bg-dark-primary shadow-sm hover:shadow-xl border border-muted dark:border-accent-1 rounded-2xl p-4 transition-all duration-200 relative"`}
    >
      <div className="flex items-start justify-between">
        {/* Title and checkbox (checkbox hidden until note is clicked) */}
        <div className="flex items-start">
          {isNoteClicked && ( // Show the checkbox only when the note is clicked
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded-full mr-3 mt-1 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          )}
          <h3 className="dark:text-secondary text-lg  font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {note.title.length > 15
              ? `${note.title.slice(0, 15)}...`
              : note.title}
          </h3>
        </div>

        {/* Action buttons */}
        {isChecked && (
          <div className="flex space-x-2">
            <button
              onClick={() => onRestore(note.id)}
              className="text-green-500 hover:text-green-700"
            >
              <RestoreFromTrashIcon sx={{ fontSize: 30 }} />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              <DeleteIcon sx={{ fontSize: 30 }} />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full mt-3">
        {note.description.length > 70
          ? `${note.description.slice(0, 70)}...`
          : note.description}
      </p>
    </div>
  );
};

export default ArchivedNote;
