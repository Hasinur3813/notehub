import React from "react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/Button";
import { useParams } from "react-router-dom";
import { staticNotes } from "../components/staticNotes";

const NoteView = () => {
  const { id } = useParams();
  const filteredNote = staticNotes.find((note) => note.id === parseInt(id));

  return (
    <PageLayout className="flex justify-center items-center">
      <div className="max-w-2xl mx-auto -mt-10 bg-secondary dark:bg-dark-primary dark:border dark:border-accent-1 p-5 rounded">
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-semibold text-dark-primary dark:text-secondary mb-4">
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
        </div>

        <div className=" text-dark-secondary mb-6 dark:text-primary">
          <p>{filteredNote.description}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            text="Edit"
            className="text-secondary bg-accent-1 rounded px-8 hover:bg-blue-500 transition-colors duration-200 shadow-sm"
          />
          <Button
            type="button"
            text="Delete"
            className="text-secondary shadow-sm bg-accent-2 rounded px-8 hover:bg-red-500 transition-colors duration-200 "
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default NoteView;
