import React, { useState, useContext, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import Note from "../components/Note";
import SearchInput from "../components/SearchInput";
import Category from "../components/Category";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";
import { useNotes } from "../context/notesContext";
import { AuthContext } from "../context/authContext";
import { Button } from "../components/Button";

const NotePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchUserNotes } = useNotes();

  const { notes, setNotes } = useNotes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const RenderNote = ({ note }) => {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={`${note.title.slice(0, 50)}...`}
        description={`${note.description.slice(0, 70)}...`}
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
        setLoading(true);
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
      <div className="pt-14 lg:pt-20">
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Category
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="pt-12 sticky z-10 top-2 bg-primary dark:bg-dark-secondary">
          <h1 className="text-dark-primary text-xl md:3xl font-bold mb-2 dark:text-secondary ">
            Your Notes
          </h1>
          <hr className="border-t-2 border-muted shadow- my-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {loading && (
            <h3 className="text-lg md:text-2xl font-semibold flex items-center justify-center col-span-3 gap-3 text-gray-700">
              <span className="loading loading-spinner loading:sm lg:loading-lg animate-spin text-accent-1"></span>
              <span className="text-accent-1">Fetching Notes...</span>
            </h3>
          )}
          {notes.length === 0 && !loading && (
            <div className="col-span-3 flex flex-col items-center justify-center p-10 rounded-lg space-y-4">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                No Data Found!
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                Create your first note to get started.
              </p>
              <Link
                to="/create-note"
                className="bg-accent-1 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 hover:bg-accent-2 hover:shadow-xl"
              >
                Create Note
              </Link>
            </div>
          )}
          {error && (
            <p className="transition duration-150 text-center bg-red-100 rounded px-2 py-2 text-base text-red-400">
              {error}
            </p>
          )}
          {!search &&
            !category &&
            notes.map((note) => {
              return <RenderNote note={note} key={note.id} />;
            })}

          {search &&
            notes
              .filter((note) =>
                note.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => <RenderNote note={note} key={note.id} />)}
          {category &&
            notes
              .filter(
                (note) => note.category.toLowerCase() === category.toLowerCase()
              )
              .map((note) => <RenderNote note={note} key={note.id} />)}
        </div>
      </div>

      {/* create note icon */}
      <div
        title="Create Note"
        className="fixed bottom-8 right-5 w-14 h-14 rounded-full bg-accent-1 flex justify-center items-center border border-accent-1 shadow-2xl"
      >
        <Link
          className="text-primary w-full h-full flex justify-center items-center"
          to="/create-note"
        >
          <CreateIcon sx={{ fontSize: 30 }} />
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotePage;
