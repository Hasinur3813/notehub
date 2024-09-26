import React, { useState, useContext } from "react";
import Form from "./Form";
import TextInput from "./TextInput";
import { Button } from "./Button";
import { AuthContext } from "../context/authContext";

const PasswordResetModal = ({ setIsOpenModal }) => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      await resetPassword(email);
      setLoading(false);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (e) {
      setLoading(false);
      setError("Request failed!");
      console.log(e.code);
    }
  };

  const closeModal = (e) => {
    if (e.target.nodeName === "DIV") {
      setIsOpenModal(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed flex justify-center items-center inset-0 z-10 bg-slate-600 bg-opacity-55"
    >
      <div className="px-3">
        <Form onSubmit={handlePasswordReset} text="Reset your password">
          <TextInput
            className="px-2"
            type="email"
            placeholder="Type your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className="transition duration-150 text-center bg-red-100 rounded px-2 py-2 text-base text-red-400">
              {error}
            </p>
          )}
          {message && (
            <p className="transition duration-150 text-center text-primary rounded-md px-2 py-2 text-base bg-success my-2">
              {message}
            </p>
          )}

          <Button
            type="submit"
            className="text-center border border-accent-1 block w-full bg-accent-1 text-primary rounded-md hover:bg-blue-500 mx-auto"
            text={loading ? "Sending..." : "Send password reset email"}
          />
        </Form>
      </div>
    </div>
  );
};

export default PasswordResetModal;
