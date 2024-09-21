import React from "react";
import PageLayout from "../components/PageLayout";
import Note from "../components/Note";
import SearchInput from "../components/SearchInput";
import Category from "../components/Category";

const NotePage = () => {
  return (
    <PageLayout>
      <div className="pt-20">
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center">
          <SearchInput />
          <Category />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
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
