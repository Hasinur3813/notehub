import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { useParams, Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNotes } from "../context/notesContext";
import Modal from "../components/Modal";

const NoteView = () => {
  const { fetchSingleNote, updateNote } = useNotes();
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setError(null);
        const note = await fetchSingleNote(id);
        setNote(note);
        setLoading(false);
      } catch {
        setLoading(false);
        setError("Not found!");
      }
    };
    fetchNote();
  }, [fetchSingleNote, id]);

  const handleUpdateNote = async () => {
    const updatedNote = {
      ...note,
      isTrashed: true,
    };

    await updateNote(id, updatedNote);
  };

  return (
    <PageLayout className="flex justify-center">
      {loading && (
        <div className="flex justify-center items-center w-full h-full">
          <span className="loading loading-spinner loading-lg text-accent-1"></span>
        </div>
      )}
      {error && !loading && (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-lg text-red-500 font-semibold">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="max-w-screen-xl w-full">
          {showModal && (
            <Modal
              onAction={handleUpdateNote}
              setShowModal={setShowModal}
              text="Are your sure you want to delete this note?"
            />
          )}
          {/* header */}
          <div className="sticky top-0 bg-primary dark:bg-dark-secondary pt-14 mt-2 pb-2">
            <h1 className="text-xl md:text-2xl font-semibold text-dark-primary dark:text-secondary mb-4">
              {note?.title}
            </h1>

            {/* catergory and created date */}
            <div className="flex justify-between space-x-4">
              <span className="text-gray-500 text-sm leading-loose">
                <strong>Category: </strong>
                {"  "}
                <span className="bg-accent-1 px-2 py-1 text-primary rounded">
                  {note?.category}
                </span>
              </span>
              <span className="text-gray-500 text-sm leading-loose">
                <strong>Created: </strong>
                {note?.createdAt.toDate().toLocaleString("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                  hour12: true,
                })}
              </span>
            </div>
            <hr className="mt-4" />

            {/* action center */}

            <div className=" bg-primary dark:bg-dark-secondary pb-1 mt-12 justify-between items-center flex">
              <p className="font-semibold text-lg dark:text-secondary">
                Content
              </p>

              <div className="flex justify-center items-center gap-3">
                <Link to="/create-note" state={{ note: { ...note, id: id } }}>
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
            <p className="whitespace-pre-wrap break-words">
              {note?.description}
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default NoteView;
