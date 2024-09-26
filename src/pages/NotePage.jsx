import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import Note from "../components/Note";
import SearchInput from "../components/SearchInput";
import Category from "../components/Category";
import { staticNotes } from "../components/staticNotes";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";

const NotePage = () => {
  const [notes, setNotes] = useState(staticNotes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

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
          <hr class="border-t-2 border-muted shadow- my-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {!search &&
            !category &&
            notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  createdAt={note.createdAt}
                />
              );
            })}

          {search &&
            notes
              .filter((note) =>
                note.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  createdAt={note.createdAt}
                />
              ))}
          {category &&
            notes
              .filter(
                (note) => note.category.toLowerCase() === category.toLowerCase()
              )
              .map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  createdAt={note.createdAt}
                />
              ))}
        </div>
      </div>

      {/* create note icon */}
      <div
        title="Create Note"
        className="fixed bottom-8 right-5 w-14 h-14 rounded-full bg-accent-1 flex justify-center items-center border border-accent-1 shadow-2xl"
      >
        <Link className="text-primary" to="/create-note">
          <CreateIcon sx={{ fontSize: 30 }} />
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotePage;
