import React, { useContext } from "react";
import BannerIllustrasion from "../components/BannerIllustrasion";
import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <PageLayout className="bg-gradient-to-r from-indigo-500 to-sky-500 dark:bg-none py-24">
      <div className="container mx-auto flex flex-col md:flex-row text-center md:text-left  justify-between gap-y-10 items-center h-full">
        <div className=" text-white rounded mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Welcome to NoteHub
          </h1>
          <p className="my-5 leading-relaxed md:max-w-lg text-base mb-12">
            Capture your ideas, tasks, and important information all in one
            place. Stay organized and boost your productivity with NoteHub.
          </p>

          <Link
            to="/notes"
            className="bg-white text-accent-2 text-lg hover:bg-gray-100 mt-8 px-4 py-3 rounded"
          >
            {currentUser ? "Explore" : "Get Started"}
          </Link>
        </div>

        <BannerIllustrasion />
      </div>
    </PageLayout>
  );
};

export default HomePage;
