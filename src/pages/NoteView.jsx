import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useParams, Link, useLocation } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNotes } from "../context/notesContext";
import Modal from "../components/Modal";

const NoteView = () => {
  const { notes, deleteNote } = useNotes();
  const { id } = useParams();
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);

  const filteredNote =
    state && state.note ? state.note : notes.find((note) => note.id === id);
  console.log(filteredNote);

  return (
    <PageLayout className="flex justify-center">
      <div className="max-w-screen-xl w-full">
        {showModal && (
          <Modal
            onAction={() => deleteNote(id)}
            setShowModal={setShowModal}
            text="Are your sure you want to delete this note?"
          />
        )}
        {/* header */}
        <div className="sticky top-0 bg-primary dark:bg-dark-secondary pt-14 mt-2 pb-2">
          <h1 className="text-xl md:text-2xl font-semibold text-dark-primary dark:text-secondary mb-4">
            {filteredNote.title}
          </h1>

          {/* catergory and created date */}
          <div className="flex justify-between space-x-4">
            <span className="text-gray-500 text-sm">
              <strong>Category: </strong>
              {"  "}
              <span className="bg-accent-1 px-2 py-1 text-primary rounded">
                {filteredNote.category}
              </span>
            </span>
            <span className="text-gray-500 text-sm">
              <strong>Created:</strong>
              {filteredNote.createdAt}
            </span>
          </div>
          <hr className="mt-4" />

          {/* action center */}

          <div className=" bg-primary dark:bg-dark-secondary pb-1 mt-12 justify-between items-center flex">
            <p className="font-semibold text-lg dark:text-secondary">Content</p>

            <div className="flex justify-center items-center gap-3">
              <Link
                to="/create-note"
                state={{ note: { ...filteredNote, id: id } }}
              >
                <EditNoteIcon
                  sx={{ fontSize: 35 }}
                  className="text-accent-1 cursor-pointer"
                />
              </Link>

              <DeleteIcon
                onClick={() => setShowModal(true)}
                sx={{ fontSize: 28 }}
                className="text-red-600 cursor-pointer"
              />
            </div>
          </div>
          <hr />
        </div>

        <div className=" text-dark-secondary mb-6 dark:text-primary overflow-y-auto">
          <p className="whitespace-pre-wrap">{filteredNote.description}</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default NoteView;
