import React from "react";

const Illustraion = ({ signupImg }) => {
  return (
    <div className=" lg:flex xl:justify-end hidden">
      <img className="w-3/4" src={signupImg} alt="illustration" />
    </div>
  );
};

export default Illustraion;
