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

  return (
    <PageLayout>
      <div className="pt-20">
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center">
          <SearchInput />
          <Category />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {notes.map((note) => {
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
        </div>
      </div>

      {/* create note icon */}
      <div
        title="Create Note"
        className="fixed bottom-8 right-4 w-12 h-12 rounded-full bg-accent-1 flex justify-center items-center border border-accent-1 shadow-xl"
      >
        <Link className="text-primary" to="/create-note">
          <CreateIcon />
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotePage;
