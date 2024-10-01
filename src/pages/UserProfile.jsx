import React, { useContext, useState, useRef } from "react";
import PageLayout from "../components/PageLayout";
import { AuthContext } from "../context/authContext";
import Form from "../components/Form";
import TextInput from "../components/TextInput";
import ProfileHeading from "../components/ProfileHeading";
import { Button } from "../components/Button";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [photoSrc, setPhotoSrc] = useState("");
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);

  const [isEditDisable, setIsEditDisable] = useState(true);

  const displayNameRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();

    setIsEditDisable((prevState) => !prevState);

    if (isEditDisable) {
      displayNameRef.current?.focus();
    }
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const selectedFile = file;
      const url = URL.createObjectURL(selectedFile);
      setPhotoSrc(url);
    }
  };

  return (
    <PageLayout>
      <div className="bg-primary dark:bg-dark-secondary pb-8">
        {/* heading component */}
        <ProfileHeading
          photoSrc={photoSrc}
          currentUser={currentUser}
          handlePreview={handlePreview}
        />

        <Form text="Your personal info" className="shadow-none mt-8">
          {/* text input for name */}
          <label className="px-1 font-semibold">Name</label>
          <TextInput
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={isEditDisable}
            placeholder={currentUser.displayName}
            value={displayName}
            className="px-3 bg-slate-200"
          />
          {/* text input for email */}
          <label className="px-1 font-semibold">Email</label>
          <TextInput
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEditDisable}
            placeholder={currentUser.email}
            value={email}
            className="px-3 bg-slate-200"
          />

          {/* edit button */}
          <Button
            onClick={handleClick}
            text="Edit"
            className="bg-accent-1 text-primary "
          />
        </Form>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
