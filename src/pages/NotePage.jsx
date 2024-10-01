import React, { useState, useContext, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import Note from "../components/Note";
import SearchInput from "../components/SearchInput";
import Category from "../components/Category";
import CreateNoteIcon from "../components/CreateNoteIcon";
import { useNotes } from "../context/notesContext";
import { AuthContext } from "../context/authContext";
import ForEmptyNotes from "../components/ForEmptyNotes";
import FetchingNotes from "../components/FetchingNotes";
import { Button } from "../components/Button";
import Modal from "../components/Modal";

const NotePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchUserNotes, batchDelete } = useNotes();

  const { notes, setNotes } = useNotes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const RenderNote = ({ note }) => {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={
          note.title.length > 50 ? `${note.title.slice(0, 50)}...` : note.title
        }
        description={
          note.description.length > 70
            ? `${note.description.slice(0, 70)}...`
            : note.description
        }
        createdAt={note.createdAt}
      />
    );
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const getNotes = async () => {
      try {
        setError(null);
        const notes = await fetchUserNotes(currentUser.uid);
        setNotes(notes);
        setLoading(false);
      } catch {
        setLoading(false);
        setError("Error fetching notes!");
      }
    };

    getNotes();
  }, [currentUser]);

  return (
    <PageLayout>
      {showModal && (
        <Modal
          text="Are you sure you want to delete all the notes?"
          setShowModal={setShowModal}
          onAction={() => batchDelete(currentUser.uid)}
          setNotes={setNotes}
          loading={loading}
          error={error}
        />
      )}
      {/* page container */}
      <div className="pt-14 lg:pt-20">
        {/* search input and category */}
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center">
          <SearchInput
            onBlur={() => setSearch("")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Category
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* your notes heading that is sticky */}
        <div className="pt-12 sticky z-10 top-2 bg-primary dark:bg-dark-secondary flex justify-between items-center">
          <h1 className="text-dark-primary text-xl md:3xl font-bold dark:text-secondary flex">
            Your Notes
            <sup className="bg-accent-1 rounded-full text-secondary ms-1 flex justify-center items-center p-1 w-5 h-5">
              {notes.length}
            </sup>
          </h1>

          <Button
            disabled={notes.length === 0}
            text="Clear All"
            type="button"
            className={` ${
              notes.length === 0 ? "text-red-300" : "text-red-600"
            }`}
            onClick={() => setShowModal(true)}
          />
        </div>

        <hr className="border-t-2 border-muted mx-auto" />

        {/* notes container where all the notes will be kept */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {/* show the loading spinner while fetching the notes */}
          {loading && <FetchingNotes />}

          {/* show the below code when notes is empty */}
          {notes.length === 0 && !loading && <ForEmptyNotes />}

          {/* show error if any */}
          {error && (
            <p className="transition duration-150 text-center bg-red-100 rounded px-2 py-2 text-base text-red-400">
              {error}
            </p>
          )}

          {/* render all the notes from the database */}
          {!search &&
            !category &&
            !loading &&
            notes.map((note) => {
              return <RenderNote note={note} key={note.id} />;
            })}

          {/* show the specific note based on the search */}
          {search &&
            notes
              .filter((note) =>
                note.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => <RenderNote note={note} key={note.id} />)}

          {/* show the notes based on the category */}
          {category &&
            notes
              .filter(
                (note) => note.category.toLowerCase() === category.toLowerCase()
              )
              .map((note) => <RenderNote note={note} key={note.id} />)}
        </div>
      </div>

      {/* create note icon that is fixed in the bottom right*/}
      <CreateNoteIcon />
    </PageLayout>
  );
};

export default NotePage;
