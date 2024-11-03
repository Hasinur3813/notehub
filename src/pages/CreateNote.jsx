import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/Button";
import TextInput from "../components/TextInput";
import Form from "../components/Form";
import Category from "../components/Category";
import { AuthContext } from "../context/authContext";
import { useNotes } from "../context/notesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { serverTimestamp, getDoc, doc } from "firebase/firestore";
import db from "../firebase";

const CreateNote = () => {
  const { updateNote } = useNotes();
  const { state } = useLocation();
  const { createNote } = useNotes();
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategorey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [btnText, setBtnText] = useState("Create Note");
  const navigate = useNavigate();

  // Create the note for using it to update or create notes
  const createNoteObj = () => {
    return {
      title: title,
      description: content,
      category: category,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
      isTrashed: false,
    };
  };
  // update the btn text based on the logic
  const updateBtnText = (isEditing, loading) => {
    if (loading) {
      return isEditing ? "Updating..." : "Creating note...";
    }
    return isEditing ? "Update" : "Create Note";
  };

  // set the note content to the state for updating the note
  useEffect(() => {
    const isEditing = state && state.note;
    if (isEditing) {
      setTitle(state.note.title);
      setContent(state.note.description);
      setCategorey(state.note.category);
    }

    setBtnText(updateBtnText(isEditing, loading));
  }, [state, loading]);

  // create a new note
  const handleCreateNote = async (e) => {
    e.preventDefault();

    if (!category || !title.trim() || !content.trim()) {
      return setError("All the fields are required!");
    }

    const note = createNoteObj();

    try {
      setLoading(true);
      setError(null);
      const id = await createNote(note);
      const newNoteDoc = await getDoc(doc(db, "notes", id));
      const newNote = { id: newNoteDoc.id, ...newNoteDoc.data() };

      setLoading(false);
      navigate(`/notes/note/${id}`, { state: { note: newNote } });
    } catch {
      setLoading(false);
      setError("Failed to create note!");
    }
  };

  // update the specific note
  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!category || !title.trim() || !content.trim()) {
      return setError("All the fields are required!");
    }
    const note = createNoteObj();

    try {
      setLoading(true);
      setError(null);
      await updateNote(state.note.id, note);
      const updatedNoteDoc = await getDoc(doc(db, "notes", state.note.id));
      const updatedNote = { id: updatedNoteDoc.id, ...updatedNoteDoc.data() };

      setLoading(false);
      navigate(`/notes/note/${state.note.id}`, {
        state: { note: updatedNote },
      });
    } catch {
      setError("Failed to update!");
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="pt-14">
        <Form
          onSubmit={state && state.note ? handleUpdateNote : handleCreateNote}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            rows="8"
            className="block w-full px-2 py-2 mb-4 text-base rounded-lg border border-muted dark:border-accent-1 shadow-sm focus:border-accent-1 focus:ring-accent-1 focus:outline-none transition duration-200 ease-in-out bg-white text-dark-primary dark:text-primary placeholder-gray-400
                  dark:bg-dark-primary focus:ring-2"
            required
          />

          <Category
            className="mb-4"
            category={category}
            onChange={(e) => setCategorey(e.target.value)}
          />

          {error && (
            <p className="mb-4 transition duration-150 text-center bg-red-100 rounded px-2 py-2 text-base text-red-400">
              {error}
            </p>
          )}

          <Button
            disabled={loading}
            type="submit"
            text={btnText}
            className={`w-full px-4 py-2  text-white font-semibold rounded-lg shadow-md hover:bg-accent-2 bg-accent-1 transition duration-300 ${
              loading && "cursor-not-allowed"
            }`}
          />
        </Form>
      </div>
    </PageLayout>
  );
};

export default CreateNote;
