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
  const { fetchUserNotes, deleteNote } = useNotes();
  const [trashed, setTrashed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getTrashed = async () => {
      try {
        setError(null);
        const notes = await fetchUserNotes(currentUser.uid, true); // Fetching archived notes
        setTrashed(notes);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError("Failed to load archived notes");
      }
    };

    if (currentUser) {
      getTrashed();
    }
  }, [currentUser, fetchUserNotes]);

  const handleDelete = (id) => {
    setShowModal(true);
  };

  const handleRestore = (id) => {};

  const handleSelectedNote = (id, action) => {
    if (action === "selected") {
      setSelectedNotes([...selectedNotes, id]);
    } else if (action === "notSelected" && selectedNotes.length > 0) {
      const filteredNotes = selectedNotes.filter(
        (selectedId) => selectedId !== id
      );
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
              onAction={() => deleteNote()}
              text="Delete This Item?"
            />
          )}
          <h1 className="text-lg lg:text-2xl font-bold text-accent-2 text-center ">
            Archived Notes
          </h1>

          <div className="flex gap-3 justify-center">
            <Button
              disabled={selectedNotes.length < 2}
              text="Restore Selected"
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

        {loading && (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        )}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading && !error && trashed.length === 0 && (
          <div className="text-center text-gray-500">
            No archived notes available.
          </div>
        )}

        {!loading && !error && trashed.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {trashed.map((note) => (
              <ArchivedNote
                key={note.id}
                note={note}
                onDelete={handleDelete}
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
