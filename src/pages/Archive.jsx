import React, { useContext, useEffect, useState } from "react";
import { useNotes } from "../context/notesContext";
import { AuthContext } from "../context/authContext";
import PageLayout from "../components/PageLayout";
import { CircularProgress } from "@mui/material";
import ArchivedNote from "../components/ArchivedNote"; // Use your custom Note component
import { Button } from "../components/Button";
import Modal from "../components/Modal";

const Archive = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchUserNotes, deleteNote, batchUpdate } = useNotes();
  const [trashed, setTrashed] = useState([]);
  const [loading, setLoading] = useState({ fetchNote: true, restore: false });
  const [error, setError] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [singleNoteId, setSingleNoteId] = useState(null);

  useEffect(() => {
    const getTrashed = async () => {
      try {
        setError(null);
        const notes = await fetchUserNotes(currentUser.uid, true); // Fetching archived notes
        setTrashed(notes);
        setLoading((state) => ({ ...state, fetchNote: false }));
      } catch (e) {
        setLoading((state) => ({ ...state, fetchNote: false }));
        setError("Failed to load archived notes");
      }
    };

    if (currentUser) {
      getTrashed();
    }
  }, [currentUser, fetchUserNotes, selectedNotes]);

  const handleShowModal = (id) => {
    setShowModal(true);
    setSingleNoteId(id);
  };
  const handleSingleNoteDelete = async () => {
    await deleteNote(singleNoteId);
    setSelectedNotes(selectedNotes.filter((n) => n.id !== singleNoteId));
    setSingleNoteId(null);
  };
  const handleRestore = async (note) => {
    await batchUpdate([note], "notIsTrashed");
    setSelectedNotes(selectedNotes.filter((n) => n.id !== note.id));
    setSingleNoteId(null);
  };

  const handleBatchRestore = async () => {
    setLoading((state) => ({ ...state, restore: true }));
    await batchUpdate(selectedNotes, "notIsTrashed");
    setLoading((state) => ({ ...state, restore: false }));
    setSelectedNotes([]);
  };

  const handleSelectedNote = (note, action) => {
    if (action === "selected") {
      setSelectedNotes([...selectedNotes, note]);
    } else if (action === "notSelected" && selectedNotes.length > 0) {
      const filteredNotes = selectedNotes.filter((n) => n.id !== note.id);
      setSelectedNotes(filteredNotes);
    } else {
      setSelectedNotes([]);
    }
  };

  return (
    <PageLayout className="mt-14">
      <div className="pb-5">
        <div className="flex flex-col sm:flex-row justify-between gap-5 mb-2">
          {showModal && (
            <Modal
              setShowModal={setShowModal}
              onAction={handleSingleNoteDelete}
              text="Parmanently delete This Item?"
            />
          )}
          <h1 className="text-lg lg:text-2xl font-bold text-accent-2 text-center ">
            Archived Notes
          </h1>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleBatchRestore}
              disabled={selectedNotes.length < 2}
              text={`${
                loading.restore ? "Restoring..." : "Restore Seletected"
              }`}
              className={`${
                selectedNotes.length < 2 && "cursor-not-allowed opacity-50"
              } border border-accent-1  transition-all duration-200 !px-2 md:px-6 !py-1 lg:py-2 !text-base 
               text-accent-2`}
            />
            <Button
              text="Delete Selected"
              className={`${
                selectedNotes.length < 2 && "cursor-not-allowed opacity-50"
              }  transition-all duration-200 !px-2 md:px-6 !py-1 lg:py-2 !text-base 
               bg-red-300 text-red-600`}
            />
          </div>
        </div>

        <hr />

        {loading.fetchNote && (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        )}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading.fetchNote && !error && trashed.length === 0 && (
          <div className="text-center text-gray-500">
            No archived notes available.
          </div>
        )}

        {!loading.fetchNote && !error && trashed.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {trashed.map((note) => (
              <ArchivedNote
                key={note.id}
                note={note}
                onDelete={handleShowModal}
                onRestore={handleRestore}
                handleSelectedNote={handleSelectedNote}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Archive;
