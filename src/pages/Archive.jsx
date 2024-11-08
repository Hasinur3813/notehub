import React, { useContext, useEffect, useState } from "react";
import { useNotes } from "../context/notesContext";
import { AuthContext } from "../context/authContext";
import PageLayout from "../components/PageLayout";

import ArchivedNote from "../components/ArchivedNote";
import { Button } from "../components/Button";
import Modal from "../components/Modal";

const Archive = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchUserNotes, deleteNote, batchUpdate, multipleDeleteNotes } =
    useNotes();
  const [trashed, setTrashed] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [singleNoteId, setSingleNoteId] = useState(null);

  const [loading, setLoading] = useState({
    fetchNote: true,
    restoreSelected: false,
    singleRestore: {},
    multiPleDelete: false,
  });

  useEffect(() => {
    const getTrashed = async () => {
      try {
        setError(null);
        const notes = await fetchUserNotes(currentUser.uid, true); // Fetching archived notes
        setTrashed(notes);
        setLoading((state) => ({ ...state, fetchNote: false }));
      } catch {
        setLoading((state) => ({ ...state, fetchNote: false }));
        setError("Failed to load archived notes");
      }
    };

    if (currentUser) {
      getTrashed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, selectedNotes]);

  const handleShowModal = (id) => {
    setShowModal(true);
    setSingleNoteId(id);
  };

  const handleSingleNoteDelete = async () => {
    await deleteNote(singleNoteId);
    setSelectedNotes(selectedNotes.filter((n) => n.id !== singleNoteId));
    setSingleNoteId(null);
  };

  const handleMultipleDelete = async () => {
    await multipleDeleteNotes(selectedNotes);
    setSelectedNotes([]);
    setSingleNoteId(null);
  };

  const handleRestore = async (note) => {
    setLoading((state) => ({
      ...state,
      singleRestore: { [note.id]: true },
    }));

    try {
      await batchUpdate([note], "notIsTrashed");
      setSelectedNotes((prev) => prev.filter((n) => n.id !== note.id));
    } finally {
      setLoading((state) => ({
        ...state,
        singleRestore: {},
      }));
    }
  };

  const handleBatchRestore = async () => {
    setLoading((state) => ({ ...state, restoreSelected: true }));
    await batchUpdate(selectedNotes, "notIsTrashed");
    setLoading((state) => ({ ...state, restoreSelected: false }));
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
          {showModal && !loading.multiPleDelete && (
            <Modal
              setShowModal={setShowModal}
              onAction={handleSingleNoteDelete}
              text="Parmanently delete this item?"
            />
          )}

          {showModal && loading.multiPleDelete && (
            <Modal
              setShowModal={setShowModal}
              onAction={handleMultipleDelete}
              handleModal={loading.multiPleDelete}
              loadingState={setLoading}
              text="Are you sure you would like to parmanently delete these items?"
            />
          )}

          <h1 className="text-lg lg:text-2xl font-bold text-accent-2 text-center ">
            Archived Notes
          </h1>

          {/* handle select all feature that is currently hidden */}
          <div className="flex gap-3 justify-center">
            <div className="form-control hidden">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text">Select All</span>
              </label>
            </div>
            <Button
              onClick={handleBatchRestore}
              disabled={selectedNotes.length < 2}
              text={`${loading.restoreSelected ? "Restoring..." : "Restore"}`}
              className={`${
                selectedNotes.length < 2 && "cursor-not-allowed opacity-50"
              } ${
                selectedNotes.length < 2 && "hidden"
              } border border-accent-1  transition-all duration-200 !px-2 md:px-6 !py-1 lg:py-2 !text-base 
               text-accent-2`}
            />
            <Button
              onClick={() => {
                setShowModal(true);
                setLoading((state) => ({ ...state, multiPleDelete: true }));
              }}
              disabled={selectedNotes.length < 2}
              text="Delete"
              className={`${
                selectedNotes.length < 2 && "cursor-not-allowed opacity-50"
              } ${
                selectedNotes.length < 2 && "hidden"
              } transition-all duration-200 !px-2 md:px-6 !py-1 lg:py-2 !text-base 
               bg-red-200 border border-red-500 text-red-500`}
            />
          </div>
        </div>

        <hr />

        {loading.fetchNote && (
          <div className="flex justify-center my-20">
            <span className="loading loading-spinner loading-lg text-accent-1"></span>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center text-xl lg:text-3xl my-20">
            {error}
          </div>
        )}

        {!loading.fetchNote && !error && trashed.length === 0 && (
          <div className="text-center text-gray-500 text-xl lg:text-3xl my-20">
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
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Archive;
