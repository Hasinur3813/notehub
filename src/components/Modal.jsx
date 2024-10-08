import React, { useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Modal = ({ onAction, setShowModal, text, setNotes }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      await onAction();
      setLoading(false);
      setMessage("Succesfully deleted!");
      setNotes && setNotes([]);
    } catch {
      setLoading(false);
      setError("Failed to delete!");
      setMessage("");
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.id === "closeModal") {
      !loading && setShowModal(false);
      if (message) {
        navigate("/notes");
      }
    }
  };

  return (
    <div
      onClick={handleCloseModal}
      id="closeModal"
      className="fixed z-20 bg-opacity-50 inset-0 bg-slate-700 flex justify-center items-center"
    >
      <div className="max-w-sm p-10 bg-primary rounded ">
        {loading && (
          <h3 className="text-lg md:text-2xl font-semibold flex items-center justify-center col-span-3 gap-3 text-gray-700">
            <span className="loading loading-spinner loading:sm lg:loading-lg animate-spin text-red-500"></span>
            <span className="text-red-500">Deleting...</span>
          </h3>
        )}
        {error && <p className="text-red-500 text-lg">Failed to delete!</p>}
        {message && <p className="text-accent-2 text-lg">{message}</p>}
        {!loading && !error && !message && (
          <>
            <p className="text-center text-xl">{text}</p>

            <div className="flex justify-center mt-8 gap-8">
              <Button
                onClick={() => setShowModal(false)}
                text="Cancel"
                className="bg-accent-1 hover:bg-accent-2 rounded text-secondary text-lg"
              />
              <Button
                onClick={handleAction}
                text="Delete"
                className="bg-red-500 hover:bg-red-600 rounded text-secondary text-lg"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
