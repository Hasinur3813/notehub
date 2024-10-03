import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "../components/Button";
import avatar from "../assets/avatar.png";
const ProfileHeading = ({
  photoSrc,
  currentUser,
  handlePreview,
  updateProfile,
  loading,
  isDisableUpload,
  error,
}) => {
  return (
    <div>
      <div className="h-36 max-w-xl mx-auto bg-gradient-to-r rounded from-sky-500 to-indigo-500"></div>

      <div className="flex justify-center flex-col items-center -mt-20">
        <img
          id="img"
          src={photoSrc ? photoSrc : avatar}
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover shadow ring-2 ring-offset-2 flex justify-center items-center"
        />

        {/* display name */}
        <p className="text-lg my-1 font-medium">{currentUser.displayName}</p>

        {/* action buttons */}
        <div className="flex items-center gap-4 mt-4">
          <label
            htmlFor="uploadImg"
            className="border border-accent-1 text-accent-1 px-3 py-2 rounded cursor-pointer"
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
            onClick={updateProfile}
            type="button"
            disabled={isDisableUpload}
            text={loading ? "Uploading..." : "Upload"}
            className={`${
              isDisableUpload && "cursor-not-allowed bg-opacity-50"
            } bg-accent-1  text-secondary`}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default ProfileHeading;
