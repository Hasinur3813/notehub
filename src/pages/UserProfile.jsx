import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { AuthContext } from "../context/authContext";
import Form from "../components/Form";
import TextInput from "../components/TextInput";
import ProfileHeading from "../components/ProfileHeading";
import { Button } from "../components/Button";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase";
import { updateProfile } from "firebase/auth";

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [photoSrc, setPhotoSrc] = useState("");
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDisableUpload, setIsDisableUpload] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [nameChangeError, setNameChangeError] = useState("");

  // change the name change button text dynamically based this
  const getButtonText = () => {
    if (isSaving) return "Saving...";
    if (isSaved) return "Saved";
    return isEditDisable ? "Change Name" : "Save Name";
  };

  // get the profile photo url set it
  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      const url = currentUser.photoURL;
      setPhotoSrc(url);
    }
  }, [currentUser]);

  // preview the photo before uploading it

  const handlePreview = (e) => {
    const file = e.target.files[0]; //get the file

    if (!file.type.startsWith("image/")) {
      // disable the upload system if the file is not a img file
      setIsDisableUpload(true);
      return setError("Select a 'png' or 'jpg' file please!"); //return with an error
    }

    // if the file is a valid img file then precedure the below proccesses
    setPhotoSrc(null);
    setSelectedFile(null);
    setError(null);
    setIsDisableUpload(false);

    // if the file is an img then set it to the state to see the image as preview
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPhotoSrc(url);
      setSelectedFile(file);
    } else {
      setPhotoSrc(null);
      setSelectedFile(null);
    }
  };

  // upload the photo
  const updateProfilePicture = async () => {
    //check again the file is valid or note then set a boolean value to this variable
    const isAvailablefile =
      selectedFile && selectedFile.type.startsWith("image/");

    if (!isAvailablefile) {
      // if there is no file found then simply return from this function
      return;
    }

    // make a reference of the storage
    const storageRef = ref(storage, `profilePicture/${currentUser.uid}`);

    try {
      setPhotoSrc(null);
      setLoading(true);
      await uploadBytes(storageRef, selectedFile); //upload the file
      const url = await getDownloadURL(storageRef); // get the image url and set it to the state
      await updateProfile(currentUser, {
        //update the profile with photoURL
        photoURL: url,
      });
      setCurrentUser((prev) => ({ ...prev, photoUrl: url })); //set the url to current user object to see the photo immediately
      setPhotoSrc(url);
      setLoading(false);
      setIsDisableUpload(true);
    } catch (e) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  // update the name
  const updateDisplayName = async (e) => {
    e.preventDefault();

    // check the input field of name is disable or not
    if (isEditDisable) {
      return setIsEditDisable(false); // if the input field is disable then return from this function by setting it enable
    }

    // if all is ok then change the name
    try {
      setNameChangeError(null);
      setIsSaving(true);
      setIsSaved(false);
      await updateProfile(currentUser, {
        displayName: displayName,
      });

      setIsSaving(false);
      setIsSaved(true);

      console.log(currentUser);
    } catch (e) {
      setIsSaving(false);
      setNameChangeError("Something went wrong!");
      console.log(e);
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
          updateProfile={updateProfilePicture}
          loading={loading}
          isDisableUpload={isDisableUpload}
          error={error}
        />

        <Form text="Your personal info" className="shadow-none mt-8">
          {/* text input for name */}
          <label className="px-1 font-semibold">Name</label>
          <TextInput
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            onBlur={() => setIsEditDisable(true)}
            disabled={isEditDisable}
            placeholder={currentUser.displayName}
            value={displayName}
            className={`px-3 ${
              isEditDisable
                ? "bg-slate-300 dark:bg-slate-300 dark:text-black"
                : "bg-white ring-1 dark:ring-2 ring-offset-accent-1"
            }`}
          />

          {/* text input for email */}
          <label className="px-1 font-semibold">Email</label>
          <TextInput
            type="email"
            disabled
            title="Currently email address change is not allowed!"
            value={currentUser.email}
            className="px-3 bg-slate-300 dark:bg-slate-300 dark:text-black"
          />

          <p className="text-red-300 mb-5 text-sm -mt-4">
            Currently, email address can't be changed!
          </p>

          {/* edit button */}
          <div>
            <Button
              onClick={updateDisplayName}
              text={getButtonText()}
              className="bg-accent-1 text-primary "
            />
            {nameChangeError && (
              <p className="mt-2 text-sm text-red-400">{nameChangeError}</p>
            )}
          </div>
        </Form>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
