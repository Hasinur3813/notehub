import React from "react";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import SideBarProvider from "../context/SideBar";

const App = () => {
  return (
    <div className="font-inter bg-primary dark:bg-dark-secondary">
      <SideBarProvider>
        <Layout>
          <HomePage />
        </Layout>
      </SideBarProvider>
    </div>
  );
};

export default App;
