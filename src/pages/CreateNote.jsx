import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/Button";
import TextInput from "../components/TextInput";
import Form from "../components/Form";
import Category from "../components/Category";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [writeNote, setWriteNote] = useState("");
  const [category, setCategorey] = useState("");

  const handleCreateNote = (e) => {
    e.preventDefault();
    console.log(title, writeNote, category);
  };

  return (
    <PageLayout>
      <div className="pt-14">
        <Form
          onSubmit={handleCreateNote}
          text="Create your note"
          className="max-w-3xl"
        >
          <TextInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-2"
          />

          <textarea
            value={writeNote}
            onChange={(e) => setWriteNote(e.target.value)}
            placeholder="Write your note..."
            rows="5"
            className="block w-full px-2 py-2 mb-4 text-base rounded-lg border border-muted dark:border-accent-1 shadow-sm focus:border-accent-1 focus:ring-accent-1 focus:outline-none transition duration-200 ease-in-out bg-white text-dark-primary dark:text-primary placeholder-gray-400
                  dark:bg-dark-primary focus:ring-2"
            required
          />

          <Category
            category={category}
            onChange={(e) => setCategorey(e.target.value)}
          />

          <Button
            type="submit"
            text="Save Note"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          />
        </Form>
      </div>
    </PageLayout>
  );
};

export default CreateNote;
