import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
const CreateNoteIcon = () => {
  return (
    <div
      title="Create Note"
      className="fixed  bottom-8 right-5 w-14 h-14 rounded-full bg-accent-1 flex justify-center items-center border  shadow-md shadow-cyan-400/50 border-accent-1 first-letter"
    >
      <Link
        className="text-primary w-full h-full flex justify-center items-center"
        to="/create-note"
      >
        <AddIcon sx={{ fontSize: 30 }} />
      </Link>
    </div>
  );
};

export default CreateNoteIcon;
