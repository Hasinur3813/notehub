import React, { useContext, useEffect, useState } from "react";
import { useNotes } from "../context/notesContext";
import { AuthContext } from "../context/authContext";

const Archive = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchUserNotes } = useNotes();
  const [trashed, setTrashed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrashed = async () => {
      try {
        setError(null);
        const notes = await fetchUserNotes(currentUser.uid, true);
        setLoading(false);
        setTrashed(notes);
        console.log(notes);
      } catch (e) {
        setLoading(false);
        // setError('')
        console.log(e);
      }
    };

    getTrashed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="flex justify-center m-20 mx-auto">
      {" "}
      <h2>this is archive page</h2>
    </div>
  );
};

export default Archive;
