import React from "react";
import BannerIllustrasion from "../components/BannerIllustrasion";
import { Button } from "../components/Button";

const HomePage = () => {
  return (
    <section className="overflow-y-auto w-full py-8 md:py-0 bg-gradient-to-r from-indigo-500 to-sky-500 px-4">
      <div className="container mx-auto flex flex-col md:flex-row text-center md:text-left justify-center md:justify-between gap-y-10 items-center h-full">
        <div class=" text-white rounded mb-8">
          <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Welcome to NoteHub
          </h1>
          <p className="my-5 leading-relaxed md:max-w-lg text-base">
            Capture your ideas, tasks, and important information all in one
            place. Stay organized and boost your productivity with NoteHub.
          </p>

          <Button
            text="Get Started"
            className="bg-white text-accent-1 hover:bg-gray-100 mt-3"
          />
        </div>
        <BannerIllustrasion />
      </div>
    </section>
  );
};

export default HomePage;
