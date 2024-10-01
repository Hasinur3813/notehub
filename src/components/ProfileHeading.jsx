import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "../components/Button";

const ProfileHeading = ({ photoSrc, currentUser, handlePreview }) => {
  return (
    <div>
      <div className="h-36 max-w-xl mx-auto bg-gradient-to-r rounded from-sky-500 to-indigo-500"></div>

      <div className="flex justify-center flex-col items-center -mt-16">
        <img
          id="img"
          src={photoSrc}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover shadow ring-2 ring-offset-2 flex justify-center items-center"
        />

        {/* display name */}
        <p className="text-lg my-1 font-medium">{currentUser.displayName}</p>

        {/* action buttons */}
        <div className="flex items-center gap-4 mt-4">
          <label
            htmlFor="uploadImg"
            className="bg-accent-1 hover:bg-accent-2 px-3 py-2 rounded text-secondary"
          >
            <CloudUploadIcon /> Choose a Photo
            <input
              onChange={handlePreview}
              type="file"
              id="uploadImg"
              className="hidden"
            />
          </label>

          <Button
            type="button"
            text="Update"
            className="border border-accent-1  text-accent-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeading;
