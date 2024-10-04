import React, { useContext, createContext, useState } from "react";
import db from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
} from "@firebase/firestore";

const NotesContext = createContext();

export const useNotes = () => {
  return useContext(NotesContext);
};

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // fetch notes
  const fetchUserNotes = async (userId) => {
    const docRef = collection(db, "notes");

    const notesQuery = query(
      docRef,
      orderBy("createdAt", "desc"),
      where("userId", "==", userId)
    );

    const snapShot = await getDocs(notesQuery);
    const notes = snapShot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    return notes;
  };

  // add note functionality

  const createNote = async (note) => {
    const noteRef = collection(db, "notes");
    const doc = await addDoc(noteRef, note);
    return doc.id;
  };

  // updating note

  const updateNote = async (noteId, updatedNote) => {
    const docRef = doc(db, "notes", noteId);
    await updateDoc(docRef, updatedNote);
  };

  // delete a single note

  const deleteNote = async (noteId) => {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  };

  // batch delete

  const batchDelete = async (userId) => {
    // fetching all the notes first
    const docRef = collection(db, "notes");
    const q = query(docRef, where("userId", "==", userId));
    const snapShot = await getDocs(q);
    const batch = snapShot.docs.map(async (document) => {
      const docRef = doc(db, "notes", document.id);
      await deleteDoc(docRef);
    });
    console.log(batch);
    await Promise.all(batch);
  };

  const value = {
    notes,
    setNotes,
    fetchUserNotes,
    createNote,
    updateNote,
    deleteNote,
    batchDelete,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
