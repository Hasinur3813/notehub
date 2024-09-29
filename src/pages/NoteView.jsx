import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNotes } from "../context/notesContext";

const NoteView = () => {
  const { notes, deleteNote } = useNotes();
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filteredNote =
    state && state.note ? state.note : notes.find((note) => note.id === id);

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteNote(id);
      setLoading(false);
      navigate("/notes");
    } catch {
      setLoading(false);
      setError("Failed to delete note!");
    }
  };

  return (
    <PageLayout className="flex justify-center">
      <div className="max-w-screen-xl">
        <div className="sticky top-0 bg-primary dark:bg-dark-secondary pt-14 mt-2 pb-2">
          <h1 className="text-xl md:text-2xl font-semibold text-dark-primary dark:text-secondary mb-4">
            {filteredNote.title}
          </h1>

          <div className="flex justify-between space-x-4">
            <span className="text-gray-500 text-sm">
              <strong>Category:</strong> {filteredNote.category}
            </span>
            <span className="text-gray-500 text-sm">
              <strong>Created:</strong> {filteredNote.createdAt}
            </span>
          </div>

          <div className=" bg-primary dark:bg-dark-secondary pb-1 mt-8 justify-between items-center flex">
            <p className="font-semibold text-lg dark:text-secondary">Content</p>

            <div className="flex gap-3">
              <Link to="/create-note" state={{ note: filteredNote }}>
                <EditNoteIcon
                  sx={{ fontSize: 35 }}
                  className="text-accent-1 cursor-pointer"
                />
              </Link>
              {loading && (
                <p className="text-lg text-red-500 font-semibold">
                  Deleting...
                </p>
              )}
              {!loading && (
                <DeleteIcon
                  onClick={handleDelete}
                  sx={{ fontSize: 30 }}
                  className="text-accent-2 cursor-pointer"
                />
              )}
            </div>
          </div>
          <hr className=" dark:bg-accent-1 shadow" />
        </div>

        <div className=" text-dark-secondary mb-6 dark:text-primary overflow-y-auto">
          <p>{filteredNote.description}</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default NoteView;
