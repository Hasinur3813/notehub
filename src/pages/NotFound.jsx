import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const NotFound = () => {
  return (
    <PageLayout className="flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
          404
        </h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 px-5 py-3 bg-accent-1 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
