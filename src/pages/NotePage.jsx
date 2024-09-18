import React from "react";
import PageLayout from "../components/PageLayout";
import Note from "../components/Note";

const NotePage = () => {
  return (
    <PageLayout>
      <div className="pt-20">
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center">
          <input
            type="text"
            placeholder="Search notes..."
            className="input border-2 border-muted w-full max-w-md focus:outline-none focus:border-accent-1 text-base"
          />

          <select className="select dark:bg-dark-primary bg-muted border border-accent-1 focus:border-accent-1 focus:outline-none text-base">
            <option selected>All Categories</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Others</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    </PageLayout>
  );
};

export default NotePage;
