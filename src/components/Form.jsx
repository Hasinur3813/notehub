import React from "react";

const Form = ({ text, children, className, ...rest }) => {
  return (
    <form
      {...rest}
      className={`w-full max-w-md mx-auto bg-white dark:bg-dark-primary shadow-lg rounded-lg p-8 ${className}`}
    >
      <>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-accent-1">
          {text}
        </h2>
        {children}
      </>
    </form>
  );
};

export default Form;
