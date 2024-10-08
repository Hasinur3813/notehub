import React from "react";
import noMatch from "../assets/nomatch.png";

const NoMatchNotes = () => {
  return (
    <div className="col-span-full flex justify-center items-center mt-20">
      <div className="text-center">
        <img className="w-1/5 mx-auto" src={noMatch} alt="no matches img" />

        <p className="text-gray-500 text-center mt-4">
          Oops! No notes match your search. Try a different keyword.
        </p>
      </div>
    </div>
  );
};

export default NoMatchNotes;
